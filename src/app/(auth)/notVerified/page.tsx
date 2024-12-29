"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ExternalLink, Mail, RefreshCw } from "lucide-react";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";

const NotVerified = () => {
    const { logout } = useAuthStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const handleResendVerification = async () => {
        setIsLoading(true);
        await logout();
        router.replace("/login");
        const timeout = setTimeout(() => {
            setIsLoading(false); // Hide loader after 3 seconds
        }, 3000);
        return () => clearTimeout(timeout);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md bg-background border-gray-800">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center flex items-center justify-center text-white">
                        <AlertCircle className="mr-2 h-6 w-6 text-yellow-500" />
                        Account Not Verified
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="mb-4">
                        <Mail className="mx-auto h-12 w-12 text-blue-400" />
                    </div>
                    <p className="text-lg mb-2 text-gray-200">
                        Please check your email for the verification link.
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                        If you haven&apos;t received the email, you can request
                        a new verification link.
                    </p>
                    <div className="bg-gray-800 p-3 rounded-md">
                        <p className="text-sm text-gray-300 flex items-center justify-center">
                            <ExternalLink className="mr-2 h-4 w-4 text-blue-400" />
                            Already clicked the link? Please refresh this page.
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleResendVerification}
                        disabled={isLoading}
                    >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        {isLoading ? "Loading..." : "Resend Verification Email"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default NotVerified;
