import { createSlice } from '@reduxjs/toolkit'
import Soundex from '../utils/Soundex.js'
const initialState = {
  dict: {},
  list: []
}

export const counterSlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    storeWords: (state,action) => {
      const {allWords}=action.payload
    
      state.list=allWords
    },
    soundexDict: (state,action) => {
       
      const {allWords}=action.payload
      if(allWords.length>0)
      {
        allWords.forEach((val)=>{
            let k=Soundex(val)
            if(state.dict[k])
            {
              state.dict[k].push(val)
            
            }
            else{
              state.dict[k]=[val]
             
            }
           
        })
      }
   
    }
   
}
})

export const { storeWords,soundexDict} = counterSlice.actions

export default counterSlice.reducer