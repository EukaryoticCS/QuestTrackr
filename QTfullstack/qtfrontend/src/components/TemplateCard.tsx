import React from "react";

interface Props {
  title: string;
  author: string;
}

const TemplateCard = (props: Props) => {
  return (
    <div className="card col-sm-2">
      <img
        className="card-img"
        src="https://i1.theportalwiki.net/img/thumb/b/b8/PortalBoxart.jpg/1024px-PortalBoxart.jpg"
        alt="Card cap"
      ></img>
      <div className="card-img-overlay">
        <div className="card-header">{props.title}</div>
        <div className="card-body d-flex flex-column">
          <div className="my-auto align-bottom">By: {props.author}</div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
