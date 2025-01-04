"use client";
import { useAuthStore } from "@/store/Auth";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Verify = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");
    const { logout, verifySession, user, session } = useAuthStore();
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);
    useEffect(() => {
        if (isVerified) return;
        if (!session) {
            router.replace("/login");
            return;
        }
        if (user?.phone || user?.emailVerification) {
            return;
        }
        const verifyEmail = async () => {
            try {
                const response = await fetch("/api/emailVerify", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: "no-store", // Disable caching
                    body: JSON.stringify({
                        userId,
                        secret,
                    }),
                });
                if (!response.ok) {
                    const { error } = await response.json();
                    window.alert(
                        "Verification failed. Please log in again to request a new verification link."
                    );
                    toast.error(
                        error || "Verification failed. Please try again."
                    );
                    await logout();
                    router.replace("/login");
                    return;
                }
                // On successful verification
                await verifySession();
                toast.success("Email Verified");
                setIsVerified(true);
                router.replace("/");
            } catch (error) {
                console.error("Error during email verification:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        };
        verifyEmail();
    }, []);

    return (
        <div>
            <Loader2 className="animate-spin" />
            Verification in progress
        </div>
    );
};

export default Verify;
