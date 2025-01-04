"use client";
import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import socketConnection from "@/utils/socketConnection";
import { Socket } from "socket.io-client";
import { useAuthStore } from "@/store/Auth";
import { Message } from "@/app/chat/[id]/Chat";
import { toast } from "sonner";
import { ToastMessage } from "@/components/ToastMessage";
import { usePathname } from "next/navigation";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, hydrated } = useAuthStore();
    const pathname = usePathname();
    const currentRoomId = useRef<string | undefined>(undefined);
    const personalMsg = useRef<Message[]>([]); // Use ref instead of state for messages to avoid re-renders
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Extract the current room ID from the path
        const roomId = pathname.split("/").at(-1);
        currentRoomId.current = roomId;
    }, [pathname]);

    useEffect(() => {
        if (!hydrated) return;
        const socketInstance = socketConnection(); // Initialize socket
        setSocket(socketInstance);
    }, [hydrated]);

    useEffect(() => {
        if (user && socket) {
            socket.emit("initialSetup", user.$id);
            socket.on("message", (newMessage) => {
                if (
                    newMessage.sentTo === user.$id &&
                    newMessage.userid !== currentRoomId.current
                ) {
                    personalMsg.current.push(newMessage);
                    // toast for the new message
                    toast.custom(
                        (t) => (
                            <ToastMessage
                                message={newMessage}
                                onDismiss={() => toast.dismiss(t)}
                            />
                        ),
                        {
                            duration: 5000,
                            position: "top-right",
                        }
                    );
                }
            });
        }
    }, [user, socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
