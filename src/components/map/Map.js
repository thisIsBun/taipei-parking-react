import GoogleMapReact from 'google-map-react'
import {API_KEY} from '../../api_key'
import { MarkerWrapper, MapWrapper, Icon, Text } from './MapSetting'
import mymarker from './mymarker.svg'
import { useSelector } from 'react-redux';
import twd97tolatlng from 'twd97-to-latlng'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function showModal() {

  const show = true

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function Map ({ renderMap, centerLocation}) {
  const myLocation = useSelector(state => state.location.myLocaition)

  const MyMarker = ({text}) =>(
    <MarkerWrapper>
      <Icon src={mymarker} />
      {/* <Text>{text}</Text> */}
    </MarkerWrapper>
  )

  const ParkingMarker = ({colorRation, id, name, serviceTime, totalcar, availablecar, area, address, tel, fee}) =>(

    <MarkerWrapper
    onClick={showModal}
    >
      <ParkingModal
        id={id}
        name={name}
        serviceTime={serviceTime}
        totalcar={totalcar}
        availablecar={availablecar}
        area={area}
        address={address}
        tel={tel}
        fee={fee}

        renderTrigger={({ handleShow }) => (
        <svg 
        variant="primary" 
        onClick={handleShow}
        xmlns="http://www.w3.org/2000/svg" 
        style={{width: '25px', height: '25px', cursor: 'pointer'}} 
        viewBox="0 0 20 20" 
        fill={colorRation === 0 || null ? '#06C755' : `rgb(6,${ 0 + colorRation*2 },85)`}>

        <path 
        fillRule="evenodd" 
        onClick={handleShow}
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
        clipRule="evenodd" />
        </svg>
        )}
      />
      {/* <Icon src={parkingmarker} /> */}
      {/* <Text>{id}</Text> */}
    </MarkerWrapper>
  )

  return (
    <MapWrapper>
      {/* GoogleMapReact是地圖本身*/}
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={centerLocation}
        defaultZoom={13}
        center={centerLocation}
      >
        <MyMarker
          lat={myLocation.lat}
          lng={myLocation.lng}
          text="我的位置"
        />

        {renderMap?.map((station) => {
          const location = twd97tolatlng(station.tw97x, station.tw97y)
          return (
            <ParkingMarker
              lat={location.lat}
              lng={location.lng}
              key={station.id}
              colorRation={station.colorRatio}
              id={station.id}
              name={station.name}
              area={station.area}
              address={station.address}
              tel={station.tel}
              fee={station.payex}
              servieTime={station.serviceTime}
              totalcar={station.totalcar}
              availablecar={station.availablecar}
              payex={station.payex}
            />
          )
        })}
      </GoogleMapReact>
  </MapWrapper>
  )
}

function ParkingModal({ renderTrigger, id, name, serviceTime, totalcar, availablecar, area, address, tel, fee }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {renderTrigger && renderTrigger({ handleShow })}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{name} {id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>費用：{fee}</p>
          <p>可停車位：{availablecar}</p>
          <p>總共車位：{totalcar}</p>
          <p>地址：台北市 {area} {address}</p>
          <p>電話：{tel}</p>
          <p>營業時間：{serviceTime ? serviceTime : 'N/A'}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}