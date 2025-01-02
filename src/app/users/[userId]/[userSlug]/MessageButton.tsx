"use client";
import React from "react";
import { MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";

const MessageButton = () => {
    const { userId } = useParams();
    const { user } = useAuthStore();
    const router = useRouter();
    if (user?.$id === userId || !user) return null;
    return (
        <Button
            onClick={() =>
                router.replace(`/chat/${userId}?userid=${user?.$id}`)
            }
            className="bg-transparent relative flex items-center rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium border-white/[0.2] text-white hover:bg-background"
        >
            <MessageCircle className="h-4 w-4 mr-2" /> <span>Message</span>
            <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </Button>
    );
};

export default MessageButton;
