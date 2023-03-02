import "./css/Filter.css";
import arrow from "./images/arrow_down.svg";
import React from "react"
import { useState } from "react";
import FilterItem from "./FilterItem";

import { getTags } from "./api/tagsApi.js";

const TagTypes = Object.keys(getTags());

function Filter(props) {
  return (
    <div
      className={
        props.display
          ? "sideMenuFilter sideMenuFilter-Show"
          : "sideMenuFilter sideMenuFilter-Hide"
      }
    >
      <div className="transparent" onClick={props.func}></div>
      <div className="menu">
        <div className="filter">
          {TagTypes.map((item, index) => (
            <FilterItem
              activeTags={props.activeTags}
              setActiveTags={props.setActiveTags}
              title={item}
            ></FilterItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
