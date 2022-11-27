import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Home.css';
import { useRef } from 'react';
import Card from '../Card/Card';
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  editDistanceOptimised,
  editDistanceOptimum,
  editDistanceEnhanced,
} from '../../utils/EditDistanceOptimised';
import editDistance from '../../utils/EditDistance';
import Soundex from '../../utils/Soundex';

const Home = () => {
  const searchBox = useRef(null);
  const searchBtn = useRef(null);
  const searchInp = useRef(null);
  const [searchInput, setSearchInput] = useState('');
  const [press, setPress] = useState(false);
  const [displayEdit, setDisplayEdit] = useState([]);
  const [displayEditOptimised, setDisplayEditOptimised] = useState([]);
  const [displayEditEnhanced, setDisplayEditEnhanced] = useState([]);
  const [displaySoundex, setDisplaySoundex] = useState([]);
  const [open, setOpen] = useState(false);
  const cancelBtn = useRef(null);
  const list = useSelector((state) => state.dictionary.list);
  const [data, setData] = useState([]);
  const dict = useSelector((state) => state.dictionary.dict);
  const soundexTime = useSelector((state) => state.dictionary.initialTime);
  const dists = useSelector((state) => state.dictionary.dists);

  const handleSearchBtn = (e) => {
    setOpen(true);
  };

  const handleCancelBtn = (e) => {
    setOpen(false);
    setSearchInput('');
    setData([]);
  };
  useEffect(() => {
    // console.log(list)
    // console.log(fullList)

    if (searchInput.length > 0) {
      let d1 = [];
      let d2 = [];
      let d3 = [];
      let d4 = [];
      let d = [];

      let startTime = performance.now();
      list.forEach((word) => {
        d2.push([word, editDistance(searchInput, word)]);
      });
      let endTime = performance.now();
      d.push({ name: 'Algo-1', time: endTime - startTime });
      startTime = performance.now();
      list.forEach((word) => {
        d1.push([word, editDistanceOptimum(searchInput, word)]);
      });
      endTime = performance.now();
      d.push({ name: 'Algo-2', time: endTime - startTime });
      startTime = performance.now();
      list.forEach((word) => {
        d3.push([word, editDistanceEnhanced(searchInput, word, dists)]);
      });
      endTime = performance.now();
      d.push({ name: 'Algo-3', time: endTime - startTime });

      d3 = d3.sort(function (a, b) {
        return a[1] - b[1];
      });
      d2 = d2.sort(function (a, b) {
        return a[1] - b[1];
      });
      d1 = d1.sort(function (a, b) {
        return a[1] - b[1];
      });
      startTime = performance.now();
      let code = Soundex(searchInput);
      dict[code].forEach((word) => {
        d4.push([word, editDistanceOptimum(searchInput, word)]);
      });
      endTime = performance.now();
      d.push({
        name: 'Algo-4',
        time: endTime - startTime + soundexTime,
      });

      d4 = d4.sort(function (a, b) {
        return a[1] - b[1];
      });

      if (d4.length > 5) {
        d4 = d4.slice(0, 5);
      }

      d3 = d3.slice(0, 5);
      d2 = d2.slice(0, 5);
      d1 = d1.slice(0, 5);
      setData(d);

      setDisplayEdit(d2);
      setDisplayEditEnhanced(d3);
      setDisplayEditOptimised(d1);
      setDisplaySoundex(d4);
    } else {
      setDisplayEdit([]);
      setDisplayEditEnhanced([]);
      setDisplayEditOptimised([]);
      setDisplaySoundex([]);
    }
  }, [press, list, open]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const handlePress = (e) => {
    if (e.key === 'Enter') {
      setPress(!press);
    }
  };

  return (
    <>
      <header className='heading'>
        <h1>String Similarity Search</h1>
        <h1>String Similarity Search</h1>
        {/* <h4>using Soundex and Edit Distance Algorithm</h4>
                <h4>using Soundex and Edit Distance Algorithm</h4> */}
      </header>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: '100px',
        }}
      >
        <div className={`search-box ${open ? 'active' : ''}`} ref={searchBox}>
          <input
            type='text'
            placeholder='Type to search...'
            ref={searchInp}
            onChange={handleChange}
            onKeyDown={handlePress}
            value={searchInput}
            className={`${open ? 'active' : ''}`}
          />
          <div
            className={`search-btn ${open ? 'active' : ''}`}
            onClick={handleSearchBtn}
            ref={searchBtn}
          >
            <i className='fas fa-search'></i>
          </div>
          <div
            className={`cancel-btn ${open ? 'active' : ''}`}
            onClick={handleCancelBtn}
            ref={cancelBtn}
          >
            <i className='fas fa-times'></i>
          </div>
        </div>
        {
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey='name' />
            <YAxis dataKey='time' />
            <Tooltip />
            <Bar dataKey='time' fill='#8884d8' unit='ms' barSize={40} />
          </BarChart>
        }
      </div>

      <div className='cards-container'>
        <Card
          searchtype='Edit Distance'
          headerbg='red'
          htext='white'
          Results={displayEdit}
        />
        <Card
          searchtype='Edit Distance Optimised'
          headerbg='gold'
          htext='black'
          Results={displayEditOptimised}
        />
        <Card
          searchtype='Edit Distance Enhanced'
          headerbg='blue'
          htext='white'
          Results={displayEditEnhanced}
        />
        <Card
          searchtype='Soundex'
          headerbg='rgb(3, 200, 3)'
          htext='black'
          Results={displaySoundex}
        />
      </div>
    </>
  );
};

export default Home;
