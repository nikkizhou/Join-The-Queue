import React from 'react'
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import './About.css';

const About = () => {
  return (
    <>
    <section className='about-us'>
        <h1 className='about-us__title'>Queue me Up </h1>
        <div className='about__wrapper'>
          <div className='about__upperSection'>
            Queue me Up was built in July 2022 as a graduation poject by a group of young developers in Stockholm, Sweden.<br />
            The idea for the application is to help customers so they dont have to wait so long for their  turn and waiting in cold days .
            They can sit in home  or car and see the status for Queue.
          </div>
          <div className='about__lowerSection'>
            <div className='about__apollo'>
              <img className='apollo-img' src="https://media-exp2.licdn.com/dms/image/C4E03AQHAgJYPs8EYiA/profile-displayphoto-shrink_400_400/0/1656610356494?e=1663804800&v=beta&t=Fpc7iG2sx1ljfASKL8lFlcxgNQ7pEXYKGYewpDAR09k" alt='Nikki'/>
              <p className='apollo-name'>Nikki</p>
              <div className="apollo-links">
                <a className='apollo__icon' href='https://github.com/nikkizhou' target='blank'><FaGithubSquare /></a>
                <a className='apollo__icon' href='https://www.linkedin.com/in/nikki-zhou-b456ba152/' target='blank'><FaLinkedin/></a>
              </div>
            </div>
            <div className='about__apollo'>
            <img className='apollo-img' src='https://media-exp2.licdn.com/dms/image/C4E03AQHAgJYPs8EYiA/profile-displayphoto-shrink_400_400/0/1656610356494?e=1663804800&v=beta&t=Fpc7iG2sx1ljfASKL8lFlcxgNQ7pEXYKGYewpDAR09k' alt="Yakub" />
            <p className='apollo-name'>Yakub</p>
            <div className="apollo-links">
              <a className='apollo__icon' href='https://github.com/JakubRaczkowski' target='blank'><FaGithubSquare /></a>
              <a className='apollo__icon' href='https://www.linkedin.com/in/nikki-zhou-b456ba152/' target='blank'><FaLinkedin/></a>
            </div>

            </div>
            <div className='about__apollo'>
            <img className='apollo-img' src='https://media-exp2.licdn.com/dms/image/D4D35AQGeAbmzi87yOg/profile-framedphoto-shrink_400_400/0/1655733510970?e=1658844000&v=beta&t=OcLNZ4GfM4jAE18kcc-kVrJek-PCpVwgvX_Ehc5VgNc' alt="Chris" />
            <p className='apollo-name'>Chris</p>
            <div className="apollo-links">
              <a className='apollo__icon' href='https://github.com/chrisobrien88' target='blank'><FaGithubSquare /></a>
              <a className='apollo__icon' href='https://www.linkedin.com/in/chris-o-brien-314791212/' target='blank'><FaLinkedin/></a>
            </div>


            </div>
            <div className='about__apollo'>
            <img className='apollo-img' src='https://media-exp2.licdn.com/dms/image/C4D03AQGHm3Untqb13A/profile-displayphoto-shrink_400_400/0/1614243225811?e=1663804800&v=beta&t=T9Kp_Obd6iHcgpUkHuaGbTHWspPzW3l80TEFCNb9Y9s' alt="Shoaib" />
            <p className='apollo-name'>Shoaib</p>

            <div className="sapollo-links">
              <a className='apollo__icon' href='https://github.com/mshoaibtalha' target='blank'><FaGithubSquare /></a>
              <a className='apollo__icon' href='https://www.linkedin.com/in/m-shoaib-pak/' target='blank'><FaLinkedin/></a>
            </div>


            </div>
          </div>
        </div>
    </section>
   </>
)
}

export default About