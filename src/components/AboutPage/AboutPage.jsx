import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div className='outline, center'>
        <p>Technologies used:</p>
        <p>React.js</p>
        <p>Redux.js</p>
        <p>ReduxSagas</p>
        <p>Node.js</p>
        <p>JavaScript</p>
        <p>JSX</p>
        <p>SQL</p>
        {/* <p>PG</p> */}
        <p>Express.js</p>
        {/* <p>Axios</p> */}
        <p>Cloudinary</p>
        <p>HTML</p>
        <p>CSS</p>
        <p>MUI</p>
      </div >
    </div >
  );
}

export default AboutPage;
