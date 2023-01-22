import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex max-h-24 items-center space-x-2 border-t-2 border-t-slate-100  bg-zinc-900 p-9">
      <div className="main-color flex flex-1 justify-end p-4">
        <div className="rounded-3xl bg-slate-100 p-3">
          <Link href="/">Koti</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
