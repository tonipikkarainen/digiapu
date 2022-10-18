import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex max-h-24 items-center space-x-2 border-t-2 border-t-slate-100 bg-stone-50 p-9">
      <div className="flex flex-1 justify-end p-4">
        <div>
          <Link href="/">Logo</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
