/** @format */

import Nav from './components/Nav/Nav';
import Flexbox from './components/Containers/Container/Flexbox';
import MainCardList from './components/mainCardList/MainCardList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewProduct from './components/NewProduct/NewProduct';
import FeaturedProduct from './components/FeaturedProduct/FeaturedProduct';
import Header from './components/Header/Header';

function App() {


  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<>
          <FeaturedProduct />;
            <Header title={'We think you will like these'}>
              <Flexbox>
              <MainCardList/>
              </Flexbox>
            </Header>
        </>}/>
      <Route path='/:id' element={<></>} />
      </Routes>
      {/* <NewProduct /> */}
      
    </BrowserRouter>
  );
}

export default App;
