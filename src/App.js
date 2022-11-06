import React, { useState, useEffect } from 'react'; 
import Map from './components/map'
import { HeaderWrapper, Button, MapWrapper, P} from './AppSetting'
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
  const updateTime = useSelector(state => state.location.updateTime)

  console.log(updateTime)

  // 目前有停車位的停車場
  let ParkAvailable = []
  if (Array.isArray(parkLocation) && Array.isArray(locationAvailable)) {
    const result = Array.from(locationAvailable);

    parkLocation.forEach(el => {
      let item = result.find(x => x.id === el.id);

      if (item && item.availablecar > 0 && el.totalcar > 0) {
          item = {
            ...item,
            ...el,
            fullRatio: (item.availablecar / el.totalcar)*100 <= 100 ? Math.ceil((item.availablecar / el.totalcar)*100) : 100
          }
        ParkAvailable.push(item)
      } else {
        result.push(el)
      }
    });
  }

  return(
    <>
      <HeaderWrapper className='d-flex align-items-center'>
        <h1 className='mx-4 my-2'>台北停車圖鑑</h1>
        <div className='d-flex mx-4'>
          <Button onClick={() => { setIsCheck(!isCheck) }} className={isCheck ? '' : 'active'} style={{ borderRadius: '10px 0 0 10px'}}>顯示全部停車場</Button>
          <Button onClick={() => { setIsCheck(!isCheck) }} className={isCheck ? 'active' : ''} style={{ borderRadius: '0 10px 10px 0'}}>僅顯示有位停車場</Button>
        </div>
        <div className='d-flex flex-column'>
          <P className={isCheck ? "font-weight-bold" : "d-none"}>Marker 顏色越淺 = 剩越多停車位</P>
          <P>更新時間：{updateTime}</P>
        </div>
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
