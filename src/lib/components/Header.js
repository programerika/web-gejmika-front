import React from 'react';

const Header = () => {
  return (
    <div className='header'>
      <h2>Webgejmika</h2>
      <div className='help-wrapper'>
        <img 
          className='input'
          src="/icons/question-mark.png" 
          onClick=''
          alt="help" 
        />
      </div>
    </div>
  );
};

export default Header;
