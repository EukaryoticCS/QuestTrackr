import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ReactLoading from "react-loading";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import GameCard from "../components/GameCard.tsx";

interface Game {
  _id: string;
  title: string;
  cover: string;
}

const Search = ({ userInputTitle }) => {
  const [details, setDetails] = useState<Array<Game>>([]);
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState("");

  const debounce = useDebouncedCallback((searchVal) => {
    setTitle(searchVal);
  }, 300);

  useEffect(() => {
    debounce(userInputTitle);
  }, [userInputTitle]);

  useEffect(() => {
    setDetails([]);
    setPage(0);
  }, [title]);

  const fetchData = async () => {
    if (title !== "") {
      const response = await axios.get(
        "http://localhost:5000/api/v1/games?title=" + title + "&page=" + page
      );
      setDetails([...details, ...response.data.games]);
      setPage(page + 1);
    }
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
            <GameCard
              key={game._id}
              _id={game._id}
              title={game.title}
              imgUrl={game.cover}
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Search;
