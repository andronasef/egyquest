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
        toggleFavoriteForCurrnetPlace: (state, action) => {
            if (state.currentPlace) {
                const isLoved = state.places.find((place) => place.ID === state.currentPlace.ID)
                if (isLoved && state.status == LoadingStatus.SUCCEEDED) {
                    state.places = state.places.filter((place) => place.ID !== state.currentPlace.ID)
                }
                else {
                    state.places.push(state.currentPlace)
                }
            }
        }


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlace.pending, (state) => {
                state.status = LoadingStatus.LOADING

            })
            .addCase(fetchPlace.fulfilled, (state, action) => {
                state.status = LoadingStatus.SUCCEEDED
                state.currentPlace = action.payload
            })
            .addCase(fetchPlace.rejected, (state, action) => {
                state.status = LoadingStatus.FAILED
                state.error = action.error.message
            })
    }
})

export const isCurrentPlaceLovedSelector = (state) => {
    const isLoved = state.places.places.find((place) => place.ID === state.places.currentPlace.ID)
    return !!isLoved
}

export const { toggleFavoriteForCurrnetPlace } = placesSlice.actions



export default placesSlice.reducer