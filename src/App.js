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
        <Route path='/' element={<NewNotice/>}/>
        <Route path='/avis/:id' element={<NoticeView/>}/>
        {/* <Route path='/nouvel-avis/:id' element={<NewNotice/>}/> */}
        {/* <Route path='/' element={<Home/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
