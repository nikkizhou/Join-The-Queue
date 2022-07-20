import React from 'react'
import { useNavigate } from "react-router-dom"
import './SignIn.css'

const SignIn = () => {
    const navigate = useNavigate()
    const register = () => {navigate({ pathname: '/business/Signup'})}
  return (
    <>
    <main className='login-page'>
      <div className="login-page__login">
        <h3 className="login-page__title"> Login </h3>
        <form  className='login-page__form'>
          <input
            name="loginEmail"
            className="login-page__form__input"
            placeholder="Email..."
          />
          <input
            type="password"
            name="loginPassword"
            className="login-page__form__input"
            placeholder="Password..."
          />
          <input className="login-page__form__btn" type="submit" value="Log in"/> 
        </form>
        <p className="register__title">No Account yet? Register here</p>
        <button className="register__btn" onClick={register}> Register </button>
      </div>
      </main>
    </>
  )
}

export default SignIn