import React from 'react';

const Loader = () => {
  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const spinnerStyle = {
    border: '16px solid #f3f3f3',
    borderTop: '16px solid #3498db',
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    animation: 'spin 2s linear infinite',
  };

  return (
    <div style={loaderStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Loader;
