import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { getMyFavoriteDays, getDays } from '../../services/api';
import './style.css';

function Home() {
  const { authenticated, logout, user } = useContext(AuthContext);
  const [days, setDays] = useState([]);
  const [weather, setWeather] = useState([]);
  const [cityDays, setCityDays] = useState([]);
  const [stateDays, setStateDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const daysFromRequest = await getMyFavoriteDays();

      setDays(daysFromRequest);
      setLoading(false);
    })();
  }, []);

  async function handleCityDays(city, state) {
    const filteredByCityDays = await getDays(city, state);
    return filteredByCityDays;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(cityDays, stateDays);
    const days = await handleCityDays(cityDays, stateDays);
    setWeather(days);
    console.log(days);
  };

  function handleLogout() {
    logout();
  }

  if (loading) {
    return <div className='loading'>Carregando informações...</div>;
  }

  return (
    <>
      <div className='header-home'>
        <h1 className='title'>Home</h1>
        <p>{user.name}</p>
        <div className='container-logout'>
          <button className='button-logout' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div>
        <div className='label-add'>
          {days.length === 0 ? 'Adicione um dia aos seus favoritos' : ''}
        </div>
        <div>
          <div className='container-home'>
            <div>
              <ul className='list-cards'>
                {weather.map((day, index) => (
                  <li key={index} className='card-item'>
                    <strong>{day.date}</strong>
                    <p>{day.weekday}</p>
                    <p>Máx {day.max}</p>
                    <p>Mín {day.min}</p>
                    <p>{day.description}</p>
                    <p>{day.city}</p>
                  </li>
                ))}
              </ul>
            </div>

            <form className='form' onSubmit={handleSubmit}>
              <div className='field'>
                <label className='label'>Cidade</label>
                <input
                  type='text'
                  name='city'
                  id='city'
                  placeholder='Cidade'
                  onChange={(e) => setCityDays(e.target.value)}
                />
              </div>

              <div className='field'>
                <label className='label'>Estado</label>
                <input
                  type='text'
                  name='state'
                  id='state'
                  placeholder='Estado'
                  onChange={(e) => setStateDays(e.target.value)}
                />
              </div>

              <div className='actions'>
                <button type='submit' className='button-log'>
                  Pesquisar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='favorites'>
          <div className='label-add'>
            Favoritos
          </div>
          <ul className='list-cards'>
            {days.map((day) => (
              <li key={day.id} className='card-item'>
                <strong>{day.date}</strong>
                <p>{day.weekday}</p>
                <p>Máx {day.max} - Min {day.min}</p>
                <p>{day.description}</p>
                <p>{day.city}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
