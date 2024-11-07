import './App.css';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/Register';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
