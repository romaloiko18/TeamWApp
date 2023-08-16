import React from 'react';
import Location from '../modules/location';

const WorldLocation = () => {
  return (
    <div>
      <Location locationsGoTo={[{ name: 'main square', href: '/world' }]} />
    </div>
  );
};

export default WorldLocation;
