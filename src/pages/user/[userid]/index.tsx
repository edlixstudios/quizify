import { NextPage } from "next";
import { useRouter } from "next/router";
import UserPageLayout from "root/components/layout/userPage";
import { UserPageSidebar } from "root/components/sidebar";
import { useSubscription } from "root/store/subscription";

const UserPage: NextPage = () => {
    const subscriptionId = useSubscription((state) => state.subscriptionId);

    const router = useRouter();

    return <UserPageLayout>Main</UserPageLayout>;
};

export default UserPage;

{
    /* <div className={"container h-screen p-16 flex flex-col items-center"}>
<div className={"p-12 font-bold text-3xl"}>
    Voluptua aliquyam sit facilisi ipsum dolore magna. Aliquyam at erat labore nonummy
    diam et sit lorem dolor wisi no elit clita. Kasd liber at consequat lorem at vel sed
    no placerat lorem et dolore diam accumsa
</div>

<div className={"flex items-center mt- justify-center p-4 w-full"}>
    <SubscriptionProvider
        className={"rounded-l-md"}
        planId={"P-6CW11491EC926064HMQCREHY"}
        labelName={"Quiz Enthusiast"}
        labelId={"ent"}
        pickedSubscriptionId={subscriptionId}
        defaultChecked
    />
    <SubscriptionProvider
        className={"rounded-r-md"}
        planId={"P-4CM25323XN317845CMQDEVBY"}
        labelName={"Quiz Master"}
        labelId={"mas"}
        pickedSubscriptionId={subscriptionId}
    />
</div>

<PayPalScriptProvider
    options={{
        "client-id":
            "AeHufPRpXfrO5XpIX9TKMQX5auujYWgBUWwlHB-wt-6vOX9xbNkB93Pwk_DnD6qb4MVcYoyAXN8KLZyE",
        currency: "EUR",
        vault: true,
        components: "buttons",
        intent: "subscription ",
    }}
>
    <div className={"w-full flex mt-8 justify-center "}>
        <PayPalButtons
            className={"w-1/3"}
            forceReRender={[subscriptionId]}
            createSubscription={async (data, actions) => {
                const sub = await actions.subscription.create({
                    plan_id: subscriptionId,
                });
                return sub;
            }}
            onApprove={async (data, action) => {
                const promiseSub = await action.subscription?.get()!;
                type subType = typeof promiseSub.value;

                const sub = promiseSub as subType;

                console.log("Query", router.query);

                const response = await (
                    await fetch(`${location.origin}/api/payment/checkout`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            orderId: data.orderID,
                            userId: router.query.userid,
                            planId: sub.plan_id,
                            paymentId: sub.id,
                            status: sub.status,
                            billingTime: sub.billing_info?.last_payment?.time,
                            nextBillingTime: sub.billing_info?.next_billing_time,
                        }),
                    })
                ).json();

                console.log("Response", response);

                // console.log("Approved Data", data);
                // // console.log("order", await action.order);
                // console.log("subscription get", );
                // console.log(
                //     "subscription activate",
                //     await action.subscription?.activate()
                // );
                // console.log("Approved Action", await action);
                // console.log("Approved Action", action);
            }}
        />
    </div>
</PayPalScriptProvider>
</div> */
}
