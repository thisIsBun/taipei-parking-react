// import { cleanup, fireEvent, render, screen } from '@testing-library/react'
// import '@testing-library/jest-dom'
// import ParkingModal from '../map/Map.js'

// beforeEach(cleanup)
// const fee = '60元/時，停車未滿1小時以1小時計算，逾1小時以上，未滿半小時以半小時計算。月租：全日7,000元/月，4,000元/月(12-24)。'

// const mockGeolocation = {
//   getCurrentPosition: jest.fn(),
// };
// global.navigator.geolocation = mockGeolocation;

// const mockMyLocation = {
//   lng: jest.fn(),
//   lat: jest.fn(),
// };

// test('should include fee in modal', () => {
//     render(<ParkingModal fee={fee}/>)
    
//     const modalElement = screen.getByTestId('ParkingModal')
//     expect(modalElement).toBeInTheDocument();
// })