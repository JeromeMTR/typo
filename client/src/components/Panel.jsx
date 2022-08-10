import React, { useState, useEffect } from 'react';

const Panel = ({ showStats, countDown }) => {
  const [seconds, setSeconds] = useState(countDown);

  useEffect(() => {
    setSeconds(countDown);
  }, [countDown]);

  return (
    <div className='panel-container'>
      <span
        className='stats-toggle'
        onClick={ showStats }
      >Go to Stats</span>
      <span className='countdown-timer'>{ countDown }</span>
    </div>
  );
};

export default Panel;
