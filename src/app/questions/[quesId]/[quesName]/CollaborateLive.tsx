"use client";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

const CollaborateLive = ({ quesId }: { quesId: string }) => {
    const router = useRouter();
    return (
        <ShimmerButton
            className="shadow-2xl h-fit "
            onClick={() => router.push(`/chat/${quesId}`)}
        >
            <span className="text-sm  tracking-tight text-white dark:from-white dark:to-slate-900/10 relative z-10 flex items-center justify-center gap-2 px-2">
                <Sparkles className="h-4 w-4 " />
                <span className="font-medium ">Collaborate Live</span>
            </span>
        </ShimmerButton>
    );
};

export default CollaborateLive;
