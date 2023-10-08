import React from "react";
import "./Checkbox.css";
import Select, { StylesConfig } from "react-select";
import makeAnimated from "react-select/animated";

const ColourOption = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

function Checkbox(props) {
  const animatedComponents = makeAnimated();
  return (
    <div className="checkbox">
      <label htmlFor="" className="p-label">
        {props.label}
      </label>
      <Select
        isDisabled={false}
        isClearable={true}
        components={animatedComponents}
        isMulti={props.isMulti}
        options={props.options}
        styles={colourStyles}
        closeMenuOnSelect={!props.isMulti}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    width: "250px",
  }),
};

export default Checkbox;
// text-overflow: ellipsis;
// overflow: hidden;
// white-space: nowrap;
