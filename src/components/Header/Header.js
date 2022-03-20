import React from 'react';
import classes from './Header.module.css';
import Nav from './Nav/Nav'



export default function Header() {
  return (
    <div className={classes.Header}>
        <div>Weather</div>
        <div>
            <Nav/>
        </div>
    </div>
  )
}
