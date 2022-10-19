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
    <div className="flex h-full flex-col px-8">
      <Header />

      <div className="main-color mx-auto grid flex-1 grid-cols-1 flex-col items-center justify-center gap-x-8 gap-y-2  overflow-y-scroll text-2xl md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <LoadingIcons.Circles className="max-h-9" />
        ) : (
          data?.map((video) => (
            <div key={video.id} className="flex items-center justify-center  ">
              <YtEmbed key={video.id} id={video.url} />
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Videos;
