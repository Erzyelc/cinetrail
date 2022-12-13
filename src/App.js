import './App.css';
import Header from './components/Header/Header';
import ThemeContextProvider from './contexts/ThemeContext';
import Homepage from './pages/Homepage/Homepage';

function App() {
  return (
    <div className="App">
    <ThemeContextProvider>
      <Header />
      <Homepage />
    </ThemeContextProvider>
    </div>
  );
}

export default App;
