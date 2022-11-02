import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.scss';
import searchImg from '../../media/icons/search.svg';
import marketplace from '../../media/icons/marketplace.svg';
import cart from '../../media/icons/trolley.svg';
import profile from '../../media/icons/profile.svg';
import settings from '../../media/icons/settings.svg';
import contact from '../../media/icons/contact.svg';
import sale from '../../media/icons/sale.svg';

export default function Nav() {
  return (
    <div className={style.nav}>
        <div className={style.nav__row}>
            <h2 className={style.nav__row__logo}>mrchnt//</h2>
            <div className={style.nav__row__search}><input type="text" placeholder='Search for anything'/><img src={searchImg} alt="" /></div>
            <div className={style.nav__row__icons}>
              <img src="../../media/icons/marketplace.svg" alt="" />
              <img src={marketplace} alt="" />
              <img src={sale} alt="" />
              <img src={cart} alt="" />
              <img src={contact} alt="" />
              <img src={settings} alt="" />
              <img src={profile} alt="" />
            </div>
            
        </div>
        <div className={style.nav__row}>
            <ul>
                <li>clothing</li>
                <li>vehicles</li>
                <li>vintage</li>
                <li>sports</li>
                <li>tech</li>
                <li>home decor</li>
                <li>furniture</li>
                <li>sale</li>
            </ul>
        </div>
      
    </div>
  )
}
