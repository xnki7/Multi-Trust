import './App.css';
import Homepage from './Pages/Homepage';
import Navbar from './components/Navbar';
import Wallet from './Pages/Wallet';

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <Homepage/> */}
      <Wallet/>
    </div>
  );
}

export default App;
