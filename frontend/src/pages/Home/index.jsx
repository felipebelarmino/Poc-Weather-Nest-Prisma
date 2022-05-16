import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../context/auth';

import { getDays } from '../../services/api';

function Home() {
  const { authenticated, logout } = useContext(AuthContext);
  const [day, setDay] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const days = await getDays();
      console.log(days);
    })();
  }, []);

  function handleLogout() {
    logout();
  }
  return (
    <>
      <h1>Home</h1>
      <p>{String(authenticated)}</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Home;
