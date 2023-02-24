import { useRouter } from "next/router";
import { NextPage } from "next/types";

const TemplatePage: NextPage = () => {
    const router = useRouter();

    console.log("DASDSA", router);

    return (
        <>
            <div>{router.query.id}</div>
        </>
    );
};

export default TemplatePage;
