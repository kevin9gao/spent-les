import React from "react";
import JavaScript from '../../images/JavaScript-logo.png';
import ReactLogo from '../../images/react-logo.png';
import Redux from '../../images/redux-logo.png';
import Python from '../../images/python-logo.png';
import Flask from '../../images/flask-logo.png';
import SQLAlchemy from '../../images/sqlalchemy-logo.png';
import HTMLLogo from '../../images/html-logo.png';
import CSSLogo from '../../images/css-logo.png';
import Node from '../../images/nodejs-logo.png';
import Postgres from '../../images/postgresql-logo.png';
import Docker from '../../images/docker-logo.png';

const AboutPage = () => {
  return (
    <main className="about-container">
      <div id="profile-pic">
        <img
          src='https://avatars.githubusercontent.com/u/100536560?v=4'
          alt='profile-pic'
        />
      </div>
      <div id="name-container">
        <p id="name">Kevin Gao</p>
        <div>
          <p id="position">I am a full stack web developer with an education background
                          at App Academy.</p>
        </div>
        <p id="technologies-header">Technologies Used:</p>
        <div id="technologies-list">
          <div id="left">
            <div className="technologies">
              <img src={JavaScript} />
              <span>JavaScript</span>
            </div>
            <div className="technologies">
              <img src={ReactLogo} />
              <span>React</span>
            </div>
            <div className="technologies">
              <img src={Redux} />
              <span>Redux</span>
            </div>
            <div className="technologies">
              <img src={HTMLLogo} />
              <span>HTML</span>
            </div>
            <div className="technologies">
              <img src={Node} />
              <span>Node</span>
            </div>
            <div className="technologies">
              <img src={Docker} />
              <span>Docker</span>
            </div>
          </div>
          <div id="right">
            <div className="technologies">
              <span>Python</span>
              <img src={Python} />
            </div>
            <div className="technologies">
              <span>Flask</span>
              <img src={Flask} />
            </div>
            <div className="technologies">
              <span>SQLAlchemy</span>
              <img src={SQLAlchemy} />
            </div>
            <div className="technologies">
              <span>CSS</span>
              <img src={CSSLogo} />
            </div>
            <div className="technologies">
              <span>PostgreSQL</span>
              <img src={Postgres} />
            </div>
          </div>
        </div>
        <div id="technologies-list"></div>
      </div>
      <div id="about-links">
        <a
          href="https://www.linkedin.com/in/kevin-gao-81a7b8241/"
          target='_blank'
          rel="noreferrer"
          >
          <img
            src="https://sharethis.imgix.net/2017/05/LinkedIn.png?fm=webp&auto=compress&q=1"
            className="anchor-images"
          />
        </a>
        <a
          href="https://github.com/kevin9gao"
          target='_blank'
          rel="noreferrer"
          >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            className="anchor-images"
          />
        </a>
      </div>
    </main>
  );
}

export default AboutPage;
