import React from 'react';
import preloader from '../../../assets/images/preloader.gif';
import style from './Preloader.module.scss'

let Preloader = (props) => {
    return (
        <div>
            <img src={preloader} className={style.preloader} alt="Загрузка..." />
        </div>
    )
}

export default Preloader;