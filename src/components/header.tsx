import Link from "next/link";
import React from "react";
import LoadingIcons from "react-loading-icons";
import { trpc } from "../utils/trpc";

const Header = () => {
  const { data, isLoading } = trpc.videoCategory.getAll.useQuery();

  return (
    <div className="flex max-h-24 items-center space-x-2 border-b-2 border-b-slate-100 bg-zinc-900 p-9">
      <div className="flex flex-1 justify-evenly">
        {isLoading ? (
          <LoadingIcons.Circles className="max-h-9" />
        ) : (
          data?.map((videocat) => (
            <Link key={videocat.id} href={`/subcategories/${videocat.id}`}>
              <a className="main-color hover:main-color-hover rounded-3xl ">
                {videocat.name}
              </a>
            </Link>
          ))
        )}
      </div>
      <div className="main-color flex flex-1  justify-end  p-4">
        <div className="rounded-3xl bg-slate-100  p-3">
          <Link href="/">Logo</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
