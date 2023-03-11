import {
    PayPalButtons,
    PayPalScriptProvider,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import React, { useEffect, useRef, useState } from "react";
import {
    MAIN_GRADIENT,
    MAIN_GRADIENT_DARK,
    MAIN_GRADIENT_HOVER,
    MAIN_GRADIENT_HOVER_FROM_DARK,
    MAIN_GRADIENT_LIGHT,
} from "root/components/shared/gradient";
import { Input } from "root/components/util/formComponents";
import { useSubscription } from "root/store/subscription";

interface SubscriptionProvider {
    planId: string;
    pickedSubscriptionId: string;
    labelName: string;
    labelId: string;
    defaultChecked?: boolean;
    className?: string;
}

export default function SubscriptionProvider({
    planId,
    defaultChecked = false,
    labelName,
    labelId,
    className = "",
}: SubscriptionProvider) {
    const subscriptionId = useSubscription((state) => state.subscriptionId);
    const setSubscription = useSubscription((state) => state.setSubscriptionId);

    return (
        <label
            htmlFor={labelId}
            className={`p-8 w-2/3 text-2xl text-center font-bold  bg-gradient-to-b ${className} ${
                subscriptionId === planId
                    ? `${MAIN_GRADIENT} drop-shadow-md text-sky-50`
                    : `${MAIN_GRADIENT_DARK} text-sky-900`
            } md:w-1/3 ${
                subscriptionId !== planId ? MAIN_GRADIENT_HOVER_FROM_DARK : ""
            } md:hover:cursor-pointer `}
        >
            <input
                className={"hidden"}
                id={labelId}
                type={"radio"}
                value={planId}
                name={"sub"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSubscription(e.target.value);
                }}
                defaultChecked={defaultChecked}
            />
            {labelName}
        </label>
    );
}
