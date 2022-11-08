import React from 'react';
import style from './Flexbox.module.scss';

const Flexbox = ({children}) => {
    return (
        <div className={style.container}>
            {children}
        </div>
    );
};

export default Flexbox;