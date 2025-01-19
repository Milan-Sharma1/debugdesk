"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { messageValidation } from "@/schemas/messageSchema";
import { useAuthStore } from "@/store/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send } from "lucide-react";
import { avatars } from "@/models/client/config";
import Link from "next/link";
import slugify from "@/utils/slugify";
import { useSocket } from "@/context/SocketContext";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
export interface Message {
    id?: string; //appwrite document id retrived from appwrite while fetching old msgs
    username: string;
    userid: string;
    content: string;
    sentTo: string;
}

const Chat = ({ oldMessages }: { oldMessages: Message[] }) => {
    const [messages, setMessages] = useState<Message[]>(oldMessages);
    const socket = useSocket();
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const { user, hydrated } = useAuthStore();
    const { id } = useParams(); //id for sending msg in particular room
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const joined = useRef(false);
    const form = useForm<z.infer<typeof messageValidation>>({
        resolver: zodResolver(messageValidation),
        defaultValues: {
            username: "",
            userid: "",
            content: "",
            sentTo: String(id),
        },
    });
    useEffect(() => {
        if (!hydrated || !socket || !id) return;
        if (user) {
            form.reset({
                userid: user.$id,
                username: user.name,
                sentTo: String(id),
            });
        }
        if (!joined.current) {
            socket.emit("joinRoom", id);
            joined.current = true;
        }

        socket.on("message", (newMessage) => {
            if (
                newMessage.sentTo === id || //this condition for ques group difference
                (newMessage.sentTo === user?.$id && newMessage.userid === id) //this condition for private msg difference on frontend
            ) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        });
    }, [hydrated, socket, user, form, id]);

    useEffect(() => {
        if (!hydrated) return;
        if (scrollAreaRef.current) {
            // Scroll to the bottom of the ScrollArea
            scrollAreaRef.current.scrollIntoView(false);
        }
    }, [messages, hydrated]);
    const handleMessageSubmit = (data:z.infer<typeof messageValidation>) => {
        setError("");
        if (!socket) {
            setError("Some issue At Connection Try Reloading the page");
            return;
        }
        if (!user) {
            setError("Please login before sending a msg");
            return;
        }
        setIsLoading(true);
        try {
            socket.emit("message", { id, data });
            form.resetField("content");
        } catch (error) {
            setError("Some error at backend");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    if (!hydrated) {
        return (
            <div className="flex w-full min-h-lvh items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        );
    }
    //TODO:improve this function
    const isCodeSnippet = (content: string) => {
        return (
            content.includes("className=") ||
            content.includes("<div") ||
            content.includes("<p") ||
            (content.includes("{") &&
                content.includes("}") &&
                (content.includes("function") ||
                    content.includes("=>") ||
                    content.includes("class") ||
                    content.includes("const")))
        );
    };
    const copyToClipboard = async (content: string, id: string) => {
        await navigator.clipboard.writeText(content);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };
    return (
        <div className="flex flex-col pt-24 mx-3 mb-2 h-screen bg-background ">
            <ScrollArea className="flex-1 p-4">
                <div ref={scrollAreaRef}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-start space-x-2 mb-4 ${
                                msg.userid === user?.$id
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            {msg.userid !== user?.$id && (
                                <>
                                    <picture>
                                        <img
                                            src={avatars.getInitials(
                                                msg.username,
                                                40,
                                                40
                                            )}
                                            alt={msg.username}
                                            className="rounded-full"
                                        />
                                    </picture>
                                </>
                            )}
                            <div
                                className={`flex flex-col ${
                                    msg.userid === user?.$id
                                        ? "items-end"
                                        : "items-start"
                                }`}
                            >
                                <span className="text-sm pr-2 text-muted-foreground">
                                    <Link
                                        href={`/users/${msg.userid}/${slugify(
                                            msg.username
                                        )}`}
                                        className="text-orange-500 hover:text-orange-600"
                                    >
                                        {msg.username}
                                    </Link>
                                </span>
                                <div
                                    className={`mt-1 px-4 py-2 rounded-lg max-w-[280px] sm:max-w-[400px] md:max-w-lg break-words
                                                ${
                                                    msg.userid === user?.$id
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-secondary text-secondary-foreground"
                                                }`}
                                >
                                    {isCodeSnippet(msg.content) ? (
                                        <div className="relative">
                                            <div className="bg-black flex items-center justify-between px-4 py-2 border-b border-zinc-800">
                                                <span className="text-xs text-zinc-400">
                                                    JavaScript
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-zinc-400 hover:text-zinc-300"
                                                    onClick={() =>
                                                        copyToClipboard(
                                                            msg.content,
                                                            msg.id || ""
                                                        )
                                                    }
                                                >
                                                    {copiedId === msg.id ? (
                                                        <Check className="h-4 w-4" />
                                                    ) : (
                                                        <Copy className="h-4 w-4" />
                                                    )}
                                                    <span className="sr-only">
                                                        Copy code
                                                    </span>
                                                </Button>
                                            </div>
                                            <SyntaxHighlighter
                                                language="javascript"
                                                style={vscDarkPlus}
                                                customStyle={{
                                                    margin: 0,
                                                    background: "black",
                                                    padding: "1rem",
                                                }}
                                            >
                                                {msg.content}
                                            </SyntaxHighlighter>
                                        </div>
                                    ) : (
                                        <p className="text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap break-all ">
                                            {msg.content}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {msg.userid === user?.$id && (
                                <>
                                    <picture>
                                        <img
                                            src={avatars.getInitials(
                                                msg.username,
                                                40,
                                                40
                                            )}
                                            alt={msg.username}
                                            className="rounded-full"
                                        />
                                    </picture>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleMessageSubmit)}
                    className="p-4 md:w-2/5 mx-auto bg-background border-t border-[#e5e7eb] dark:border-[#2d2d2d]"
                >
                    {error && (
                        <p className="mb-2 text-sm text-destructive">{error}</p>
                    )}
                    <div className="flex items-center space-x-2">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormControl>
                                        <Textarea
                                            placeholder="Type your message..."
                                            {...field}
                                            className="w-full bg-[#f3f4f6] dark:bg-[#1e1e1e] border-[#e5e7eb] dark:border-[#2d2d2d] rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#646cff] dark:focus:ring-[#747bff] focus:ring-offset-0 focus:outline-none"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-10 h-10 p-0 rounded-full "
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
export default Chat;
