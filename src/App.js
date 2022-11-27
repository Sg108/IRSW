
import {useEffect,useState,useRef} from 'react'
import './App.css';
import SearchBar from './components/Search';
import words from './files/dictionary_compact.json'
import { storeWords, soundexDict } from './components/actions'
import { useDispatch,useSelector } from 'react-redux'
import SoundexSearch from './components/SoundexSearch';
function App() {
  const dispatch=useDispatch()
  const startTime=useRef(null)
  useEffect(()=>{
       let allWords=Object.keys(words)
       //let someWords=allWords.slice(0,10)
       
        dispatch(storeWords({allWords}))
        startTime.current=performance.now()
        dispatch(soundexDict({allWords}))
  },[])
  const dict = useSelector((state)=>state.dictionary.dict)
  useEffect(()=>{
    console.log('finish',dict)
    if(startTime.current)
    {
      console.log(performance.now()-startTime.current)
    }

  },[dict])
  return (
   
  
    <div className="App">
      
      <SearchBar/>
      <SoundexSearch/>
    </div>
   
  );
}

export default App;
