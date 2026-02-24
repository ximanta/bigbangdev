import React from 'react';
import { Link } from 'react-router-dom';

function PetCard({ pet }) {
  return (
    <div className="card pet-card">
      <img src={pet.photo} alt={pet.name} className="pet-card-avatar" />
      <div className="pet-card-info">
        <h3>{pet.name}</h3>
        <p>{pet.breed} - {pet.age} years old</p>
        <Link to={`/mypets/${pet.id}`} className="button button-primary">
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default PetCard;
