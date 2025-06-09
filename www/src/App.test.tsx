import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('renders welcome message', () => {
    render(<App />)
    expect(screen.getByText('Welcome to My App')).toBeInTheDocument()
  })

  test('renders contact form', () => {
    render(<App />)
    expect(screen.getByText('Contactez-nous')).toBeInTheDocument()
  })
})
