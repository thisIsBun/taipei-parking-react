import React, { useState, useEffect } from 'react'; 
import Map from './components/map'
import { HeaderWrapper, H1, Button, MapWrapper, P} from './AppSetting'
import { useSelector, useDispatch } from 'react-redux';
import { setLocation, getParkLocationAsync, getParkIdAsync } from './redux/travelSlice'
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  
  // eslint-disable-next-line no-unused-vars
  const [centerLocation, setCenterLocation] = useState()
  const [isCheck, setIsCheck] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      dispatch(setLocation({ lat: latitude, lng: longitude }))
    });
    dispatch(getParkLocationAsync())
    dispatch(getParkIdAsync())
  }, [dispatch])

  const myLocation = useSelector(state => state.location.myLocation)
  const parkLocation = useSelector(state => state.location.location[0])
  const locationAvailable = useSelector(state => state.location.locationAvailable[0])
  const updateTime = useSelector(state => state.location.updateTime)

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
        <H1 className='my-2'>來台北趴掐</H1>
        <div className='d-flex'>
          <Button htmlType="button" onClick={() => { setIsCheck(false) }} className={isCheck ? '' : 'active'} style={{ borderRadius: '10px 0 0 10px'}}>全部停車場</Button>
          <Button htmlType="button" onClick={() => { setIsCheck(true) }} className={isCheck ? 'active' : ''} style={{ borderRadius: '0 10px 10px 0'}}>有空位停車場</Button>
        </div>
        <Button className='mx-3 my-2 active' htmlType="button" onClick={() => window.location.reload(false)} style={{ borderRadius: '10px'}}>更新資料</Button>
        <div className='d-flex flex-column'>
          <P className={isCheck ? "" : "d-none"}>Marker顏色越淺：停車場的空位率越高</P>
          <P>更新時間：{updateTime ? updateTime : '資料更新中，請稍等一下'}</P>
        </div>
      </HeaderWrapper>

      <MapWrapper>
        {myLocation.lng !== 0 && 
        <Map
        myLocation={myLocation}
        renderMap={isCheck ? ParkAvailable : parkLocation} 
        centerLocation={centerLocation ? centerLocation : myLocation} />}
      </MapWrapper>
    </>
  );
}

const ReduxProvider = () => {
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default ReduxProvider;
