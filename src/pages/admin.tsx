import React, { useEffect, useState } from 'react';
import { useUser } from '../context/user';
import { http } from '../services/api';
import { log } from 'util';

const AdminPage = () => {
  const { isAdmin, isLoading } = useUser();

  return !isAdmin && !isLoading ? <div>no such page</div> : <div>admin page</div>;
};

export default AdminPage;
