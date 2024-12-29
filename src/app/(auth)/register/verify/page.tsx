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
            const response = await fetch("/api/emailVerify", {
                method: "PUT",
                cache: "no-store", // Disable caching
                body: JSON.stringify({
                    userId,
                    secret,
                }),
            })
                .then(async (res) => await res.json())
                .catch((err) => {
                    console.log(err);
                    return null;
                });
            if (!response || !response?.success) {
                window.alert(
                    "Verification failed please login again to reverify"
                );
                await logout();
                router.replace("/login");
                return;
            }
            verifySession();
            toast.success("Email Verified");
            setIsVerified(true);
            router.replace("/");
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
