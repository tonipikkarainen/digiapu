import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import LoadingIcons from "react-loading-icons";
import { trpc } from "../utils/trpc";
import { HiOutlineMenu } from "react-icons/hi";
import { any } from "zod";

const AdminHeader = () => {
  //const { data, isLoading } = trpc.videoCategory.getAll.useQuery();
  const [dropopen, setOpen] = useState(false);
  const ref = useRef<any>();

  return (
    <div className="flex max-h-24 items-center space-x-2 border-b-2 border-b-slate-100 bg-zinc-900 p-9">
      <div ref={ref} className="flex lg:hidden">
        <HiOutlineMenu
          onClick={() => setOpen(!dropopen)}
          className="main-color hover:main-color-hover h-10 w-10"
        />
        {dropopen && (
          <Dropdown propref={ref} open={dropopen} setOpen={setOpen} />
        )}
      </div>
      <div className="hidden flex-1 justify-evenly lg:flex">
        <Link href={`/admin/editCategories`}>
          <a className="main-color hover:main-color-hover w-full p-4 hover:bg-gray-900 ">
            Kategoriat
          </a>
        </Link>
        <Link href={`/admin/editSubCategories`}>
          <a className="main-color hover:main-color-hover w-full p-4 hover:bg-gray-900 ">
            Alikategoriat
          </a>
        </Link>
        <Link href={`/admin/editVideos`}>
          <a className="main-color hover:main-color-hover w-full p-4 hover:bg-gray-900 ">
            Videot
          </a>
        </Link>
      </div>
      <div className="main-color flex flex-1  justify-end  p-4">
        <div className="rounded-3xl bg-slate-100  p-3">
          <Link href="/">Logo</Link>
        </div>
      </div>
    </div>
  );
};

const Dropdown = (props: {
  propref: React.MutableRefObject<any>;
  setOpen: (a: boolean) => void;
  open: boolean;
}) => {
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (props.propref.current && !props.propref.current.contains(e.target)) {
        props.setOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [props.open]);

  return (
    <div className="absolute top-20 left-20 flex flex-col rounded-md border-2 bg-black lg:hidden">
      <Link href={`/admin/editCategories/`}>
        <a
          onClick={() => props.setOpen(false)}
          className="main-color hover:main-color-hover w-full p-4 hover:bg-gray-900 "
        >
          Kategoriat
        </a>
      </Link>
      <Link href={`/admin/editSubCategories/`}>
        <a
          onClick={() => props.setOpen(false)}
          className="main-color hover:main-color-hover w-full p-4 hover:bg-gray-900 "
        >
          Alikategoriat
        </a>
      </Link>
      <Link href={`/admin/editVideos/`}>
        <a
          onClick={() => props.setOpen(false)}
          className="main-color hover:main-color-hover w-full p-4 hover:bg-gray-900 "
        >
          Videot
        </a>
      </Link>
    </div>
  );
};

export default AdminHeader;
