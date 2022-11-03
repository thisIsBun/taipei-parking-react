import React from 'react'; 
import GoogleMapReact from 'google-map-react'
import {API_KEY} from '../../api_key'
import { MarkerWrapper, MapWrapper, Icon, Text } from './MapSetting'
import placeholder from '../../placeholder.svg'
import { useSelector } from 'react-redux';

export default function Map ({ handleCenterChange, centerLocation}) {

  // 用 useSelector取出 state裡保管的 location state
  const myLocation = useSelector(state => state.location.myLocaition)

  const MyPositionMarker = ({text}) =>(
      <MarkerWrapper>
        <Icon src={placeholder} />
        <Text>{text}</Text>
      </MarkerWrapper>
  )

  return (
    <MapWrapper>
      {/* GoogleMapReact是地圖本身*/}
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={centerLocation}
        defaultZoom={16}
      >
        <MyPositionMarker
          lat={myLocation.lat}
          lng={myLocation.lng}
          text="我的位置"
        />
      </GoogleMapReact>
  </MapWrapper>
  )

}