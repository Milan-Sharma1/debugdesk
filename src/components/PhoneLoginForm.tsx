import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2, PhoneIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const formSchema = z.object({
    phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number must not exceed 10 digits")
        .regex(/^\+?[\d\s-]+$/, "Invalid phone number format"),
    otp: z.string().optional(),
});

export function UnifiedLoginForm({
    onSubmitPhone,
    onVerifyOTP,
}: {
    onSubmitPhone: (phone: string) => void;
    onVerifyOTP: (otp: string) => void;
}) {
    const [showOTP, setShowOTP] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: "",
            otp: "",
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            if (!showOTP) {
                await onSubmitPhone(values.phoneNumber);
                setShowOTP(true);
            } else if (values.otp) {
                await onVerifyOTP(values.otp);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return isLoading ? (
        <Loader2 className="animate-spin"></Loader2>
    ) : (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
            >
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <div className="flex items-center space-x-2">
                                        <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                                        <Input
                                            placeholder="+1 (555) 000-0000"
                                            {...field}
                                            className={cn(
                                                showOTP &&
                                                    "border-green-500 focus-visible:ring-green-500"
                                            )}
                                            readOnly={showOTP}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div
                        className={cn(
                            "space-y-4 transition-all duration-300",
                            !showOTP && "opacity-50 pointer-events-none"
                        )}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Verification Code
                                </span>
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {!showOTP ? "Send Code" : "Verify & Login"}
                </Button>
            </form>
        </Form>
    );
}
