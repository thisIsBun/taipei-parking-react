import React, { useState, useEffect } from 'react'; 
import Map from './components/map'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setLocation, getParkLocationAsync } from './redux/travelSlice'

export const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  height: 100%;
  margin: 0;
  padding: 0;
`

const App = () => {
  
  const [centerLocation, setCenterLocation] = useState()

  const myLocaition = useSelector(state => state.location.myLocaition)
  const parkLocation = useSelector(state => state.location.location[0])

  const dispatch = useDispatch() //用 useDispatch產生 dispatch方法

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      dispatch(setLocation({ lat: latitude, lng: longitude }))
    });
    dispatch(getParkLocationAsync())
  }, [dispatch])

  return(
    <Wrapper>
      {myLocaition.lng !== 0 && 
      <Map 
      renderMap={parkLocation} 
      centerLocation={centerLocation ? centerLocation : myLocaition} 
      />}
    </Wrapper>
  );
}

export default App;
