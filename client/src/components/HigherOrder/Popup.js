// React
import React from 'react';

// HOC to create dark blurred overlay over main page => Meant to display some content on top
const Popup = props => {
  return (
    <div className='popup'>
        {props.children}
    </div>
  );
}

export default Popup;
