import React from 'react';
import style from './PageSpread.module.scss';

const PageSpread = ({children}) => {
    return (
        <div className={style.container}>
            {children}
        </div>
    );
};

export default PageSpread;