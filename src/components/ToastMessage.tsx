import React from "react";
import { X, MessageSquare } from "lucide-react";
import { Message } from "@/app/chat/[id]/Chat";
import { avatars } from "@/models/client/config";
import { useRouter } from "nextjs-toploader/app";

interface ToastMessageProps {
    message: Message;
    onDismiss: () => void;
}

export function ToastMessage({ message, onDismiss }: ToastMessageProps) {
    const router = useRouter();
    return (
        <div className="flex flex-col bg-background rounded-lg shadow-lg w-80 border border-gray-700 overflow-hidden">
            <div className="flex items-center gap-4 p-4">
                <img
                    src={avatars.getInitials(message.username, 40, 40)}
                    alt={message.username}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-200">
                            {message.username}
                        </h3>
                        <button
                            onClick={onDismiss}
                            className="text-gray-400 hover:text-gray-200 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                        {message.content}
                    </p>
                </div>
            </div>
            <button
                onClick={() =>
                    router.replace(
                        `/chat/${message.userid}?userid=${message.sentTo}`
                    )
                }
                className="flex items-center justify-center gap-2 w-full border border-gray-700 bg-transparent hover:bg-blue-700 p-2.5 text-sm font-medium text-white transition-colors"
            >
                <MessageSquare className="w-4 h-4" />
                Reply
            </button>
        </div>
    );
}
