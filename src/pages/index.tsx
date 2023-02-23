import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={"h-screen bg-red-300 flex justify-center items-center"} >
          <Link
            href={"/app/"}
          >
              Aha
          </Link>
      </div>
    </>
  )
}
