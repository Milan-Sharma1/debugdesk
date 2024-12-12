import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException, ID, Models, OAuthProvider } from "appwrite";
import { account } from "@/models/client/config";

export interface UserPrefs {
    reputation: number;
}

interface IAuthStore {
    session: Models.Session | null;
    jwt: string | null;
    user: Models.User<UserPrefs> | null;
    hydrated: boolean;
    setHydrated(): void;
    verifySession(): Promise<void>;
    login(
        email: string,
        password: string
    ): Promise<{
        success: boolean;
        error?: AppwriteException | null;
    }>;
    logout(): Promise<void>;
    createAccount(
        name: string,
        email: string,
        password: string
    ): Promise<{ success: boolean; error?: AppwriteException | null }>;
    googleLogin(): void;
    phoneLogin(phone: string): Promise<{
        success: boolean;
        userId?: string;
        error?: AppwriteException | null;
    }>;
    phoneVerify(
        userId: string,
        secret: string
    ): Promise<{ success: boolean; error?: AppwriteException | null }>;
    updateName(
        Name: string
    ): Promise<{ success: boolean; error?: AppwriteException | null }>;
}

export const useAuthStore = create<IAuthStore>()(
    persist(
        immer<IAuthStore>((set) => ({
            //initial state
            session: null,
            jwt: null,
            user: null,
            hydrated: false,

            setHydrated() {
                set({ hydrated: true });
            },
            async verifySession() {
                try {
                    const session = await account.getSession("current");
                    const [user, { jwt }] = await Promise.all([
                        account.get<UserPrefs>(),
                        account.createJWT(),
                    ]);
                    if (!user.prefs?.reputation)
                        await account.updatePrefs<UserPrefs>({
                            reputation: 0,
                        });
                    set({ session, user, jwt });
                } catch (error) {
                    console.log(error);
                }
            },
            async login(email: string, password: string) {
                try {
                    const session = await account.createEmailPasswordSession(
                        email,
                        password
                    );
                    const [user, { jwt }] = await Promise.all([
                        account.get<UserPrefs>(),
                        account.createJWT(),
                    ]);
                    if (!user.prefs?.reputation)
                        await account.updatePrefs<UserPrefs>({
                            reputation: 0,
                        });
                    set({ session, user, jwt });
                    return { success: true };
                } catch (error) {
                    console.log(error);
                    return {
                        success: false,
                        error:
                            error instanceof AppwriteException ? error : null,
                    };
                }
            },

            async logout() {
                try {
                    await account.deleteSessions();
                    set({ session: null, jwt: null, user: null });
                } catch (error) {
                    console.log(error);
                }
            },
            async createAccount(name: string, email: string, password: string) {
                try {
                    await account.create(ID.unique(), email, password, name);
                    return { success: true };
                } catch (error) {
                    console.log(error);
                    return {
                        success: false,
                        error:
                            error instanceof AppwriteException ? error : null,
                    };
                }
            },
            async googleLogin() {
                try {
                    account.createOAuth2Session(
                        OAuthProvider.Google, // provider
                        "https://debugdesk.milansharma.me/", // redirect here on success
                        "https://debugdesk.milansharma.me/login" // redirect here on failure
                    );
                } catch (error) {
                    console.log(error);
                }
            },
            async phoneLogin(phone: string) {
                try {
                    const token = await account.createPhoneToken(
                        ID.unique(),
                        phone
                    );
                    return { success: true, userId: token?.userId };
                } catch (error) {
                    console.log(error);
                    return {
                        success: false,
                        error:
                            error instanceof AppwriteException ? error : null,
                    };
                }
            },
            async phoneVerify(userId: string, secret: string) {
                try {
                    const session = await account.createSession(userId, secret);
                    const [user, { jwt }] = await Promise.all([
                        account.get<UserPrefs>(),
                        account.createJWT(),
                    ]);
                    if (!user.prefs?.reputation)
                        await account.updatePrefs<UserPrefs>({
                            reputation: 0,
                        });
                    set({ session, user, jwt });
                    return { success: true };
                } catch (error) {
                    console.log(error);
                    return {
                        success: false,
                        error:
                            error instanceof AppwriteException ? error : null,
                    };
                }
            },
            async updateName(Name: string) {
                try {
                    await account.updateName(Name);
                    set((state) => {
                        if (state.user) {
                            state.user.name = Name;
                        }
                    });
                    return { success: true };
                } catch (error) {
                    return {
                        success: false,
                        error:
                            error instanceof AppwriteException ? error : null,
                    };
                }
            },
        })),
        {
            name: "auth",
            onRehydrateStorage() {
                return (state, error) => {
                    if (!error) state?.setHydrated();
                };
            },
        }
    )
);
