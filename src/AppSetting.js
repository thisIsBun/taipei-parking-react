import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  padding: 0 1rem;
  @media screen and (min-width: 768px) {
    border-bottom: 1px solid #000000;
    top: 0;
    bottom: 90vh;
    background: #ffffff;
  };
  @media screen and (min-width: 1080px) {
    padding: 0 2rem;
    border-bottom: 1.5px solid #000000;
    bottom: 88vh;
  }
`

export const H1 = styled.h1`
  display: none;
  @media screen and (min-width: 768px) {
    margin: 0 1rem;
    display: block;
    font-size: 24px;
  };
  @media screen and (min-width: 1080px) {
    font-size: 38px;
  }
`

export const Button = styled.button`
  color: #000000;
  padding: 0.5rem;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  border: 1px solid #06C755;
  border-radius: 2px;
  background-color: #ffffff;
  @media screen and (min-width: 768px) {
    font-weight: 500;
    font-size: 16px;
    border: 2px solid #06C755;
  };
  @media screen and (min-width: 1080px) {
    padding: 0.5rem 0.75rem;
    font-weight: 700;
    font-size: 20px;
  };
  &.active {
    color: #ffffff;
    background-color: #06C755;
  }
`

export const P = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    font-size: 12px;
  };
  @media screen and (min-width: 1080px) {
    font-size: 14px;
  }
`

export const MapWrapper = styled.div`
  display: flex;
  justify-content: start;
  height: 100%;
  margin: 0;
  padding: 0;
`