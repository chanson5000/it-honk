import { useState } from 'react';
import './App.css';

export const HONKS = [
  { file: 'ahooga.wav', label: 'Ahooga' },
  { file: 'air_horn.mp3', label: 'Air Horn' },
  { file: 'bike_bell.wav', label: 'Bike Bell' },
  { file: 'clown.mp3', label: 'Clown' },
  { file: 'fog_horn.mp3', label: 'Fog Horn' },
  { file: 'goose.mp3', label: 'Goose' },
  { file: 'keiths_car.wav', label: "Keith's Car" },
  { file: 'new_car_horn.wav', label: 'New Car Horn' },
  { file: 'old_bike_horn.wav', label: 'Old Bike Horn' },
  { file: 'old_car_horn.wav', label: 'Old Car Horn' },
  { file: 'short_new.wav', label: 'Beep' },
  { file: 'too_many_bike_horns.wav', label: 'Ragbrai' },
  { file: 'vuvuzela.wav', label: 'Vuvuzela' },
];

const honkUrl = (file) => `${import.meta.env.BASE_URL}honks/${file}`;

function App() {
  const [honkType, setHonkType] = useState(HONKS[0].file);

  const honkIt = () => {
    // A new Audio element per click lets honks overlap when mashed.
    new Audio(honkUrl(honkType)).play().catch(() => {});
  };

  return (
    <main className="App">
      <button type="button" className="honk-button" onClick={honkIt}>
        Honk
      </button>
      <label className="honk-picker">
        <span className="visually-hidden">Honk sound</span>
        <select value={honkType} onChange={(e) => setHonkType(e.target.value)}>
          {HONKS.map(({ file, label }) => (
            <option key={file} value={file}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </main>
  );
}

export default App;
