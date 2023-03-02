import React from 'react';
import Body from './components/Body';
import "./css/App.css";



function App(props) {

  const height = 1080; //TO DO -- CHANGE THIS TO SCREEN SIZE BUT MANTAINING 16:9 ASPECT RATIO
  const width = 1920;
    
  return (
    <div className="bg">
      <Body width={width} height={height} games={props.games}></Body>
    </div>

  );
  

  

}

export default App;
