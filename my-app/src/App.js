import logo from './logo.svg';
import CardInicial from "./componentes/CardInicial"
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className='box'>
        <h2>Recommended for you</h2>
        <div className='boxcard'>
          <CardInicial />
          <CardInicial />
          <CardInicial />
        </div>
      </div>
      
      <div className='box'>
        <h2>Recently added</h2>
        <div className='boxcard'>
          <CardInicial />
          <CardInicial />
          <CardInicial />
        </div>
      </div>


    </div>
  );
}

export default App;
