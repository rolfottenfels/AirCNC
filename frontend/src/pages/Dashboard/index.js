import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const socket = socketio('http://localhost:3333');
  }, []);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });

      setSpots(response.data)
    }

    loadSpots(); 
  }, []);

  return (
    <>
      <h2>Seus Spots</h2>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}> 
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}` : 'Gratuito'}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo Spot</button>
      </Link>
    </>
  )
}