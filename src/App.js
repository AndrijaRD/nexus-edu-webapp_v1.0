import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Home } from './Components/Home/Home';
import { Predmet } from './Components/Predmet/Predmet';
import { Lekcija } from './Components/Lekcija/Lekcija';
import Login from './Components/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/predmet/:predmetVar' element={<Predmet />} />
        <Route path='/predmet/:predmetVar/lekcija/:lekcijaVar' element={<Lekcija />} />
        <Route path='/test' element={<div><h1>Test</h1></div>} />
        <Route path='/login' element={<Login />} />
        <Route path='/settings' element={<div><h1>Settings</h1></div>} />
        <Route path='/admin' element={<div><h1>Admin</h1></div>} />
        <Route path='*' element={<div><h1>404</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
