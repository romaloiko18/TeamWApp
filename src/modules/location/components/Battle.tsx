import React, { FC } from 'react';
import { useUser } from '../../../context/user';

type Props = {
  attackedPokemon: any;
};

const Battle: FC<Props> = ({ attackedPokemon }) => {
  const { user } = useUser();

  const { image, attacks } = user?.pokemons[0];

  return (
    <div className="d-flex space-between w-100">
      <img src={user?.pokemons[0].image} alt="image" />

      <div className="d-flex gap-5 w-50 p-5 justify-content-center">
        {attacks.map(({ name, attempts }: any) => (
          <div>
            <h5>{name}</h5>
            <p>
              {attempts}/{attempts}
            </p>
          </div>
        ))}
      </div>

      <img src={attackedPokemon.image} alt="image" />
    </div>
  );
};

export default Battle;
