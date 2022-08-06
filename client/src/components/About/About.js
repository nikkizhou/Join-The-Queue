import React from 'react'
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import chris from './chris.jpg';
import shoaib from './shoaib.jpeg';
import yakub from './yakub.jpeg';
import './About.css';

const About = () => {
  return (
    <section className='about-us'>
      <h1 className='about-us__title'>JoinTheQ</h1>
      <div className='about__wrapper'>
        <div className='about__upperSection'>
          <p>JoinTheQ was built in July 2022 as a graduation poject by a group of young developers in Stockholm, Sweden.<br /></p>
            The idea behind the project was to provide a solution to the tedious experience of standing in a queue, all that wasted time! With JoinTheQ you can easily relax.
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
            <img className='apollo-img' src={yakub} alt="Jakub" />
            <p className='apollo-name'>Yakub</p>
            <div className="apollo-links">
              <a className='apollo__icon' href='https://github.com/JakubRaczkowski' target='blank'><FaGithubSquare /></a>
              <a className='apollo__icon' href='https://www.linkedin.com/in/jakub-raczkowski-a3787a246/' target='blank'><FaLinkedin/></a>
            </div>
          </div>
          <div className='about__apollo'>
            <img className='apollo-img' src={chris}  alt="Chris" />
            <p className='apollo-name'>Chris</p>
            <div className="apollo-links">
              <a className='apollo__icon' href='https://github.com/chrisobrien88' target='blank'><FaGithubSquare /></a>
              <a className='apollo__icon' href='https://www.linkedin.com/in/chris-o-brien-314791212/' target='blank'><FaLinkedin/></a>
            </div>
          </div>
          <div className='about__apollo'>
          <img className='apollo-img' src={shoaib} alt="Shoaib" />
          <p className='apollo-name'>Shoaib</p>
          <div className="sapollo-links">
            <a className='apollo__icon' href='https://github.com/mshoaibtalha' target='blank'><FaGithubSquare /></a>
            <a className='apollo__icon' href='https://www.linkedin.com/in/m-shoaib-pak/' target='blank'><FaLinkedin/></a>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default About