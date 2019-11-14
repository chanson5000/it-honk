import React from 'react';
import './App.css';

function App() {
  const [ honkType, setHonkType ] = React.useState('ahooga.wav');
  const honkIt = () => {
    new Audio(`./honks/${honkType}`).play();
  };

  const setHonk = (event) => {
    setHonkType(event.target.value);
  };

  return (
      <div className="App" style={{ flex: 1, flexDirection: 'column' }}>
        <div style={{ paddingTop: 100 }}>
          <button style={buttonStyle} onClick={honkIt}>Honk</button>
        </div>
        <div style={{ paddingTop: 20 }}>
          <select onChange={setHonk} value={honkType}>
            <optgroup className='options'>
              <option value='ahooga.wav'>Ahooga</option>
              <option value='air_horn.mp3'>Air Horn</option>
              <option value='bike_bell.wav'>Bike Bell</option>
              <option value='clown.mp3'>Clown</option>
              <option value='fog_horn.mp3'>Fog Horn</option>
              <option value='goose.mp3'>Goose</option>
              <option value='keiths_car.wav'>Keith's Car</option>
              <option value='new_car_horn.wav'>New Car Horn</option>
              <option value='old_bike_horn.wav'>Old Bike Horn</option>
              <option value='old_car_horn.wav'>Old Car Horn</option>
              <option value='short_new.wav'>Beep</option>
              <option value='too_many_bike_horns.wav'>Ragbrai</option>
              <option value='vuvuzela.wav'>Vuvuzela</option>
            </optgroup>
          </select>
        </div>
      </div>
  );
}

export default App;


const buttonStyle = {
  backgroundColor: '#FF0000',
  alignSelf: 'center',
  justifySelf: 'center',
  fontSize: 100,
  borderRadius: 300,
  borderWidth: 4,
  borderStyle: 'solid',
  borderColor: '#000000',
  paddingTop: 60,
  paddingBottom: 60
};
