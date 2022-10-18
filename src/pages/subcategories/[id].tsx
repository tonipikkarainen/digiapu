import { useRouter } from "next/router";
import React from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { trpc } from "../../utils/trpc";

type Props = {};

const SubCategories = (props: Props) => {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  console.log("id:" + id);

  if (!id) return <div>Ei alikategorioita...</div>;

  const { data, isLoading } = trpc.subCategory.getById.useQuery({ id });

  return (
    <div className="flex h-full flex-col px-4">
      <Header />

      <div className="container mx-auto flex flex-1 flex-col items-center justify-center bg-slate-100 p-4">
        <div className="text-2xl">
          Alikategoriat:
          {data?.map((subcat) => (
            <p>{subcat.name}</p>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubCategories;
