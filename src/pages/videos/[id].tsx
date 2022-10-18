import { useRouter } from "next/router";
import React from "react";
import LoadingIcons from "react-loading-icons";
import Footer from "../../components/footer";
import Header from "../../components/header";
import YtEmbed from "../../components/ytEmbed";
import { trpc } from "../../utils/trpc";

const Videos = () => {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  console.log("id:" + id);

  const { data, isLoading } = trpc.video.getById.useQuery({
    id: id ? id : "xx",
  });

  // Muuta tämä - tuottaa tyhjän sivun hetketsi
  return (
    <div className="flex h-full flex-col px-4">
      <Header />

      <div className="container mx-auto flex flex-1 flex-col items-center justify-center bg-slate-100 p-4">
        <div className="text-2xl">
          Videot:
          {isLoading ? (
            <LoadingIcons.Circles className="max-h-9" />
          ) : (
            data?.map((video) => <YtEmbed key={video.id} id={video.url} />)
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Videos;
