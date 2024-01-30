import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewNotice from './pages/NewNotice';
import NoticeView from './pages/NoticeView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/nouvel-avis' element={<NewNotice/>}/>
        <Route path='/avis/:id' element={<NoticeView/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
