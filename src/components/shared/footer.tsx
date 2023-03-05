import { useState } from "react";
import { useLoca } from "root/hooks/loca";

export default function Footer() {
    const [year, _] = useState<number>(new Date().getFullYear());
    const loca = useLoca();

    return (
        <footer className={"p-8 bg-slate-800 text-slate-50 flex"}>
            <div>
                Copyright © {year} {loca.localization.app}. All rights reserved.
            </div>
        </footer>
    );
}
