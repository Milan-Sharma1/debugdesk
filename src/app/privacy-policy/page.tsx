// PrivacyPolicy.tsx
import React from "react";

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="mt-10 bg-background min-h-screen flex items-center justify-center py-12 px-6">
            <div className="max-w-4xl w-full bg-background rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-white text-center mb-6">
                    Privacy Policy
                </h1>

                <p className="text-lg text-gray-300 mb-6">
                    At Debug Desk, we value and respect your privacy. This
                    Privacy Policy outlines the types of personal information we
                    collect, how it is used, and the steps we take to protect
                    your information when you use our platform.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    1. Information We Collect
                </h2>
                <p className="text-gray-300 mb-4">
                    When you use Debug Desk, we may collect the following
                    information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>
                        Personal information such as your name, email address,
                        and profile details.
                    </li>
                    <li>
                        Usage data, such as the pages you visit, interactions
                        with posts, and user activity on the platform.
                    </li>
                    <li>
                        Device and browser information for improving the
                        platform’s performance and providing personalized user
                        experiences.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    2. How We Use Your Information
                </h2>
                <p className="text-gray-300 mb-4">
                    The information we collect is used to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>
                        Provide, improve, and personalize your experience on
                        Debug Desk.
                    </li>
                    <li>
                        Communicate with you regarding account-related updates,
                        features, or security notices.
                    </li>
                    <li>
                        Enhance platform security and protect against fraud or
                        misuse of our services.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    3. Data Security
                </h2>
                <p className="text-gray-300 mb-4">
                    We take reasonable measures to protect the personal data you
                    provide through Debug Desk. Your data is stored securely,
                    and we use encryption methods where appropriate. However, no
                    method of data transmission over the internet is completely
                    secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    4. Sharing Your Information
                </h2>
                <p className="text-gray-300 mb-4">
                    We do not sell or rent your personal information to third
                    parties. However, we may share your information in the
                    following situations:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>
                        With third-party service providers that assist in
                        platform maintenance or other operational functions
                        (e.g., hosting services).
                    </li>
                    <li>
                        If required by law or to comply with legal processes or
                        governmental requests.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    5. Your Rights
                </h2>
                <p className="text-gray-300 mb-4">
                    You have the right to access, update, and delete the
                    personal information you provide to Debug Desk. You can
                    manage your account settings or contact us directly to make
                    changes or request data deletion.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    6. Cookies
                </h2>
                <p className="text-gray-300 mb-4">
                    Debug Desk may use cookies to enhance your user experience.
                    Cookies are small text files placed on your device that help
                    us remember your preferences and track usage patterns. You
                    can disable cookies through your browser settings, but this
                    may affect the functionality of the platform.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    7. Changes to This Policy
                </h2>
                <p className="text-gray-300 mb-4">
                    We may update this Privacy Policy from time to time. Any
                    changes will be posted on this page with an updated revision
                    date. By continuing to use Debug Desk after such changes,
                    you accept the updated policy.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    8. Contact Us
                </h2>
                <p className="text-gray-300 mb-4">
                    If you have any questions or concerns regarding this Privacy
                    Policy, please feel free to reach out to us at
                    <a
                        href="mailto:hello@milansharma.me"
                        className="text-blue-400"
                    >
                        hello@milansharma.me
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
