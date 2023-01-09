import './App.css';
import Header from './components/Header/Header';
import ThemeContextProvider from './contexts/ThemeContext';
import UserContextProvider from './contexts/UserContext';
import Homepage from './pages/Homepage/Homepage';
import Footer from './components/Footer/Footer';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Signup from './components/Users/Signup';
import Signin from './components/Users/Signin';
import MyFavorites from './pages/MyFavorites/MyFavorites';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <UserContextProvider>
      <ThemeContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/myfavorites" element={<MyFavorites />} />
          <Route path="/moviedetails/:movieId" element={<MovieDetails />} />
        </Routes>
        <Footer />
      </ThemeContextProvider>
      </UserContextProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
