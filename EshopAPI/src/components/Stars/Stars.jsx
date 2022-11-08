import React from 'react';
import style from './Stars.module.scss';

const Stars = () => {
    return (
        <div className={style.stars} style={'--rating: 2.9;'} />
    );
};

export default Stars;