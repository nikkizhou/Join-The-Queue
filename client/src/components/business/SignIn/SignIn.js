import React from 'react'
import { useNavigate } from "react-router-dom"
import './SignIn.css'

const SignIn = () => {
    const navigate = useNavigate()
    const businessId = localStorage.getItem('businessId')

    const handleSignIn = (e) => {
      e.preventDefault()

      const pathname = businessId ? `/business/ticketList/${businessId}`: '/business/Signup'
      navigate({ pathname})
    }
  return (
    <>
    <main className='login-page'>
      <div className="login-page__login">
        <h3 className="login-page__title">Business Login </h3>
        <form  className='login-page__form'  onSubmit={handleSignIn}>
          <input
            name="loginEmail"
            className="login-page__form__input"
            placeholder="Email..."
            required
          />
          <input
            type="password"
            name="loginPassword"
            className="login-page__form__input"
            placeholder="Password..."
            required 
          />
          <input className="login-page__form__btn" type="submit" value="Log in"/> 
        </form>
        <p className="register__title">No Account yet? Register here</p>
        <button onClick={handleSignIn} className="register__btn" > Register </button>
      </div>
      </main>
    </>
  )
}

export default SignIn