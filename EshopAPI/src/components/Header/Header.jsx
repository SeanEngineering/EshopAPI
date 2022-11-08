import React from 'react'
import style from './Header.module.scss';

export default function Header({title, children}) {

 
  return (
    <div className={style.container}>
      <h1>{title}</h1>
      {children}
    </div>
  )
}