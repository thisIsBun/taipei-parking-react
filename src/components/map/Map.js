import React from 'react'; 
import GoogleMapReact from 'google-map-react'
import {API_KEY} from '../../api_key'
import { MarkerWrapper, MapWrapper, Icon, Text } from './MapSetting'
import parkingmarker from './parkingmarker.svg'
import mymarker from './mymarker.svg'
import { useSelector } from 'react-redux';
import twd97tolatlng from 'twd97-to-latlng'


export default function Map ({ renderMap, centerLocation}) {

  // 用 useSelector取出 state裡保管的 location state
  const myLocation = useSelector(state => state.location.myLocaition)

  const MyMarker = ({text}) =>(
      <MarkerWrapper>
        <Icon src={mymarker} />
        {/* <Text>{text}</Text> */}
      </MarkerWrapper>
  )

  const ParkingMarker = ({text}) =>(
      <MarkerWrapper>
        <Icon src={parkingmarker} />
        {/* <Text>{text}</Text> */}
      </MarkerWrapper>
  )

  return (
    <MapWrapper>
      {/* GoogleMapReact是地圖本身*/}
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={centerLocation}
        defaultZoom={15}
        center={centerLocation}
      >
        <MyMarker
          lat={myLocation.lat}
          lng={myLocation.lng}
          // text="我的位置"
        />

        {renderMap?.map((station) => {
          const location = twd97tolatlng(station.tw97x, station.tw97y)
          return (
          <ParkingMarker
            lat={location.lat}
            lng={location.lng}
            key={station.id}
            text={station.name}
          />
          )
        })}
      </GoogleMapReact>
  </MapWrapper>


  )

}