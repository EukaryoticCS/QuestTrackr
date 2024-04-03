import React from "react";
import { Link } from "react-router-dom";

interface Props {
  _id: string;
  title: string;
  imgUrl: string;
}

const GameCard = ({ _id, title, imgUrl }: Props) => {
  return (
    <div className="card col-sm-2 my-auto p-0">
      <Link to={`http://localhost:3000/gamedetails/${_id}`}>
        <img className="card-img" src={imgUrl} alt="game"></img>
        <div
          className="card-img-overlay d-flex text-center h4 m-0"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="card-title mt-auto">{title}</div>
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
