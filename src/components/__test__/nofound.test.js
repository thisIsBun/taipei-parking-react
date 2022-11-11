import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {NoPage} from '../pages'
  
test('should render NoPage',async()=>{
    render(<NoPage/>)
    const modalElement = screen.getByTestId('NoPage')
    expect(modalElement).toBeInTheDocument();
})