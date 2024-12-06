"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheckIcon } from "lucide-react";
import { UnifiedLoginForm } from "@/components/PhoneLoginForm";
import { toast } from "sonner";
import { useAuthStore } from "@/store/Auth";
import { useState } from "react";

function phoneLoginPage() {
    const { phoneLogin, phoneVerify } = useAuthStore();
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const handlePhoneSubmit = async (phone: string) => {
        const response = await phoneLogin(`+91${phone}`);
        if (response?.success) {
            setUserId(response.userId);
            toast.success("OTP Sent");
        }
        if (response.error?.message) {
            toast.error(response.error?.message);
        }
    };

    const handleOTPVerify = async (otp: string) => {
        const response = await phoneVerify(userId as string, otp);
        if (response?.success) {
            setUserId(undefined);
            toast("Success!");
        }
        if (response.error?.message) {
            toast.error("Invalid OTP");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                        <ShieldCheckIcon className="w-6 h-6 text-primary" />
                        <CardTitle className="text-2xl">Secure Login</CardTitle>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                        Enter your phone number to receive a verification code
                    </p>
                </CardHeader>
                <CardContent>
                    <UnifiedLoginForm
                        onSubmitPhone={handlePhoneSubmit}
                        onVerifyOTP={handleOTPVerify}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default phoneLoginPage;
