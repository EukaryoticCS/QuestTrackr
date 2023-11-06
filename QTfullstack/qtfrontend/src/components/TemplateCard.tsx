import React from "react";

interface Props {
  imgUrl: string;
  title: string;
  author: string;
}

const TemplateCard = (props: Props) => {
  const s3url = 'https://questtrackr.s3.us-east-2.amazonaws.com/' + props.imgUrl

  return (
    <div className="card col-sm-2">
      <img
        className="card-img"
        src={s3url}
        alt="game"
      ></img>
      <div className="card-img-overlay h4">
        <div className="card-title">{props.title}</div>
        <div className="card-text">
          <div className="position-absolute bottom-0 end-0">By: {props.author}</div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
