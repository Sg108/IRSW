import React, {useState,useEffect} from 'react'
import words from '../files/dictionary_compact.json'

const SearchBar = () => {

 const [searchInput, setSearchInput] = useState("");
 const [list, setList] = useState([...Object.keys(words)]);
 const [press,setPress]=useState(false)
 const [display, setDisplay] = useState([]);
 let w=[]
 for(let i =0 ;i<10000;i++)
 {
     w.push(list[i])
 }

  useEffect(() => {
    
   
    //console.log(w)
    console.log(list)
    if(searchInput.length>0)
    {
    let d=w.filter((word) => {
        return word.includes(searchInput);
    })
    setDisplay(d)
}
   else {
    setDisplay([])
    }
    console.log(display)
    
   
},[press]);


const handleChange = (e) => {
  e.preventDefault();
  setSearchInput(e.target.value);
 
};
const handlePress = (e) =>{
    if(e.key==='Enter')
    {
      setPress(!press)
   
    }
}





return <div>

<input
   type="search"
   placeholder="Search here"
   onChange={handleChange}
   onKeyDown={handlePress}
   value={searchInput} />

    <h2>Matches</h2>
   


{display.map((x,i) => {


   return <div>{display[i]}</div>
   


})}


</div>


};

export default SearchBar;