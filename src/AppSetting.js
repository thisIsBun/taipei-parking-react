import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  border-bottom: 1px solid #000000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  right: 0;
  background: #ffffff;
`

export const Button = styled.div`
  
  color: #000000;
  padding: 6px 10px;
  cursor: pointer;
  // border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  width: 160px;
  text-align: center;
  border: 2px solid #06C755;
  &.active {
    background-color: #06C755;
  }
`

export const MapWrapper = styled.div`
  display: flex;
  justify-content: start;
  height: 100%;
  margin: 0;
  padding: 0;
`

export const P = styled.div`
  font-size: 14px;
  margin: 0;
`