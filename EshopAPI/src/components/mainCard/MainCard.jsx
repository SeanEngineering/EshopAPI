import React from 'react';
import style from './MainCard.module.scss';

const MainCard = ({name, price, description, category, image, manufacturer, favourite}) => {
    return (
        <div className={style.card}>
            <img src={image} alt="" />
            <h5>{name}</h5>
            <div>${price} AUD</div>
            <br />
            <div>{category}</div>
            <br />
            <div className={style.card__desc}>{description}</div>
        </div>
    );
};

export default MainCard;