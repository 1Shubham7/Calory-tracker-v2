import './App.css';
import Footer from './components/footer/Footer.jsx'
import QuoteOne from './components/quoteOne/QuoteOne.jsx'
import Me from './components/me/Me.jsx'
import QuoteTwo from './components/quoteTwo/QuoteTwo.jsx'
import Entries from './components/foodEntry/FoodEntries.jsx'
import Navbar from './components/navbar/Navbar.jsx'

function App() {
  return (
    <>
    <Navbar />
    <QuoteOne />
    <Me />
    <QuoteTwo />
    <Entries />
    <Footer />
    </>
  );
}

export default App;
