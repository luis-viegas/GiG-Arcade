import React from "react"
import { useState } from "react";
import "./css/Filter.css";
import arrow from "./images/arrow_down.svg";
import MultiRangeSlider from "./MultiRangeSlider";

import { getTags } from "./api/tagsApi.js";

const Tags = getTags();

function FilterItem(props) {
  const [open, setOpen] = useState(false);

  const [searchTermPerson, setSearchTermPerson] = useState("");

  function isActive(string) {
    return props.activeTags[props.title].indexOf(string) !== -1;
  }

  function convertName(string) {
    switch (string) {
      case "genres":
        return "Genre";
      case "operative_system":
        return "Operative System";
      case "year":
        return "Release Year";
      case "authors":
        return "Author";
      default:
        return string;
    }
  }

  function returnItem(item) {
    if (searchTermPerson === "") {
      return (
        <p
          className={isActive(item) ? "active" : "normal"}
          onClick={() => handleButtonClick(item, props.title)}
        >
          {item}
        </p>
      );
    } else {
      if (item.toLowerCase().includes(searchTermPerson.toLowerCase())) {
        return (
          <p
            className={isActive(item) ? "active" : "normal"}
            onClick={() => handleButtonClick(item, props.title)}
          >
            {item}
          </p>
        );
      }
    }
  }

  function handleButtonClick(string, title) {
    if (!isActive(string)) {
      props.setActiveTags(() => ({
        ...props.activeTags,
        [title]: [...props.activeTags[props.title], string],
      }));
      console.log(props.activeTags);
    } else {
      var filtered = props.activeTags[props.title].filter(function (
        value,
        index,
        arr
      ) {
        return value !== string;
      });
      props.setActiveTags(() => ({ ...props.activeTags, [title]: filtered }));
    }
  }

  return (
    <div className={open ? "filter-item open" : "filter-item"}>
      <div className="item-title" onClick={() => setOpen(!open)}>
        <span>
          <p>{convertName(props.title)}</p>
        </span>
        <img className="arrowIcon" src={arrow}></img>
      </div>
      <hr />
      <div className={open ? "item-content open" : "item-content"}>
        {props.title === "authors" ||
        props.title === "genres" ||
        props.title === "UC" ? (
          <input
            className="item-search"
            type="text"
            placeholder={"Search for a name..."}
            onChange={(event) => {
              setSearchTermPerson(event.target.value);
            }}
          />
        ) : null}

        {props.title === "year" ? (
          <MultiRangeSlider
            setActiveTags={props.setActiveTags}
            activeTags={props.activeTags}
          ></MultiRangeSlider>
        ) : null}

        {Tags[props.title].map((item, index) => returnItem(item))}
      </div>
    </div>
  );
}

export default FilterItem;
