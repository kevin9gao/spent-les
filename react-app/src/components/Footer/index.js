import React from "react";
import Logo from '../../images/logo.jpg';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div id="logo-wrapper" className="footer">
        <img
          src={Logo}
          alt='logo'
          className="logo"
          />
        <span>Spent-Lès</span>
      </div>
      <div id="about-wrapper" className="footer">
        <p id="name">Kevin Gao</p>
        <a
          className="footer-about-links"
          href="https://www.linkedin.com/in/kevin-gao-81a7b8241/"
          target="_blank"
          rel="noreferrer"
          >
            <img
              src="https://sharethis.imgix.net/2017/05/LinkedIn.png?fm=webp&auto=compress&q=1"
              className="anchor-images"
              />
        </a>
        <a
          className="footer-about-links"
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
      <div id="year-wrapper" className="footer">
        <span id="footer-year">2022</span>
      </div>
    </div>
  );
}

export default Footer;
