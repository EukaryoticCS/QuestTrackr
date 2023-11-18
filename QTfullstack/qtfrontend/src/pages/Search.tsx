import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import axios from 'axios';
import GameCard from "../components/GameCard.tsx";
import QTNavBar from "../components/QTNavBar.tsx";
import QTFooter from "../components/QTFooter.tsx";

interface Game {
  _id: string;
  title: string;
  cover: string;
}

const Search = ({ userInputTitle }) => {
  const [details, setDetails] = useState<Array<Game>>([]);
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/v1/games?title=" + userInputTitle + "&page=" + page
    );
    setDetails([...details, ...response.data.games]);
    console.log(details);
    setPage(page + 1);

    // fetch("http://localhost:5000/api/v1/games?title=" + userInputTitle + "&page=" + {page})
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setDetails([...details, ...data.games]);
    //     setPage(page + 1);
    //   });
  };

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/v1/games?title=" + userInputTitle)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setDetails(data.games);
  //     });
  // }, [userInputTitle]);

  const gamesList = details.map((game) => (
    <GameCard _id={game._id} title={game.title} imgUrl={game.cover} />
  ));

  return (
    <>
      <QTNavBar />
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchData}
        hasMore={true}
        loader={
          <div className="loader" key={0}>
            Loading...
          </div>
        }
      >
        <div className="row row-cols-4 row-cols-md-8 g-4 m-2">
          {details.map((game) => (
            <GameCard _id={game._id} title={game.title} imgUrl={game.cover}/>
          ))}
          </div>
      </InfiniteScroll>

      <QTFooter />
    </>
  );
};

export default Search;
