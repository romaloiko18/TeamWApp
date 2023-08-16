import React from 'react';
import Location from '../modules/location';

const WorldLocation = () => {
  return (
    <div>
      <Location locationsGoTo={[{ name: 'training zone', href: '/world/training-zone' }]} />
    </div>
  );
};

export default WorldLocation;
