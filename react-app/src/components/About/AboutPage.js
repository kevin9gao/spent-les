import React from "react";

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
        <p id="position">I am a full stack web developer with an education background
                        at App Academy.</p>
        <p id="technologies">Technologies Used:</p>
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
