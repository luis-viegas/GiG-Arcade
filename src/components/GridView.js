import React from "react"
import "./css/Grid.css";
import gamePlaceHolder from "./images/placeholder-games.png";

import GameCard from "./GameCard";

import { getTags } from "./api/tagsApi.js";

const Tags = getTags();
const TagTypes = Object.keys(getTags());

function GridView(props) {
  //for loop to genenerate game cards
  //game card will receive info of the game

  function isTagsEmpty() {
    for (const [tagType, tagArray] of Object.entries(props.tags)) {
      if (tagArray.length != 0) {
        return false;
      }
    }
    return true;
  }

  function filterFunc(gamecard) {
    let flag = false;
    let gameTags = {};
    Object.keys(props.tags).forEach((tagType) => {
      switch (tagType) {
        case "authors":
          gameTags[tagType] = gamecard.props.game[tagType].map((e) => e.name);
          break;
        case "Playability":
          console.log(">>>>>>");
          console.log(gamecard.props.game["operative_system"][0]);
          gameTags[tagType] =
            gamecard.props.game["operative_system"][0].toLowerCase() ==
            "windows"
              ? "Playable"
              : "QR Code";
          break;
        default:
          gameTags[tagType] = gamecard.props.game[tagType];
      }
    });

    for (const [tagType, tagArray] of Object.entries(props.tags)) {
      tagArray.forEach((element) => {
        if (tagType === "year") {
          if (
            tagArray[0] <= gameTags["year"] &&
            tagArray[1] >= gameTags["year"]
          ) {
            flag = true;
          }
        } else {
          if (gameTags[tagType].indexOf(element) > -1) {
            flag = true;
          }
        }
      });
    }

    return flag;
  }

  function setGameCards() {
    let gameCards = [];
    for (let i = 0; i < props.games.length; i++) {

              gameCards.push(
        <GameCard
          className="game-card"
          image={window.gigaArcade.getGameMediaPath(props.games[i].name, props.games[i].icon)}
          showInfo={props.showInfo}
          game={props.games[i]}
          name={props.games[i].name}
        ></GameCard>
      );
     

    }
    if (!isTagsEmpty()) {
      gameCards = gameCards.filter(filterFunc);
    }

    return gameCards;
  }

  return <div id="grid-container">{setGameCards()}</div>;
}

export default GridView;
