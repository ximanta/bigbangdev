import { Link } from 'react-router-dom';

function Card({ body }) {
  const { id, name, type, description, thumbnail } = body;

  // Determine the base path for the detail link
  const detailPath = `/${type.toLowerCase().replace('_', '-')}/${id}`;

  return (
    <Link to={detailPath} className="card">
      <div className="card-image-container">
        <img
          src={thumbnail || '/images/placeholder.jpg'}
          alt={name}
          className="card-image"
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
      </div>
    </Link>
  );
}

export default Card;
