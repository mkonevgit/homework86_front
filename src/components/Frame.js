import React from "react";

const Frame = (props) => {
   return (
      <iframe
         width="560"
         height="315"
         src={"https://www.youtube.com/embed/" + props.trackLink}
         title="YouTube video player"
         frameBorder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowFullScreen
      />
   )
}

export default Frame;

