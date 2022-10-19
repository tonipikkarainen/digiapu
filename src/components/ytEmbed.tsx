import React from "react";

type Props = {
  id: string;
};

const YtEmbed = (props: Props) => {
  return (
    <>
      <iframe
        src={`https://www.youtube.com/embed/${props.id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default YtEmbed;
