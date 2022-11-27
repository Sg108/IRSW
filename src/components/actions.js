import { createSlice } from "@reduxjs/toolkit"
import Soundex from "../utils/Soundex.js"
const initialState = {
    dict: {},
    list: [],
    initialTime: 0,
    dists: {},
}

export const counterSlice = createSlice({
    name: "dictionary",
    initialState,
    reducers: {
        storeWords: (state, action) => {
            const { allWords } = action.payload

            state.list = allWords
        },
        soundexDict: (state, action) => {
            const { allWords, startTime } = action.payload
            if (allWords.length > 0) {
                allWords.forEach((val) => {
                    let k = Soundex(val)
                    if (state.dict[k]) {
                        state.dict[k].push(val)
                    } else {
                        state.dict[k] = [val]
                    }
                })
            }
            let endTime = performance.now()
            state.initialTime = endTime - startTime
        },
        setKeyboardWeight: (state, action) => {
            const { dists } = action.payload
            state.dists = dists
        },
    },
})

export const { storeWords, soundexDict, setKeyboardWeight } =
    counterSlice.actions

export default counterSlice.reducer
