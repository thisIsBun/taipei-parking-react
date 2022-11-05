import React, { useState, useEffect } from 'react'; 
import Map from './components/map'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setLocation, getParkLocationAsync, getParkIdAsync } from './redux/travelSlice'

export const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  height: 100%;
  margin: 0;
  padding: 0;
`

export const Label = styled.div`
  font-weight: 700;
  white-space: nowrap
`

const App = () => {
  
  const [centerLocation, setCenterLocation] = useState()
  const [isCheck, setIsCheck] = useState(true)
  const dispatch = useDispatch() //用 useDispatch產生 dispatch方法

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      dispatch(setLocation({ lat: latitude, lng: longitude }))
    });
    dispatch(getParkLocationAsync())
    dispatch(getParkIdAsync())
  }, [dispatch])

  const myLocaition = useSelector(state => state.location.myLocaition)
  const parkLocation = useSelector(state => state.location.location[0])
  // const LocationId = useSelector(state => state.location.locationId[0])
  const locationAvailable = useSelector(state => state.location.locationAvailable[0])

  let ParkAvailable = []

  if (Array.isArray(parkLocation) && Array.isArray(locationAvailable)) {
    const result = Array.from(locationAvailable);

    parkLocation.forEach(el => {
      let item = result.find(x => x.id === el.id);
      if (item) {
          item = {
            ...item,
            ...el
          }
        ParkAvailable.push(item)
      } else {
        result.push(el)
      }
    });

  }


  return(
    <>
      <div 
      // className='flex items-center'
      >
        <label 
        htmlFor='onlyAvailavle' 
        // className='text-gray-900 font-bold  whitespace-nowrap'
        >僅顯示有位
        </label>
        <input 
        type='checkbox' 
        // className='w-8 h-5' 
        id='onlyAvailavle' 
        checked={isCheck} 
        onClick={() => { setIsCheck(!isCheck) }} 
        onChange={() => { setIsCheck(!isCheck) }} 
        />
      </div>

      <Wrapper>
        {myLocaition.lng !== 0 && 
        <Map 
        renderMap={isCheck ? ParkAvailable : parkLocation} 
        centerLocation={centerLocation ? centerLocation : myLocaition} />}
      </Wrapper>
    </>
  );
}

export default App;
