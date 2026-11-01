import { useRef, useState } from 'react';
import './App.css';

export const HONKS = [
  { file: 'ahooga.mp3', label: 'Ahooga', emoji: '🤪' },
  { file: 'air_horn.mp3', label: 'Air Horn', emoji: '📢' },
  { file: 'bike_bell.mp3', label: 'Bike Bell', emoji: '🔔' },
  { file: 'clown.mp3', label: 'Clown', emoji: '🤡' },
  { file: 'fog_horn.mp3', label: 'Fog Horn', emoji: '🚢' },
  { file: 'goose.mp3', label: 'Goose', emoji: '🪿' },
  { file: 'keiths_car.mp3', label: "Keith's Car", emoji: '🚙' },
  { file: 'new_car_horn.mp3', label: 'New Car Horn', emoji: '🚗' },
  { file: 'old_bike_horn.mp3', label: 'Old Bike Horn', emoji: '🚲' },
  { file: 'old_car_horn.mp3', label: 'Old Car Horn', emoji: '🚘' },
  { file: 'short_new.mp3', label: 'Beep', emoji: '🔊' },
  { file: 'too_many_bike_horns.mp3', label: 'Ragbrai', emoji: '🚴' },
  { file: 'vuvuzela.mp3', label: 'Vuvuzela', emoji: '📯' },
];

const honkUrl = (file) => `${import.meta.env.BASE_URL}honks/${file}`;

function App() {
  const [honkType, setHonkType] = useState(HONKS[0].file);
  const [bursts, setBursts] = useState([]);
  const nextBurstId = useRef(0);
  const currentAudio = useRef(null);

  // Only one honk at a time: a new honk (or preview) cuts off the previous one.
  const play = (file) => {
    currentAudio.current?.pause();
    const audio = new Audio(honkUrl(file));
    currentAudio.current = audio;
    audio.play().catch(() => {});
  };

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
