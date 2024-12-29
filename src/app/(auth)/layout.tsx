"use client";
import { useAuthStore } from "@/store/Auth";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { session, user, hydrated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!hydrated) return;
        if (session) {
            if (
                user?.name &&
                (user?.emailVerification || user?.phoneVerification)
            ) {
                router.replace("/");
                toast.success("Already Logged in");
                // Set loading state to false once hydrated
                const timeout = setTimeout(() => {
                    setIsLoading(false); // Hide loader after 3 seconds due to component visible for a second
                }, 3000);
                return () => clearTimeout(timeout);
            }
        }
        if (!session && pathname === "/notVerified") {
            router.replace("/");
            const timeout = setTimeout(() => {
                setIsLoading(false); // Hide loader after 3 seconds
            }, 3000);
            return () => clearTimeout(timeout);
        }
        setIsLoading(false);
    }, [hydrated, session, router, user]);

    // if (session && user?.name) {
    //     return null;
    // }

    if (isLoading) {
        return (
            <div className="flex w-full min-h-lvh items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
            <div className="relative">{children}</div>
        </div>
    );
};

export default Layout;
