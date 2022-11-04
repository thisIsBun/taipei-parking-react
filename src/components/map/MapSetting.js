import styled from 'styled-components'

export const MapWrapper = styled.div`
  display: inline-block;
  height: 100vh;
  width: 100%;
`

export const MarkerWrapper = styled.div`
  height: 50px;
  width: 200px;
`

export const Icon = styled.img`
  height: 25px;
  width: 25px;
`

export const Text = styled.div`
  word-wrap: nowrap;
  width: auto;
  height: auto;
  display: inline-block;
  padding: 0.5rem;
  font-weight: bold;
  border-radius: 8px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #06C705;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.2);
  }
`

