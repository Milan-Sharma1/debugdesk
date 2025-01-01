"use client";
import React, { useEffect, useRef } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconMessage, IconWorldQuestion } from "@tabler/icons-react";
import { useAuthStore } from "@/store/Auth";
import slugify from "@/utils/slugify";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useSocket } from "@/context/SocketContext";

export default function Header() {
    const { user, session, verifySession, hydrated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (!hydrated) return;
        if (!session) {
            verifySession();
        }
        if (session && user) {
            if (!user.name) {
                toast.error("You must set a username First");
                router.replace("/phoneNameSet");
            }
            if (!user.emailVerification && !user.phone) {
                if (
                    pathname !== "/register/verify" &&
                    pathname !== "/notVerified"
                ) {
                    toast.error("User must verify email first");
                    window.alert(
                        "Please check your mail and verify your account first"
                    );
                    router.replace("/notVerified");
                }
            }
        }
    }, [session, user, pathname, router, hydrated]);
    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: (
                <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
        {
            name: "Questions",
            link: "/questions",
            icon: (
                <IconWorldQuestion className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
    ];

    if (user)
        navItems.push({
            name: "Profile",
            link: `/users/${user.$id}/${slugify(user.name)}`,
            icon: (
                <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        });

    return (
        <div className="relative w-full">
            <FloatingNav navItems={navItems} />
        </div>
    );
}
