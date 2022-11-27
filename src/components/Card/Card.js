import React from 'react';
import './Card.css';
const Card = (props) => {
  return (
    <div className='Card'>
      <header style={{ backgroundColor: props.headerbg, color: props.htext }}>
        <h1>{props.searchtype}</h1>
      </header>
      <ul>
        <li>word1</li>
        <li>word2</li>
        <li>word3</li>
        <li>word4</li>
        <li>word5</li>
      </ul>
    </div>
  );
};

export default Card;
