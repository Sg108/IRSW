import React, { useState, useEffect } from "react"

import { useSelector, useDispatch } from 'react-redux'

// import wordsFull from "../files/dictionary.json"
import Soundex from "../utils/Soundex"
const SoundexSearch = () => {
    const [searchInput, setSearchInput] = useState("")
    //const [list, setList] = useState([...Object.keys(words)])
    // const [fullList, setFullList] = useState([...Object.keys(wordsFull)])
    const list = useSelector((state)=>state.dictionary.list)
    const dict = useSelector((state)=>state.dictionary.dict)
    //const sound = useSelector((state)=>state.dictionary.dict)
    const [press, setPress] = useState(false)
    const [display, setDisplay] = useState([])

    //  let w=[]
    //  for(let i =0 ;i<10000;i++)
    //  {
    //      w.push(list[i])
    //  }
    //console.log(dict)
    useEffect(() => {
        // console.log(list)
        // console.log(fullList)
        
        if (searchInput.length > 0) {
            let d = []

           
            let startTime = performance.now()
            let code=Soundex(searchInput)
            console.log(dict[code])
            for(let word in dict[code])
            {
                console.log(dict[code][word],word)
                d.push(dict[code][word])
            }
            let endTime = performance.now()
            console.log(
                "time elapsed (unoptimised) : ",
                endTime - startTime,
                " ms"
            )
      

            if(d.length>100)
            {
               d=d.slice(0,100)
            }
            // console.log(d)
            setDisplay(d)
        } else {
            setDisplay([])
        }
        
    }, [press])

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
        <div>
            <input
                type="search"
                placeholder="Search here"
                onChange={handleChange}
                onKeyDown={handlePress}
                value={searchInput}
            />

            <h2>Matches</h2>

            {display.map((x, i) => {
                return <div>{x}</div>
            })}
        </div>
    )
}

export default SoundexSearch
