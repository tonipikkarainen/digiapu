import Link from "next/link";
import React from "react";
import { trpc } from "../utils/trpc";

const Header = () => {
  const { data, isLoading } = trpc.videoCategory.getAll.useQuery();
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex max-h-24 items-center space-x-2 border-b-2 border-b-slate-100 bg-stone-50 p-9">
      {data?.map((videocat) => (
        <Link key={videocat.id} href={`/subcategories/${videocat.id}`}>
          <a className="rounded-3xl bg-sky-500 p-3 text-white hover:bg-sky-700">
            {videocat.name}
          </a>
        </Link>
      ))}
      <div className="flex flex-1 justify-end bg-slate-100 p-4">
        <div>
          <Link href="/">Logo</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
