"use client";

import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
    const { userId, userSlug } = useParams();
    const pathname = usePathname();
    const { user } = useAuthStore();

    const items = [
        {
            name: "Summary",
            href: `/users/${userId}/${userSlug}`,
            show: true,
        },
        {
            name: "Messages",
            href: `/users/${userId}/${userSlug}/messages`,
            show: user?.$id === userId,
        },
        {
            name: "Questions",
            href: `/users/${userId}/${userSlug}/questions`,
            show: true,
        },
        {
            name: "Answers",
            href: `/users/${userId}/${userSlug}/answers`,
            show: true,
        },
        {
            name: "Votes",
            href: `/users/${userId}/${userSlug}/votes`,
            show: true,
        },
    ];

    return (
        <ul className="flex w-full shrink-0 gap-1 overflow-auto sm:w-40 sm:flex-col">
            {items.map((item) =>
                item.show ? (
                    <li key={item.name}>
                        <Link
                            href={item.href}
                            className={`block w-full rounded-full px-3 py-0.5 duration-200 ${
                                pathname === item.href
                                    ? "bg-white/20"
                                    : "hover:bg-white/20"
                            }`}
                        >
                            {item.name}
                        </Link>
                    </li>
                ) : null
            )}
        </ul>
    );
};

export default Navbar;
