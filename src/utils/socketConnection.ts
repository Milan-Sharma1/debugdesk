import { io, Socket } from "socket.io-client";

export default function socketConnection(): Socket {
    // Check for environment variable
    if (!process.env.NEXT_PUBLIC_SOCKET_SERVER_URL) {
        throw new Error(
            "Socket server URL is not defined in the environment variables"
        );
    }

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL, {
        transports: ["websocket"],
    });

    // connection setup
    newSocket.on("connect", () => {
        console.log("Server connected");
    });

    // Handle errors
    newSocket.on("connect_error", (err) => {
        console.log("Socket server connection error:", err);
    });

    return newSocket;
}
