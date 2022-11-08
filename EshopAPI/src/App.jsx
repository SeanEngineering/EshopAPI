/** @format */

import Nav from './components/Nav/Nav';
import Flexbox from './components/Containers/Container/Flexbox';
import MainCardList from './components/mainCardList/MainCardList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewProduct from './components/NewProduct/NewProduct';
import FeaturedProduct from './components/FeaturedProduct/FeaturedProduct';
import Header from './components/Header/Header';
import ProductPage from './components/ProductPage/ProductPage';
import PageContainer from './components/Containers/PageContainer/PageContainer';
import Cart from './components/Cart/Cart';
import { useContext, useEffect, useState, useRef } from 'react';
import { cartContext, getCart } from './service/products';
import ProductSearch from './components/ProductSearch/ProductSearch';
import Stars from './components/Stars/Stars';
import Category from './components/Category/Category';
import Favourites from './components/Favourites/Favourites';

function App() {
  const [cart, setCart] = useState([]);
  const [y, setY] = useState();

  useEffect(() => {

    (async () => {
      const thisCart = await getCart();
      setCart(thisCart);
    })();

  },[]);

  useEffect(() => {
    const handleScroll = event => {
      const pos = window.scrollY;
      setY(pos);
      console.log(y);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [y]);

  return (
    <cartContext.Provider value={[cart, setCart]}>
    <PageContainer>
    <BrowserRouter>
      <Nav yPos={y}/>
      <div style={{height: "120px"}}></div>
      <Routes>
        <Route path='/' element={<div>
        <Header title={'Featured Products'}>
          <FeaturedProduct />
        </Header>
          <Header title={'New Products'}>
            <Flexbox>
              <MainCardList/>
            </Flexbox>
          </Header>
        </div>}/>
      <Route path='/product/:id' element={<ProductPage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/search/:terms' element={<ProductSearch />}/>;
      <Route path='/favourites' element={<Flexbox><Favourites /></Flexbox>}/>;
      <Route path='/category/:category' element={<>
      <Flexbox>
        <Category />
      </Flexbox></>}/>;
      </Routes>
      {/* <NewProduct /> */}
      
    </BrowserRouter>
    </PageContainer>
    </cartContext.Provider>
  );
}

export default App;
