import React from 'react';
import logo from "./images/gig_logo.png";
import search from "./images/search_icon.png";
import filter_icon from"./images/filter_icon.png";
import Search from "./Search";
import { useState } from "react";
import Filter from "./Filter";
import GridView from "./GridView";
import InfoCard from "./InfoCard";

function Body(props) {
  const appName = "GIGArcade";
  const [activeTags, setActiveTags] = useState({
    genres: [],
    operative_system: [],
    UC: [],
    Playability: [],
    year: [],
    authors: [],
  });

  function showInfo(game) {
    setInfo(true);
  }

  function hideSearchMenu() {
    document.querySelector(".sideMenu").style.right = "-100%";
    setTimeout(function () {
      setSearchMenu(false);
    }, 700);
  }

  function showSearchMenu() {
    setSearchMenu(true);
    setTimeout(function () {
      document.querySelector(".sideMenu").style.right = "0";
    }, 50); //wait time needed for react to re-render i think
  }

  function getAllActiveTags() {
    let result = [];
    for (const [key, value] of Object.entries(activeTags)) {
      if (value.length !== 0) {
        if (key === "year") {
          result.push(
            <p className="active-tag-item">
              {Number(value[0]) === Number(value[1])
                ? value[0]
                : value[0] + "-" + value[1]}
            </p>
          );
        } else {
          value.forEach((elem) => {
            result.push(<p className="active-tag-item">{elem}</p>);
          });
        }
      }
    }
    return result;
  }

  const [SearchMenu, setSearchMenu] = useState(true);

  const [filterMenu, setFilterMenu] = useState(false);
  const [ShowInfo, setInfo] = useState(false);

  return (
    <div
      className="app-body"
      style={{ "max-width": props.width, "min-height": props.height }} //20px = top bar size
    >
      <div className="top-section">
        <div id="left">
          <img id="logo" src={logo}></img>
        </div>
        <div id="right">
          <div className="active-tags">{getAllActiveTags()}</div>
          <img
            className="button"
            src={filter_icon}
            onClick={() => setFilterMenu(!filterMenu)}
          />
          <img
            id="search"
            className="button"
            src={search}
            onClick={showSearchMenu}
          ></img>
        </div>
      </div>
      <div className="middle-section">
        <GridView games={props.games} tags={activeTags}></GridView>
        
      </div>
      
      <div className="bottom-section" >
        This arcade has {props.games.length} games available
      </div>

      <Filter
        func={() => setFilterMenu(false)}
        display={filterMenu ? true : false}
        activeTags={activeTags}
        setActiveTags={setActiveTags}
      ></Filter>
      {SearchMenu ? (
        <Search
          hideSearchMenu={hideSearchMenu}
          games={props.games}
          showInfo={showInfo}
        ></Search>
      ) : null}
    </div>
  );
}

export default Body;
