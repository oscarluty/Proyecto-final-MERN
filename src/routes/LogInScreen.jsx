import { Link } from 'react-router-dom'
import { useState } from 'react'
import LoginForm from '../forms/LogInForm'

export const LogInScreen = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  return (
    <LoginForm />
  )
}
