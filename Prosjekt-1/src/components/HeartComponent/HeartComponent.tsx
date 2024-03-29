import { useEffect, useState } from 'react';
import './HeartComponent.css';

export function HeartComponent({
  name,
  setRefresh,
  refresh,
}: {
  name: string;
  setRefresh: (refresh: boolean) => void;
  refresh: boolean;
}) {
  const [favorite, setFavorite] = useState('notFav');
  //Gets the favorites array from localStorage.
  const favourites: string[] = JSON.parse(localStorage.getItem('favourites') || '[]');
  useEffect(() => {
    // Checks if the pokemon is favorited and sets the favorite state accordingly.
    if (favourites.includes(name)) {
      setFavorite('isFav');
    } else {
      setFavorite('notFav');
    }
  }, [favourites, name]);

  // Adds or removes the pokemon from the favorites array in localStorage.
  // Also toggles the refresh state which causes favoritePokemonsPage to rerender.
  const favoritePokemon = () => {
    const favourites: string[] = JSON.parse(localStorage.getItem('favourites') || '[]');
    if (favorite === 'notFav') {
      favourites.push(name);
      localStorage.setItem('favourites', JSON.stringify(favourites));
    } else if (favorite === 'isFav') {
      const index = favourites.indexOf(name);
      favourites.splice(index, 1);
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }

    toggleClassName();

    setRefresh(!refresh);
  };

  // Toggles the favorite state and subsequently the color of the heart.
  const toggleClassName = () => {
    favorite === 'notFav' ? setFavorite('isFav') : setFavorite('notFav');
    console.log('toggle');
  };

  const heart = (
    <svg className={favorite} onClick={favoritePokemon} viewBox="0 0 32 29.6" data-testid="heartTestID">
      <filter id="inset-shadow">
        {/* <!-- Shadow offset --> */}
        <feOffset dx="0" dy="0" />

        {/* <!-- Shadow blur --> */}
        <feGaussianBlur stdDeviation="1" result="offset-blur" />

        {/* <!-- Invert drop shadow to make an inset shadow --> */}
        <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />

        {/* <!-- Cut color inside shadow --> */}
        <feFlood floodColor="black" floodOpacity=".95" result="color" />
        <feComposite operator="in" in="color" in2="inverse" result="shadow" />

        {/* <!-- Placing shadow over element --> */}
        <feComposite operator="over" in="shadow" in2="SourceGraphic" />
      </filter>
      <path
        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,
    11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,
    21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
      />
    </svg>
  );

  return <>{heart}</>;
}
export default HeartComponent;
