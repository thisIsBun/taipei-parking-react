import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    myLocaition: { lat: 0, lng: 0 },
    location: [],
    locationAvailable: [],
    locationId: [],
    updateTime: ""
}

export const getParkLocationAsync = createAsyncThunk('location/getLocationAsync',
  async () => {
    try {
      const resByLocation = await axios.get('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json')
      console.log('getParkLocation api')
      return resByLocation.data.data.park
    } catch (error) {
      console.error(error)
    }
  }
)

export const getParkIdAsync = createAsyncThunk('location/getIdAsync',
  async () => {
    const resByLocation = await axios.get('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json')
    let parkId = []
    return {
      available: resByLocation.data.data.park,
      parkId: resByLocation.data.data.park.map((park) => parkId.push(park.id)),
      updateTime: resByLocation.data.data.UPDATETIME,
    }
  }
)

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
  extraReducers: {
    [getParkLocationAsync.fulfilled]: (state, action) => {
      state.location.push(action.payload);
    },
    [getParkIdAsync.fulfilled]: (state, action) => {
      state.locationAvailable.push(action.payload.available);
      state.locationId.push(action.payload.parkId);
      state.updateTime = action.payload.updateTime;
    },
  }
})



export const { addLocation, setLocation } = travelSlice.actions

export default travelSlice.reducer