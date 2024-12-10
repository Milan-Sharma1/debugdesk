"use client";
import { useAuthStore } from "@/store/Auth";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
    const { verifySession, logout } = useAuthStore();
    // useEffect(() => {
    //     verifySession();
    // }, []);

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
