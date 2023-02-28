import { useLoca } from "root/hooks/loca";
import React, { ReactNode, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Input } from "../util/formComponents";
import { useActiveTemplate } from "root/store/templates";
import { useRouter } from "next/router";
import { FullTemplate } from "root/lib/templateClass";
import { toast } from "react-hot-toast";
import localforage from "localforage";
import Sidebar from "../sidebar";
import ModalPortal from "./modalPortal";
import Link from "next/link";

export default function Header() {
  const loca = useLoca();
  const router = useRouter();
  const activeTemplate = useActiveTemplate((state) => state.activeTemplate);
  const setActiveTemplate = useActiveTemplate(
    (state) => state.setActiveTemplate
  );
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  async function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.preventDefault();

    const { user, id } = router.query as { user: string; id: string };

    if (user === "default") {
      toast.promise(localforage.setItem(id, activeTemplate), {
        loading:
          loca.localization.constructionTemplate.promiseMessage.updateTitle
            .loading[loca.language],
        success:
          loca.localization.constructionTemplate.promiseMessage.updateTitle
            .success[loca.language],
        error:
          loca.localization.constructionTemplate.promiseMessage.updateTitle
            .error[loca.language],
      });
    } else {
      toast.promise(
        (
          await fetch(`${location.origin}/api/templates/${user}/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(activeTemplate),
          })
        ).json(),
        {
          loading:
            loca.localization.constructionTemplate.promiseMessage.updateTitle
              .loading[loca.language],
          success:
            loca.localization.constructionTemplate.promiseMessage.updateTitle
              .success[loca.language],
          error:
            loca.localization.constructionTemplate.promiseMessage.updateTitle
              .error[loca.language],
        }
      );
    }
  }

  return (
    <>
      <header className={"p-6 shadow-md flex items-center "}>
        <button
          onClick={(e) => setShowSidebar(true)}
          title={
            loca.localization.constructionTemplate.hamburgerButton[
              loca.language
            ]
          }
          className={" transition-colors p-1 rounded-md xl:hover:bg-slate-200"}
        >
          <GiHamburgerMenu className={"h-full w-8 text-slate-900"} />
        </button>
        <div className={"flex-grow flex justify-center"}>
          <Input
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            onBlur={handleOnBlur}
            type={"text"}
            className={
              "text-center font-bold rounded-md outline outline-sky-500 p-1 xl:p-2 xl:w-1/2 "
            }
            value={activeTemplate?.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setActiveTemplate({
                ...(activeTemplate as FullTemplate),
                title: e.target.value,
              })
            }
          />
        </div>
      </header>
      {showSidebar ? (
        <ModalPortal>
          <Sidebar closeSidebar={() => setShowSidebar(false)} />
        </ModalPortal>
      ) : null}
    </>
  );
}

export function LandingPageHeader() {
  const loca = useLoca();

  return (
    <header className={"p-8 flex justify-center"}>
      <nav className={"w-4/5 flex items-center "}>
        <Link
          href={"/"}
          className={
            "font-bold text-2xl p-2 w-fit transition-all bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900 text-transparent bg-clip-text hover:xl:scale-110"
          }
        >
          {loca.localization.app}
        </Link>
        <div className={"flex-grow flex justify-end gap-8"}>
          <NavLink href={"/#features"}>Features</NavLink>
          <NavLink href={"/#prices"}>Prices</NavLink>
        </div>
      </nav>
    </header>
  );
}

export function NavLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link
      className={"text-slate-900 p-1 rounded-md hover:xl:bg-slate-200"}
      href={href}
    >
      {children}
    </Link>
  );
}
