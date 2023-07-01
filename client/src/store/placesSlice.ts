import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export enum LoadingStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export type PlaceType = {
  ID: string;
  Timestamp: string;
  'Place Name': string;
  'Embed Url': string;
};

const API =
  'https://script.google.com/macros/s/AKfycbzEv8-0nrl8y8aU5lQskm3lNa55IC8RNMM_sSj7recu9mEwDn6juX67u08EiT4pUMFi/exec';

export const fetchPlace = createAsyncThunk(
  'places/fetchPlace',
  async (placeId: string) => {
    const response = await fetch(`${API}?id=${placeId}`);
    return response.json();
  }
);

const persistedPlaces =
  localStorage.getItem('places') !== null
    ? JSON.parse(localStorage.getItem('places') || '')
    : [];

const initialState = {
  places: persistedPlaces,
  currentPlace: <PlaceType>{},
  status: LoadingStatus.IDLE,
  error: '',
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    toggleFavoriteForCurrnetPlace: (state, action) => {
      if (state.currentPlace) {
        const isLoved = state.places.find(
          (place: PlaceType) => place.ID === state.currentPlace.ID
        );
        if (isLoved && state.status == LoadingStatus.SUCCEEDED) {
          state.places = state.places.filter(
            (place: PlaceType) => place.ID !== state.currentPlace.ID
          );
        } else {
          state.places.push(state.currentPlace);
        }
      }
      localStorage.setItem('places', JSON.stringify(state.places));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlace.pending, (state) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(fetchPlace.fulfilled, (state, action) => {
        state.status = LoadingStatus.SUCCEEDED;
        state.currentPlace = action.payload;
      })
      .addCase(fetchPlace.rejected, (state, action) => {
        state.status = LoadingStatus.FAILED;
        state.error = action.error.message || 'Something went wrong!';
      });
  },
});

export const isCurrentPlaceLovedSelector = (state: RootState) => {
  if (!state.places.currentPlace) {
    return false;
  }
  return state.places.places.find(
    (place: PlaceType) => place.ID === state.places.currentPlace.ID
  );
};

export const { toggleFavoriteForCurrnetPlace } = placesSlice.actions;

export default placesSlice.reducer;
