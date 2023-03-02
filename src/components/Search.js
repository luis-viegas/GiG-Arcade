import React from 'react';
import "./css/Search.css";
import { useState } from "react";
import gamePlaceHolder from "./images/placeholder-games.png";
import GameCard from "./GameCard";

function Search(props) {

  const [searchTerm,setSearchTerm] = useState('')

  function getGameCards() {
    let result = [];

    props.games.filter((val)=> { // filtering the search values
      if(searchTerm == "") {
        return val
      }
      if(val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val
      }
    }).map((val,key) => {
      result.push(<GameCard className="search-game-card" image = {window.gigaArcade.getGameMediaPath(val.name, val.icon)} showInfo = {props.showInfo} game = {val} name={val.name}></GameCard>)
    })

    return result;
  }

  if (true === true) {
    return (
      <div className="sideMenu">
        <div className="transparent" onClick={props.hideSearchMenu}></div>
        <div className="menu">
          <input type="text" placeholder="Search for a game..." onChange={event => {setSearchTerm(event.target.value)}}/>
          <div className="games">
            {getGameCards()}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Search;
