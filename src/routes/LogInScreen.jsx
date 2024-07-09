import { Link } from 'react-router-dom'
import { useState } from 'react'
import LoginForm from '../forms/LogInForm'
import RegisterForm from '../forms/RegisterForm';

export const LogInScreen = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  return (
    <div className="flex items-center justify-center ">
      <LoginForm />
    </div>
    
  )
}
