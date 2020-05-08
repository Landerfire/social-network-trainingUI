import React from 'react';
import style from './Paginator.module.scss';

let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize); // округляем значение в большую сторону
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div className={style.pages}>
                {pages.map(p => {
                    return <span
                        className={currentPage === p ? style.selectedPage : ""}  // то же что{props.currentPage === p && style.selectedPage}
                        onClick={(event) => {
                            onPageChanged(p)
                        }}>{p}</span>
                })}
            </div>
        </div>
    )
}

export default Paginator;