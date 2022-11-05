import React, { useState, useEffect } from 'react'; 
import Map from './components/map'
import { HeaderWrapper, Button, MapWrapper} from './AppSetting'
import { useSelector, useDispatch } from 'react-redux';
import { setLocation, getParkLocationAsync, getParkIdAsync } from './redux/travelSlice'

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
  const locationAvailable = useSelector(state => state.location.locationAvailable[0])

  // 目前有停車位的停車場
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
      {/* <label 
      htmlFor='onlyAvailavle' 
      >僅顯示有位
      </label>
      <input 
      type='checkbox' 
      id='onlyAvailavle' 
      checked={isCheck} 
      onClick={() => { setIsCheck(!isCheck) }} 
      onChange={() => { setIsCheck(!isCheck) }} 
      /> */}

      <HeaderWrapper className='d-flex align-items-center'>
        <h1 className='font-bold text-4xl mx-4 my-2 text-blue-400'>台北停車圖鑑</h1>
        <Button onClick={() => { setIsCheck(!isCheck) }} >
          { isCheck ? "顯示全部停車場" : "僅顯示有位停車場"}
        </Button>
      </HeaderWrapper>

      <MapWrapper>
        {myLocaition.lng !== 0 && 
        <Map 
        renderMap={isCheck ? ParkAvailable : parkLocation} 
        centerLocation={centerLocation ? centerLocation : myLocaition} />}
      </MapWrapper>
    </>
  );
}

export default App;
