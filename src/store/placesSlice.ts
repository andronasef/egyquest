import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export enum LoadingStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed'
}

const API = 'https://script.google.com/macros/s/AKfycbyTiJymrTr0RD3xU5_vun7kKgkMW7UD6BsptpqqgwxNoG7ZXBnFMsihV6jRhXFm3BI2/exec'

export const fetchPlace = createAsyncThunk(
    'places/fetchPlace',
    async (placeId: string) => {
        const response = await fetch(`${API}?id=${placeId}`)
        return response.json()
    })



const placesSlice = createSlice({
    name: 'places',
    initialState: {
        places: [],
        currentPlace: null,
        status: LoadingStatus.IDLE,
        error: null
    },
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlace.pending, (state) => {
                state.status = LoadingStatus.LOADING

            })
            .addCase(fetchPlace.fulfilled, (state, action) => {
                console.log(action.payload)

                state.status = LoadingStatus.SUCCEEDED
                state.currentPlace = action.payload
            })
            .addCase(fetchPlace.rejected, (state, action) => {
                state.status = LoadingStatus.FAILED
                state.error = action.error.message
            })
    }
})


export default placesSlice.reducer