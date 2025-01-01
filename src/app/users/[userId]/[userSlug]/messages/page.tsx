"use client";
import { Message as m } from "@/app/chat/[id]/Chat";
import { databases } from "@/models/client/config";
import { db, msg } from "@/models/name";
import { useAuthStore } from "@/store/Auth";
import convertDateToRelativeTime from "@/utils/relativeTime";
import { Query } from "appwrite";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Message extends m {
    createdAt: string;
}

const Page = () => {
    const { user, hydrated } = useAuthStore();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const fetchMessages = async () => {
        if (!user) return;
        try {
            const data = await databases.listDocuments(db, msg, [
                Query.equal("sentTo", user.$id),
            ]);
            console.log(data);
            if (!data) return [];
            const newData = data.documents.map((message: any) => ({
                username: message.username,
                userid: message.userid,
                content: message.content,
                sentTo: message.sentTo,
                createdAt: message.$createdAt,
            }));
            return newData as Message[];
        } catch (error) {
            console.log(error);
            return [];
        }
    };
    useEffect(() => {
        if (!hydrated) return;
        setIsLoading(true);
        fetchMessages()
            .then((messages) => {
                setMessages(messages || []);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, [hydrated]);

    if (!hydrated || isLoading) {
        return (
            <div className="flex h-svh items-start justify-center">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        );
    }
    if (!user) return <div></div>;
    return (
        <div className="bg-background min-h-screen p-8">
            <div className="max-w-2xl mx-auto bg-background rounded-lg shadow-lg overflow-hidden">
                {/* <h1 className="text-2xl font-bold text-gray-100 p-4 border-b border-gray-700">
                    Message Center
                </h1> */}
                <ul className="divide-y divide-gray-700">
                    {messages.map((message, index) => {
                        return (
                            <li
                                key={index}
                                className="p-4 hover:bg-gray-700 transition-colors"
                            >
                                <button
                                    // href={`/chat/${message.userid}?userid=${user.$id}`}
                                    onClick={() =>
                                        router.replace(
                                            `/chat/${message.userid}?userid=${user.$id}`
                                        )
                                    }
                                    className="block"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-200">
                                            {message.username}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {convertDateToRelativeTime(
                                                new Date(message.createdAt)
                                            )}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-gray-400">
                                        {message.content}
                                    </p>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Page;
