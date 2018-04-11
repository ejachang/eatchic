/* eslint react/prop-types: "off" */

import React from 'react';

function Suggestions(props) {
  const options = props.options.map(option => (
    <li key={option.id}>
      <button type="button" key={option.id} onClick={props.handleAccept} value={option.name}>
        {option.name}
      </button>
    </li>
  ));
  return (
    <ul className="suggestions">
      <li key="1">
        <button onClick={props.handleAdd} onKeyPress={props.handleAdd}>Add {props.item}</button>
      </li>
      {options}
    </ul>
  );
}

export default Suggestions;
