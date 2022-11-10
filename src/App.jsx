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
import Footer from './components/Footer/Footer';
import Welcome from './components/Welcome/Welcome';
import PageSpread from './components/Containers/PageSpread/PageSpread';

function App() {
  const [cart, setCart] = useState([]);
  const [y, setY] = useState();
  const randOrder = new Date().getTime();
  const [categ, setCateg] = useState();
  const [orderNumber,setOrderNumber] = useState(Math.floor(randOrder/1000000));
  const [quantityChange, setQuantityChange] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    (async () => {
      const thisCart = await getCart();
      setCart(thisCart);
    })();

  },[quantityChange,loaded]);

  useEffect(() => {
    const handleScroll = event => {
      const pos = window.scrollY;
      setY(pos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [y]);

  return (
    <cartContext.Provider value={[cart, setCart]}>
    <PageSpread>
    <PageContainer>
    <BrowserRouter>
    {/* <Welcome yPos={y}/> */}
      <Nav yPos={y} categ={categ} setCateg={setCateg}/>
      <div style={{height: "120px"}}></div>
      <Routes>
        <Route path='/EshopAPI/' element={<div>
          
        <Header yPos={y} ylimit={60} title={'Featured Products'}>
          <FeaturedProduct />
        </Header>
          <Header yPos={y} ylimit={150} title={'New Products'}>
            <Flexbox>
              <MainCardList/>
            </Flexbox>
          </Header>
          <br />
        </div>}/>
      <Route path='/EshopAPI/product/:id' element={<ProductPage qtyChange={quantityChange} setQtyChange={setQuantityChange}/>} />
      <Route path='/EshopAPI/cart' element={<Cart uuid={orderNumber} loaded={loaded} setLoaded={setLoaded}/>} />
      <Route path='/EshopAPI/search/:terms' element={<ProductSearch />}/>;
      <Route path='/EshopAPI/favourites' element={<Flexbox><Favourites /></Flexbox>}/>;
      <Route path='/EshopAPI/category/:category' element={<>
      <Flexbox>
        <Category setCateg={setCateg}/>
      </Flexbox></>}/>;
      </Routes>
      {/* <NewProduct /> */}
      {/* <Footer /> */}
    </BrowserRouter>
    </PageContainer>
    <Footer />
    </PageSpread>
    </cartContext.Provider>
  );
}

export default App;
