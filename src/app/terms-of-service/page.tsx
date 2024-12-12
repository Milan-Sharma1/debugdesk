// TermsOfService.tsx
import React from "react";

const TermsOfService: React.FC = () => {
    return (
        <div className="mt-10 bg-background min-h-screen flex items-center justify-center py-12 px-6">
            <div className="max-w-4xl w-full bg-background rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-white text-center mb-6">
                    Terms of Service
                </h1>

                <p className="text-lg text-gray-300 mb-6">
                    Welcome to Debug Desk! These Terms of Service govern your
                    use of our platform. By accessing or using Debug Desk, you
                    agree to comply with and be bound by these terms. Please
                    read them carefully.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    1. Acceptance of Terms
                </h2>
                <p className="text-gray-300 mb-4">
                    By using Debug Desk, you agree to these Terms of Service and
                    any additional terms or conditions that may apply. If you do
                    not agree with these terms, please do not use the platform.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    2. User Accounts
                </h2>
                <p className="text-gray-300 mb-4">
                    To access certain features of Debug Desk, you must create an
                    account. You agree to provide accurate, complete, and
                    up-to-date information during registration and to maintain
                    the security of your account credentials.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    3. Use of the Platform
                </h2>
                <p className="text-gray-300 mb-4">
                    You agree to use Debug Desk in compliance with all
                    applicable laws and regulations. You may not use the
                    platform for any unlawful, harmful, or disruptive
                    activities, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>Posting harmful or abusive content</li>
                    <li>
                        Impersonating others or misrepresenting your affiliation
                        with any entity
                    </li>
                    <li>Engaging in spamming or phishing activities</li>
                    <li>
                        Disrupting or interfering with the platform’s
                        functionality
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    4. User Content
                </h2>
                <p className="text-gray-300 mb-4">
                    By posting content on Debug Desk (questions, answers,
                    comments, etc.), you grant us a non-exclusive, worldwide,
                    royalty-free license to use, display, and distribute your
                    content on the platform. You are solely responsible for the
                    content you post.
                </p>
                <p className="text-gray-300 mb-4">
                    You agree not to post content that infringes on the
                    intellectual property rights of others or violates any
                    applicable laws.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    5. Privacy
                </h2>
                <p className="text-gray-300 mb-4">
                    Your use of Debug Desk is also governed by our{" "}
                    <a href="/privacy-policy" className="text-blue-400">
                        Privacy Policy
                    </a>
                    , which explains how we collect and protect your personal
                    information.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    6. Termination of Account
                </h2>
                <p className="text-gray-300 mb-4">
                    We reserve the right to suspend or terminate your account at
                    any time for violating these Terms of Service or engaging in
                    unlawful behavior. Upon termination, you will no longer have
                    access to your account or any related content.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    7. Disclaimers and Limitation of Liability
                </h2>
                <p className="text-gray-300 mb-4">
                    Debug Desk is provided “as is” without any warranties,
                    express or implied. We do not guarantee the accuracy,
                    availability, or reliability of the platform. We are not
                    responsible for any damages arising from your use of Debug
                    Desk, including indirect, incidental, or consequential
                    damages.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    8. Indemnification
                </h2>
                <p className="text-gray-300 mb-4">
                    You agree to indemnify and hold harmless Debug Desk and its
                    affiliates, officers, employees, and partners from any
                    claims, losses, damages, or expenses arising out of your use
                    of the platform or your violation of these Terms of Service.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    9. Governing Law
                </h2>
                <p className="text-gray-300 mb-4">
                    These Terms of Service will be governed by and construed in
                    accordance with the laws of India, without regard to its
                    conflict of law principles. Any disputes will be resolved in
                    the competent courts of India.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    10. Changes to the Terms
                </h2>
                <p className="text-gray-300 mb-4">
                    We may update these Terms of Service from time to time. Any
                    changes will be posted on this page with an updated revision
                    date. By continuing to use Debug Desk, you accept the
                    updated terms.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    11. Contact Us
                </h2>
                <p className="text-gray-300 mb-4">
                    If you have any questions about these Terms of Service,
                    please contact us at{" "}
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

export default TermsOfService;
