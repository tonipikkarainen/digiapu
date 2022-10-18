import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import LoadingIcons from "react-loading-icons";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { trpc } from "../../utils/trpc";

const SubCategories = () => {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  console.log("id:" + id);

  // Hack, sille jos id onkin undefined - miten tän tekisi paremmin?
  // Pitäisikö laittaa, että id voi olla nullish routerissa?
  const { data, isLoading } = trpc.subCategory.getById.useQuery({
    id: id ? id : "xx",
  });

  return (
    <div className="flex h-full flex-col px-4">
      <Header />

      <div className="container mx-auto flex flex-1 flex-col items-center justify-center bg-slate-100 p-4">
        <div className="space-x-2 text-2xl">
          Alikategoriat:
          {isLoading ? (
            <LoadingIcons.Circles className="max-h-9" />
          ) : (
            data?.map((subcat) => (
              <Link key={subcat.id} href={`/videos/${subcat.id}`}>
                <a>{subcat.name}</a>
              </Link>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubCategories;
