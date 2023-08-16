import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { GameLocation } from '../../../types/gameLocation';
import { http } from '../../../services/api';
import Battle from './Battle';

type Props = {
  locationsGoTo: GameLocation[];
};

const Location: FC<Props> = ({ locationsGoTo }) => {
  const [isBattleAllowed, setIsBattleAllowed] = useState(false);
  const [attackedPokemon, setAttackedPokemon] = useState<any>(null);

  const handleAllowBattle = async () => {
    if (isBattleAllowed) {
      const res = await http.post<{ data: any }>('/battle/start', {});

      const { pokemon, delay } = res.data.data as any;

      if (!!pokemon && !!delay) {
        setTimeout(() => {
          setAttackedPokemon(pokemon);
        }, delay);
      }
    }

    setIsBattleAllowed((prevState) => !prevState);
  };

  return (
    <div>
      {!!attackedPokemon ? (
        <Battle attackedPokemon={attackedPokemon} />
      ) : (
        <>
          <div>
            {locationsGoTo.map(({ href, name }) => (
              <Link to={href}>{name}</Link>
            ))}
          </div>

          <button onClick={handleAllowBattle}>allow fight</button>
        </>
      )}
    </div>
  );
};

export default Location;
