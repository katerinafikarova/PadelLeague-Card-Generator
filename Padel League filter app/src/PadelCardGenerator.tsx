import React, { useRef, useState } from "react";
import "./PadelCardGenerator.css";

interface CardData {
  playerName: string;
  skillLevel: string;
  matchResult: string;
  imageUrl: string;
}

interface FilterStates {
  grain: boolean;
  grid: boolean;
  blur: number;
  tint: boolean;
}

const PadelCardGenerator: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const [imageUrl, setImageUrl] = useState<string>(
    "https://images.unsplash.com/photo-1626224484214-4051d04474f3?q=80&w=1000&auto=format&fit=crop",
  );

  const [cardData, setCardData] = useState<CardData>({
    playerName: "PLAYER NAME",
    skillLevel: "7 - ELITA",
    matchResult: "VICTORY",
    imageUrl: "",
  });

  const [filters, setFilters] = useState<FilterStates>({
    grain: false,
    grid: false,
    blur: 0,
    tint: false,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setImageUrl(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleFilter = (filterName: keyof Omit<FilterStates, "blur">) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleBlurChange = (value: number) => {
    setFilters((prev) => ({
      ...prev,
      blur: value,
    }));
  };

  const handleCardDataChange = (field: keyof CardData, value: string) => {
    setCardData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate combined filter string
  const getImageFilters = (): string => {
    let filterString = "brightness(0.7) contrast(1.2)";
    if (filters.blur > 0) {
      filterString += ` blur(${filters.blur}px)`;
    }
    return filterString;
  };

  return (
    <div className="padel-generator">
      {/* Controls Panel */}
      <div className="controls-panel">
        <h1 className="title">
          <span className="title-icon">🎾</span>
          PadelLeague Studio
        </h1>

        {/* Image Upload */}
        <div className="control-group">
          <label className="control-label">Upload Court Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
        </div>

        {/* Filter Toggles */}
        <div className="control-group">
          <label className="control-label">Filter Controls</label>
          <div className="toggle-grid">
            <button
              className={`toggle-btn ${filters.grain ? "active" : ""}`}
              onClick={() => toggleFilter("grain")}
            >
              Grain
            </button>
            <button
              className={`toggle-btn ${filters.grid ? "active" : ""}`}
              onClick={() => toggleFilter("grid")}
            >
              Grid
            </button>
            <button
              className={`toggle-btn ${filters.blur > 0 ? "active" : ""}`}
              onClick={() => handleBlurChange(filters.blur > 0 ? 0 : 5)}
            >
              Blur
            </button>
            <button
              className={`toggle-btn ${filters.tint ? "active" : ""}`}
              onClick={() => toggleFilter("tint")}
            >
              Tint
            </button>
          </div>
        </div>

        {/* Blur Slider */}
        <div className="control-group">
          <label className="control-label">
            Blur Intensity: {filters.blur}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={filters.blur}
            onChange={(e) => handleBlurChange(Number(e.target.value))}
            className="slider-input"
          />
        </div>

        {/* Player Data */}
        <div className="control-group">
          <label className="control-label">Player Name</label>
          <input
            type="text"
            value={cardData.playerName}
            onChange={(e) =>
              handleCardDataChange("playerName", e.target.value.toUpperCase())
            }
            placeholder="Enter player name"
            className="text-input"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Skill Level</label>
          <input
            type="text"
            value={cardData.skillLevel}
            onChange={(e) =>
              handleCardDataChange("skillLevel", e.target.value.toUpperCase())
            }
            placeholder="e.g., 7 - ELITA"
            className="text-input"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Match Result</label>
          <select
            value={cardData.matchResult}
            onChange={(e) =>
              handleCardDataChange("matchResult", e.target.value.toUpperCase())
            }
            className="text-input"
          >
            <option value="VICTORY">VICTORY</option>
            <option value="DEFEAT">DEFEAT</option>
            <option value="DRAW">DRAW</option>
          </select>
        </div>
      </div>

      {/* Preview Container */}
      <div className="preview-wrapper">
        <div className="preview-container" ref={cardContainerRef} id="capture">
          {/* Base Image with Filters */}
          <img
            src={imageUrl}
            alt="Court preview"
            className="base-image"
            style={{
              filter: getImageFilters(),
            }}
          />

          {/* Grain Overlay */}
          {filters.grain && (
            <div className="overlay overlay-grain">
              <svg
                className="noise-svg"
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <filter id="noise">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.9"
                    numOctaves="4"
                    result="noise"
                    seed="2"
                  />
                  <feColorMatrix in="noise" type="saturate" values="0" />
                </filter>
                <rect
                  width="100%"
                  height="100%"
                  fill="white"
                  filter="url(#noise)"
                  opacity="0.15"
                />
              </svg>
            </div>
          )}

          {/* Grid Overlay */}
          {filters.grid && (
            <div
              className="overlay overlay-grid"
              style={{
                backgroundImage: `
                  linear-gradient(0deg, #007BFF 1px, transparent 1px),
                  linear-gradient(90deg, #007BFF 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px",
              }}
            />
          )}

          {/* Tint Overlay */}
          {filters.tint && <div className="overlay overlay-tint" />}

          {/* PadelLeague Logo (Placeholder) */}
          <div className="logo-badge">
            <div className="logo-text">PadelLeague</div>
          </div>

          {/* Result Card */}
          <div className="result-card">
            <div className="card-inner">
              <div className="card-border-accent" />

              <p className="player-name">{cardData.playerName}</p>

              <div className="player-stats">
                <span className="stat-level">{cardData.skillLevel}</span>
                <span className="stat-separator">|</span>
                <span className="stat-result">{cardData.matchResult}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PadelCardGenerator;
