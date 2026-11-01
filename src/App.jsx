import { useRef, useState } from 'react';
import './App.css';

export const HONKS = [
  { file: 'ahooga.wav', label: 'Ahooga', emoji: '🤪' },
  { file: 'air_horn.mp3', label: 'Air Horn', emoji: '📢' },
  { file: 'bike_bell.wav', label: 'Bike Bell', emoji: '🔔' },
  { file: 'clown.mp3', label: 'Clown', emoji: '🤡' },
  { file: 'fog_horn.mp3', label: 'Fog Horn', emoji: '🚢' },
  { file: 'goose.mp3', label: 'Goose', emoji: '🪿' },
  { file: 'keiths_car.wav', label: "Keith's Car", emoji: '🚙' },
  { file: 'new_car_horn.wav', label: 'New Car Horn', emoji: '🚗' },
  { file: 'old_bike_horn.wav', label: 'Old Bike Horn', emoji: '🚲' },
  { file: 'old_car_horn.wav', label: 'Old Car Horn', emoji: '🚘' },
  { file: 'short_new.wav', label: 'Beep', emoji: '🔊' },
  { file: 'too_many_bike_horns.wav', label: 'Ragbrai', emoji: '🚴' },
  { file: 'vuvuzela.wav', label: 'Vuvuzela', emoji: '📯' },
];

const honkUrl = (file) => `${import.meta.env.BASE_URL}honks/${file}`;

const play = (file) => {
  // A new Audio element per play lets honks overlap when mashed.
  new Audio(honkUrl(file)).play().catch(() => {});
};

function App() {
  const [honkType, setHonkType] = useState(HONKS[0].file);
  const [bursts, setBursts] = useState([]);
  const nextBurstId = useRef(0);

  const honkIt = () => {
    play(honkType);
    const id = nextBurstId.current++;
    // Random drift and tilt so rapid honks don't stack on top of each other.
    const burst = { id, x: Math.random() * 60 - 30, tilt: Math.random() * 30 - 15 };
    setBursts((current) => [...current.slice(-5), burst]);
  };

  const removeBurst = (id) => {
    setBursts((current) => current.filter((burst) => burst.id !== id));
  };

  const pickHonk = (file) => {
    setHonkType(file);
    play(file);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">It Honk</h1>
        <p className="tagline">Swingin&rsquo; honks.</p>
      </header>

      <main className="main">
        <div className="honk-stage">
          <div className="honk-bezel">
            <button type="button" className="honk-button" onClick={honkIt}>
              Honk
            </button>
          </div>
          <div className="bursts" aria-hidden="true">
            {bursts.map(({ id, x, tilt }) => (
              <span
                key={id}
                className="burst"
                style={{ '--x': `${x}px`, '--tilt': `${tilt}deg` }}
                onAnimationEnd={() => removeBurst(id)}
              >
                HONK!
              </span>
            ))}
          </div>
        </div>

        <fieldset className="sounds">
          <legend className="sounds-legend">Pick your honk</legend>
          <div className="chips">
            {HONKS.map(({ file, label, emoji }) => (
              <label key={file} className="chip">
                <input
                  type="radio"
                  name="honk"
                  value={file}
                  checked={honkType === file}
                  onChange={() => pickHonk(file)}
                />
                <span className="chip-face">
                  <span className="chip-emoji" aria-hidden="true">
                    {emoji}
                  </span>
                  {label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </main>
    </div>
  );
}

export default App;
