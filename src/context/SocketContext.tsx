//this is file for handling the context (because we cannot store the socket instance in store)
// so that only one socket instance is created and
//used for one client and it can be accessed anywhere throughout the app
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import socketConnection from "@/utils/socketConnection"; // Adjust path as needed
import { Socket } from "socket.io-client";
import { useAuthStore } from "@/store/Auth";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { user, hydrated } = useAuthStore();
    useEffect(() => {
        if (!hydrated) return;
        const socketInstance = socketConnection(); // Initialize socket
        if (user) {
            socketInstance.emit("initialSetup", user.$id);
        }
        setSocket(socketInstance);
    }, [hydrated]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
