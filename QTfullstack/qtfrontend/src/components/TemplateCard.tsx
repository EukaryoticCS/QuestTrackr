import React from "react";
import { Link } from "react-router-dom";

interface Props {
  gameId: string;
  templateId: string;
  title: string;
  author: string;
  link: string;
}

const TemplateCard = (props: Props) => {
  return (
    <Link to={props.link} className="card">
      <div className="card-header h4">
        <div className="card-title">{props.title}</div>
        <div className="card-body"></div>
        <div className="card-footer">
          <div className="">By: {props.author}</div>
        </div>
      </div>
    </Link>
  );
};

export default TemplateCard;
