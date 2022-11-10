import React from 'react';
import style from './MainCard.module.scss';
import { NavLink } from 'react-router-dom';
import fav from '../../media/images/favo.svg';
import nfav from '../../media/images/nfav.svg';
import styled, { keyframes } from 'styled-components';

const MainCard = ({id, name, price, description, category, image, manufacturer, favourite, quantity}) => {

    let isFavourite = nfav;
    if (favourite) {
        isFavourite = fav;
    }

    return (
        <NavLink to={`/EshopAPI/product/${id}`}>
        <div className={style.card}>
            <div className={style.card__image} >
                <img src={image} alt="" />
            </div>
            
            <h5>{name}</h5>
            
            <div className={style.card__price}><span>${price} AUD </span>{quantity <= 0 && <div>Out of Stock</div>}<img src={isFavourite} alt="" /></div>
        </div>
        </NavLink>
    );
};

export default MainCard;
