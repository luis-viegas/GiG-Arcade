import "./css/MultiRangeSlider.css";
import React from "react"
import { useState } from "react";

const MultiRangeSlider = (props) => {
  const currentYear = new Date().getFullYear();
  const [minVal, setMinVal] = useState(currentYear);
  const [maxVal, setMaxVal] = useState(currentYear);

  function handleClick() {
    if (minVal < 1980) {
      setMinVal(1980);
    }
    if (maxVal > currentYear) {
      setMaxVal(currentYear);
    }

    props.setActiveTags(() => ({
      ...props.activeTags,
      year: [minVal, maxVal],
    }));
  }

  return (
    <div class="wrapper">
      <div class="price-input">
        <div class="field">
          <span>Min</span>
          <br />
          <input
            type="number"
            id="min-input"
            class="input-min"
            onChange={(e) => setMinVal(Number(e.target.value))}
            value={minVal}
          />
        </div>
        <div class="field">
          <span>Max</span>
          <br />
          <input
            type="number"
            id="max-input"
            class="input-max"
            onChange={(e) => setMaxVal(e.target.value)}
            value={maxVal}
          />
        </div>
      </div>
      <div className="buttons-time">
        <button onClick={() => handleClick()}>Filter</button>
        <button
          onClick={() => {
            props.setActiveTags(() => ({
              ...props.activeTags,
              year: [],
            }));
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
