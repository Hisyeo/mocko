import React from 'react';

const SizeBlocker: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', textAlign: 'center' }}>
      <div>
        <h1>Screen Size Too Small</h1>
        <p>This application is not available on screens smaller than 800px wide.</p>
      </div>
    </div>
  );
}

export default SizeBlocker;
