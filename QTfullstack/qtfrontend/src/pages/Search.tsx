import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard.tsx';

const Search = ({userInputTitle}) => {
  const [details, setDetails] = useState([{_id: "", title: "", cover: ""}]);

  useEffect(() => {
    console.log(userInputTitle);
    fetch("http://localhost:5000/api/v1/games?title=" + userInputTitle)
    .then((res) => res.json())
    .then((data) => {console.log(data); setDetails(data.games)})
  }, [userInputTitle])

  const gamesList = details.map(game => <GameCard _id={game._id} title={game.title} imgUrl={game.cover}/>)

  return (
    <>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {gamesList}
      </div>
    </>
  )
}

export default Search;