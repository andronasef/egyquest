import { configureStore } from '@reduxjs/toolkit'
import placesReducer from '../store/placesSlice'
const store = configureStore({
    reducer: {
        places: placesReducer
    }

})
export default store