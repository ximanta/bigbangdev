import React from 'react';

function MissionsPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">
        Space Missions
      </h1>
      <p>
        Explore historical and ongoing space missions. (Coming soon!)
      </p>
      {/* Placeholder for mission list or interactive timeline */}
      <div style={{ padding: '20px', border: '1px dashed #30363d', borderRadius: '8px', marginTop: '20px' }}>
        <p style={{ color: '#8b949e', textAlign: 'center' }}>
          Future content: Detailed mission profiles, launch timelines, and discovery logs.
        </p>
      </div>
    </div>
  );
}

export default MissionsPage;