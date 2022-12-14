import React, { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"

// import wordsFull from "../files/dictionary.json"
import all from "../utils/KeyboardOptimisedEditDistance"
import {
    editDistanceOptimised,
    editDistanceOptimum,
} from "../utils/EditDistanceOptimised"
import editDistance from "../utils/EditDistance"
const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("")
    //const [list, setList] = useState([...Object.keys(words)])
    // const [fullList, setFullList] = useState([...Object.keys(wordsFull)])
    const list = useSelector((state) => state.dictionary.list)
    const dict = useSelector((state) => state.dictionary.dict)
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
            list.forEach((word) => {
                editDistanceOptimised(searchInput, word)
            })
            let endTime = performance.now()
            console.log(
                "time elapsed (optimised): ",
                endTime - startTime,
                " ms"
            )
            startTime = performance.now()
            list.forEach((word) => {
                editDistance(searchInput, word)
            })
            endTime = performance.now()
            console.log(
                "time elapsed (unoptimised) : ",
                endTime - startTime,
                " ms"
            )
            startTime = performance.now()
            list.forEach((word) => {
                d.push([word, editDistanceOptimum(searchInput, word)])
            })
            editDistanceOptimum("apole", "apple")
            editDistanceOptimum("piyush", "anopheles")
            endTime = performance.now()
            console.log(
                "time elapsed (super optimised): ",
                endTime - startTime,
                " ms"
            )
            // console.log(d)
            d = d.sort(function (a, b) {
                return a[1] - b[1]
            })
            d = d.slice(0, 100)
            // console.log(d)
            setDisplay(d)
        } else {
            setDisplay([])
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
                return <div>{x[0]}</div>
            })}
        </div>
    )
}

export default SearchBar
