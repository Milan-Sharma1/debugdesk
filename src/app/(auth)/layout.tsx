"use client";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { session, user } = useAuthStore();
    const router = useRouter();
    useEffect(() => {
        if (session) {
            if (user?.name) {
                router.push("/");
                toast.success("Already Logged in");
            }
        }
    }, [session, router, user]);

    // if (session && user?.name) {
    //     return null;
    // }

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
            <div className="relative">{children}</div>
        </div>
    );
};

export default Layout;
