import React from "react";
import { Link } from "react-router-dom";

interface Props {
  _id: string;
  title: string;
  imgUrl: string;
}

const GameCard = ({ _id, title, imgUrl }: Props) => {
  return (
    <Link to={`http://localhost:3000/gamedetails/${_id}`}>
      <div className="card col-sm-2">
        <img className="card-img" src={imgUrl} alt="game"></img>
        <div className="card-img-overlay h4">
          <div className="card-title">{title}</div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
