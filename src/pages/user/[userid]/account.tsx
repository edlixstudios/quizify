import { NextPage } from "next";
import UserPageLayout from "root/components/layout/userPage";

const AccountPage: NextPage = () => {
    return (
        <UserPageLayout>
            <a
                href="https://ealbrecht.lemonsqueezy.com/checkout/buy/54d63c77-029d-42fe-a452-e9d36f6dc89f?embed=1&discount=0"
                className="lemonsqueezy-button"
            >
                Buy Quiz Enthusiast
            </a>
            <script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
        </UserPageLayout>
    );
};

export default AccountPage;
