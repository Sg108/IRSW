import { useEffect, useState, useRef } from 'react';
//import './App.css';
import SearchBar from './components/Search';
import words from './files/dictionary_compact.json';
import {
  storeWords,
  soundexDict,
  setKeyboardWeight,
} from './components/actions';
import { useDispatch, useSelector } from 'react-redux';
import SoundexSearch from './components/SoundexSearch';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import allDist from './utils/KeyboardOptimisedEditDistance';
function App() {
  const dispatch = useDispatch();
  const startTime = useRef(null);

  useEffect(() => {
    let allWords = Object.keys(words);
    //let someWords=allWords.slice(0,10)

    dispatch(storeWords({ allWords }));
    startTime.current = performance.now();
    dispatch(soundexDict({ allWords, startTime: startTime.current }));
    dispatch(setKeyboardWeight({ dists: allDist() }));
  }, []);
  const dict = useSelector((state) => state.dictionary.dict);
  useEffect(() => {
    if (startTime.current) {
      console.log(performance.now() - startTime.current);
    }
  }, [dict]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Soundex' element={<SoundexSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
