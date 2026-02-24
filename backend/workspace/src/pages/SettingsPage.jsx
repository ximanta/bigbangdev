import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="general-page"
    >
      <div
        className="general-page-header"
      >
        <button
          onClick={() => navigate(-1)}
          className="icon-button"
          aria-label="Go back"
        >
          <ArrowLeft
            size={24}
          />
        </button>
        <h1
          className="general-page-title"
        >
          Settings
        </h1>
      </div>

      <div
        className="general-page-content"
      >
        <p>
          Animation Quality:
          <select
            style={{
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '5px',
              backgroundColor: 'var(--secondary-color)',
              color: 'var(--text-color)',
              border: '1px solid var(--border-color)'
            }}
          >
            <option
              value="high"
            >
              High
            </option>
            <option
              value="medium"
            >
              Medium
            </option>
            <option
              value="low"
            >
              Low
            </option>
          </select>
        </p>
        <p>
          Audio:
          <label
            style={{
              marginLeft: '10px'
            }}
          >
            <input
              type="checkbox"
              defaultChecked
              style={{
                marginRight: '5px'
              }}
            />
            Enable Sound
          </label>
        </p>
        <p>
          Text Size:
          <input
            type="range"
            min="14"
            max="24"
            defaultValue="16"
            style={{
              marginLeft: '10px',
              width: '150px'
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
