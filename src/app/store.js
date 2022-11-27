import { configureStore } from '@reduxjs/toolkit'
import dictionaryReducer from '../components/actions'
export const store = configureStore({
  reducer: {
    dictionary:dictionaryReducer
  },
})