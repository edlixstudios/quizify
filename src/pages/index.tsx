import { LandingPageHeader } from "root/components/shared/header";
import { GetStaticProps } from "next";
import Jumbotron from "root/components/landingPage/jumbotron";
import Price from "root/components/landingPage/price";
import Feature from "root/components/landingPage/feature";
import Footer from "root/components/shared/footer";

export const getStaticProps: GetStaticProps = () => {
    return {
        props: {},
    };
};

export default function Home() {
    return (
        <>
            <LandingPageHeader />
            <Jumbotron />
            <Feature />
            <Price />
            <Footer />
        </>
    );
}
