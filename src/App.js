import React, { useState } from 'react'; //引入 react定義好的 components
import GoogleMapReact from 'google-map-react'
import { API_KEY } from './api_key'

const MyPositionMarker = ({ text }) => <div>{text}</div>;


// Map元件載入完成 -> onGoogleApiLoaded OK -> 執行 apiHasLoaded裡要做的事情
const SimpleMap = (props) => {

  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)
  const [mapApiLoaded, setMapApiLoaded] = useState(false)

  // apiHasLoaded，將地圖實體、地圖 api傳入 useState
  // map為物件，畫面上看到的地圖就是來自於這物件 / maps指的是 google map api物件，可以用來搜尋附近地標等
  const apiHasLoaded = (map, maps) => {
    setMapInstance(map)
    setMapApi(maps)
    setMapApiLoaded(true)
  }

  // handleCenterChange會從 mapInstance取得地圖正中心點的經緯的，然後把值傳進 myPosition改變地圖畫面
  const handleCenterChange = () => {
    if(mapApiLoaded) {
      setMyPosition({
        lat: mapInstance.center.lat(),
        lng: mapInstance.center.lng()
      })
    }
  }

  // 用 useState存放 MyPosition的經緯度，地標也會依這數值顯示
  const [myPosition, setMyPosition] = useState({
    lat: 25.04,
    lng: 121.53
  })

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>

      {/* GoogleMapReact是地圖本身*/}
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals // 預設 true(只寫屬性名稱表示為布林值)，true才可以使用 onGoogleApiLoaded
        onGoogleApiLoaded={({map, maps}) => apiHasLoaded(map, maps)} //onGoogleApiLoaded取得 google map裡 map, maps參數後，執行 apiHasLoaded
        onBoundsChange={handleCenterChange} //googlemapreact內建的屬性，當地圖邊界有改變時，執行 handleCenterChange
      >
        <MyPositionMarker
          lat={myPosition.lat}
          lng={myPosition.lng}
          text="My Position"
        />

      </GoogleMapReact>
    </div>
  )
}

// 用 defaultProps預設 SimpleMap的預設值
SimpleMap.defaultProps = {
  center: {
    lat: 25.04,
    lng: 121.53
  },
  zoom: 17
};

// App
function App() {
  return (
    <div className="App">
      <SimpleMap/>
    </div>
  )
}

export default App;
