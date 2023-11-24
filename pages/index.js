/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log({ session })
  return <Layout>
    <div className="text-blue-900 flex justify-between">
      <h2 className="text-2xl">
        Salut, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-blue-700 text-white gap-1 items-center rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="" className="w-8 h-8" />
        <span className="py-1 px-2">{session?.user?.name}</span>
      </div>
    </div>
  </Layout>
}
