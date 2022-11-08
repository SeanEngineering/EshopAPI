import React, { useState } from 'react';
import style from './Nav.module.scss';
import searchImg from '../../media/icons/search.svg';
import marketplace from '../../media/icons/marketplace.svg';
import cartImage from '../../media/icons/trolley.svg';
import profile from '../../media/icons/profile.svg';
import settings from '../../media/icons/settings.svg';
import contact from '../../media/icons/contact.svg';
import sale from '../../media/icons/sale.svg';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useContext} from 'react';
import { cartContext, getCart } from '../../service/products';
import styled, { keyframes } from 'styled-components';

export default function Nav({yPos}) {

  const [cart, setCart] = useContext(cartContext);
  const [quant, setQuant] = useState(0);
  const [price, setPrice] = useState(0);
  const [load, setLoad] = useState(false);
  const [navPos, setNavPos] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    ( async () => {
      const cart2 = await cart;
      const newCart = await cart2.reduce((a,b) =>
        a + parseInt(b.quantity), 0
      );
      const priceTotal = await cart2.reduce((a,b) =>
      a + parseInt(b.quantity * b.price), 0
    );
     setQuant(newCart);
     setPrice(priceTotal);
      
    })();
   

  }, [cart, price])

  useEffect(() => {

    if (yPos > 60){
      setNavPos(true);
    } else {
      setNavPos(false);
    }

  }, [yPos]);

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
        setLoad(true);
      let value = e.target.value;
      if (value == ''){
        navigate('/');
      } else{
        navigate(`/Eshop/search/${value.split(' ').join('+')}`);
      }
      e.target.value = "";
      setLoad(false)

    }
  };

  const changeNavigate = (e) => {
    e.preventDefault();
    if  (e.target.innerText == "Favourites") {
      navigate('/EshopAPI/favourites');
    } else {
      navigate(`/EshopAPI/category/${e.target.innerText}`);
    }
   
  }




  return (
    <>
   
    <Bubble className={[style.menu, !navPos && style.menu__vis].join(' ')} onClick={()=>setNavPos(false)}>...</Bubble>
  
    <div className={[style.nav, navPos && style.nav__float].join(' ')}>
        <form className={style.nav__row}>
            <NavLink to="/EshopAPI/"><h2 className={style.nav__row__logo}>mrchnt//</h2></NavLink>
            <div className={style.nav__row__search}><input type="text" placeholder='Search...' onKeyDown={handleKeyDown}/><img src={searchImg} alt="" /></div>
            <div className={style.nav__row__icons}>
              <NavLink to="/EshopAPI/cart" className={style.nav__row__icons__link}><div>Total ${price}</div><img src={cartImage} alt="" />{quant}</NavLink>
              <NavLink to ="/EshopAPI/"><img src={marketplace} alt="" /></NavLink>
              <a href="https://seanengineering.github.io/portfolio_showcase/index.html" target="_blank"><img src={contact} alt="" /></a>
              <img src={settings} alt="" />
              <img src={profile} alt="" />
            </div>
            
        </form>
        <div className={style.nav__row}>
            <ul>
                <li onClick={(e) => changeNavigate(e)}>Lounge</li>
                <li  onClick={(e) => changeNavigate(e)}>Living</li>
                <li  onClick={(e) => changeNavigate(e)}>Decor</li>
                <li  onClick={(e) => changeNavigate(e)}>Kitchen</li>
                <li  onClick={(e) => changeNavigate(e)}>Office</li>
                <li  onClick={(e) => changeNavigate(e)}>Misc</li>
                <li  onClick={(e) => changeNavigate(e)}>Vehicles</li>
                <li  onClick={(e) => changeNavigate(e)}>Dining</li>
                <li  onClick={(e) => changeNavigate(e)}>Favourites</li>
            </ul>
        </div>
      
    </div>
    </>
  )
}

const textfade = keyframes`
  0% {
    transform: translateY(2px);
    transition: transform 0.6s cubic-bezier(0.83, 0, 0.17, 1)
  };

  50% {
    transform: translateY(0px);
    transition: transform 0.6s cubic-bezier(0.83, 0, 0.17, 1)
  };
  
  100% {
    transform: translateY(2px);
    transition: transform 0.6s cubic-bezier(0.83, 0, 0.17, 1)
  };
`;

const Bubble = styled.div`
animation-name: ${textfade};
animation-duration: 1s;
animation-timing-function: ease-in-out;
`;