import React from 'react'
import style from './Header.module.scss';
import { useEffect, useState } from 'react';

export default function Header({title, yPos, ylimit, children}) {
  const [navPos, setNavPos] = useState(false);

  useEffect(() => {

    if (yPos <= ylimit){
      setNavPos(false);
    } else {
      setNavPos(true);
    }

  }, [yPos]);

 
  return (
    <div className={style.container}>
      <h1 className={[style.container__title, navPos && style.container__title__position].join(' ')}>{title}</h1>
      {children}
    </div>
  )
}