import React from 'react';
import './Home.css';
import { useRef } from 'react';
import Card from '../Card/Card';
// const searchBtn = document.querySelector('.search-btn');
// const searchBox = document.querySelector('.search-box');
// const cancelBtn = document.querySelector('.cancel-btn');
// const searchInput = document.querySelector('input');

const Home = () => {
  const searchBox = useRef(null);
  const searchBtn = useRef(null);
  const searchInput = useRef(null);
  const cancelBtn = useRef(null);
  const handleSearchBtn = (e) => {
    searchBox.current.classList.add('active');
    searchInput.current.classList.add('active');
    searchBtn.current.classList.add('active');
    cancelBtn.current.classList.add('active');
  };

  const handleCancelBtn = (e) => {
    searchBox.current.classList.remove('active');
    searchInput.current.classList.remove('active');
    searchBtn.current.classList.remove('active');
    cancelBtn.current.classList.remove('active');
  };

  return (
    <>
      <div className='search-box' ref={searchBox}>
        <input type='text' placeholder='Type to search...' ref={searchInput} />
        <div className='search-btn' onClick={handleSearchBtn} ref={searchBtn}>
          <i className='fas fa-search'></i>
        </div>
        <div className='cancel-btn' onClick={handleCancelBtn} ref={cancelBtn}>
          <i className='fas fa-times'></i>
        </div>
      </div>
      <div className='cards-container'>
        <Card searchtype='Edit Distance' headerbg='red' htext='white' />
        <Card
          searchtype='Edit Distance Optimised'
          headerbg='gold'
          htext='black'
        />
        <Card
          searchtype='Edit Distance Enhanced'
          headerbg='blue'
          htext='white'
        />
        <Card searchtype='Soundex' headerbg='rgb(3, 200, 3)' htext='black' />
      </div>
    </>
  );
};

export default Home;
