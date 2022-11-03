import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    myLocaition: { lat: 0, lng: 0 },
    location: [],
    locationAvailable: [],
    locationId: []
}

export const travelSlice = createSlice({
    name: 'travel',
    initialState,
    reducers: {
        addLocation: (state, action) => {
            state.location.push(action.payload)
        },
        setLocation: (state, action) => {
            state.myLocaition = { lat: action.payload.lat, lng: action.payload.lng };
        },
    },
})

export const { addLocation, setLocation } = travelSlice.actions

export default travelSlice.reducer