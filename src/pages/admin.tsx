import React, { useEffect, useState } from 'react';
import { useUser } from '../context/user';
import { http } from '../services/api';
import { log } from 'util';

const AdminPage = () => {
  const { isAdmin, isLoading } = useUser();

  const [pokemons, setPokemons] = useState<any>([]);

  useEffect(() => {
    http.get('/pokemon').then((res: any) => setPokemons(res.data.pokemons));
  }, []);

  return !isAdmin && !isLoading ? <div>no such page</div> : <div>{!!pokemons.length && <img src={pokemons[0].image} alt="" />}</div>;
};

export default AdminPage;
