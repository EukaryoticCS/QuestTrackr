import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ReactLoading from 'react-loading';
import axios from 'axios';
import GameCard from "../components/GameCard.tsx";

interface Game {
  _id: string;
  title: string;
  cover: string;
}

const Search = ({ userInputTitle }) => {
  const [details, setDetails] = useState<Array<Game>>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setDetails([]);
    setPage(0);
  }, [userInputTitle])

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/v1/games?title=" + userInputTitle + "&page=" + page
    );
    setDetails([...details, ...response.data.games]);
    console.log(details);
    setPage(page + 1);
  };

  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchData}
        hasMore={true}
        loader={
          <div className="d-flex justify-content-center" key="0">
            <ReactLoading type="bars" />
          </div>
          
        }
      >
        <div className="row row-cols-4 row-cols-md-8 g-4 m-2">
          {details.map((game) => (
            <GameCard _id={game._id} title={game.title} imgUrl={game.cover}/>
          ))}
          </div>
      </InfiniteScroll>
    </>
  );
};

export default Search;
