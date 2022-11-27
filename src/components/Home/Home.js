import React from 'react';
import './Home.css';
import { useRef } from 'react';
import Card from '../Card/Card';
import  { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"

// import wordsFull from "../files/dictionary.json"
//import all from "../utils/KeyboardOptimisedEditDistance"
import {
    editDistanceOptimised,
    editDistanceOptimum,
} from "../../utils/EditDistanceOptimised"
import editDistance from "../../utils/EditDistance"
import Soundex from "../../utils/Soundex"
// const searchBtn = document.querySelector('.search-btn');
// const searchBox = document.querySelector('.search-box');
// const cancelBtn = document.querySelector('.cancel-btn');
// const searchInput = document.querySelector('input');

const Home = () => {
  const searchBox = useRef(null);
  const searchBtn = useRef(null);
  const searchInp = useRef(null);
  const [searchInput, setSearchInput] = useState("")
  const [press, setPress] = useState(false)
  const [displayEdit, setDisplayEdit] = useState([])
  const [displayEditOptimised, setDisplayEditOptimised] = useState([])
  const [displayEditEnhanced, setDisplayEditEnhanced] = useState([])
  const [displaySoundex, setDisplaySoundex] = useState([])
  const cancelBtn = useRef(null);
  const list = useSelector((state) => state.dictionary.list)
  const dict = useSelector((state) => state.dictionary.dict)
  const handleSearchBtn = (e) => {
    searchBox.current.classList.add('active');
    searchInp.current.classList.add('active');
    searchBtn.current.classList.add('active');
    cancelBtn.current.classList.add('active');
    setPress(!press)
  };

  const handleCancelBtn = (e) => {
    searchBox.current.classList.remove('active');
    searchInp.current.classList.remove('active');
    searchBtn.current.classList.remove('active');
    cancelBtn.current.classList.remove('active');
  };
  useEffect(() => {
    // console.log(list)
    // console.log(fullList)

    if (searchInput.length > 0) {
        let d1 = []
        let d2 = []
        let d3 = []
        let d4 = []

        let startTime = performance.now()
        list.forEach((word) => {
            d1.push([word,editDistanceOptimised(searchInput, word)])
        })
        let endTime = performance.now()
        console.log(
            "time elapsed (optimised): ",
            endTime - startTime,
            " ms"
        )
        startTime = performance.now()
        list.forEach((word) => {
            d2.push([word,editDistance(searchInput, word)])
        })
        endTime = performance.now()
        console.log(
            "time elapsed (unoptimised) : ",
            endTime - startTime,
            " ms"
        )
        startTime = performance.now()
        list.forEach((word) => {
            d3.push([word, editDistanceOptimum(searchInput, word)])
        })
        // editDistanceOptimum("apole", "apple")
        // editDistanceOptimum("piyush", "anopheles")
        endTime = performance.now()
        console.log(
            "time elapsed (super optimised): ",
            endTime - startTime,
            " ms"
        )
        // console.log(d)
        d3 = d3.sort(function (a, b) {
            return a[1] - b[1]
        })
        d2=d2.sort(function (a, b) {
          return a[1] - b[1]
      })
      d1=d1.sort(function (a, b) {
        return a[1] - b[1]
    })
     startTime = performance.now()
            let code=Soundex(searchInput)
          
          dict[code].forEach((word) => {
              d4.push([word, editDistanceOptimum(searchInput, word)])
          })
            // for(let word in dict[code])
            // {
            //     console.log(dict[code][word],word)
            //     d4.push([dict[code][word],code])
            // }
            
           endTime = performance.now()
            console.log(
                "time elapsed (unoptimised) : ",
                endTime - startTime,
                " ms"
            )
            d4=d4.sort(function (a, b) {
              return a[1] - b[1]
          })

            if(d4.length>5)
            {
               d4=d4.slice(0,5)
            }
            // console.log(d)
           
        d3 = d3.slice(0, 5)
        d2 = d2.slice(0, 5)
        d1 = d1.slice(0, 5)
        // console.log(d)
        setDisplayEdit(d2)
        setDisplayEditEnhanced(d3)
        setDisplayEditOptimised(d1)
        setDisplaySoundex(d4)
    } else {
      setDisplayEdit([])
      setDisplayEditEnhanced([])
      setDisplayEditOptimised([])
    }
}, [press, list])

const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
}
const handlePress = (e) => {
    if (e.key === "Enter") {
      setPress(!press)
    }
}

  return (
    <>
      <div className='search-box' ref={searchBox}>
        <input type='text' placeholder='Type to search...'  ref={searchInp} onChange={handleChange}
               onKeyDown={handlePress}
                value={searchInput} />
        <div className='search-btn' onClick={handleSearchBtn}   ref={searchBtn}>
          <i className='fas fa-search'></i>
        </div>
        <div className='cancel-btn' onClick={handleCancelBtn} ref={cancelBtn}>
          <i className='fas fa-times'></i>
        </div>
      </div>
      <div className='cards-container'>
        <Card searchtype='Edit Distance' headerbg='red' htext='white'
         Results={displayEdit} />
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
        <Card searchtype='Soundex' headerbg='rgb(3, 200, 3)' htext='black' 
         Results={displaySoundex}/>
      </div>
    </>
  );
};

export default Home;
