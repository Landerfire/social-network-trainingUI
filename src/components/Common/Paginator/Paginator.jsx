import React, {useState} from 'react';
import style from './Paginator.module.scss';
import cn from 'classnames';

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize); // округляем значение в большую сторону

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    // let portionSize = useState(10);

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={style.paginator}>
            <div className={style.paginatorWrapper}>
                <div className={style.btnBlock}>
                    {portionNumber > 1 &&
                    <button className={style.btn} onClick={() => {
                        setPortionNumber(portionNumber - 1)
                    }}>PREV</button>}
                </div>

                <div className={style.pages}>
                    {pages
                        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                        .map((p) => {
                            return <span
                                className={cn({
                                    [style.selectedPage]: currentPage === p
                                }, style.pageNumber)}// было: className={currentPage === p ? style.selectedPage : null}
                                onClick={(event) => {
                                    onPageChanged(p)
                                }}>{p}</span>
                        })}
                </div>

                <div className={style.btnBlock}>
                    {portionCount > portionNumber &&
                    <button className={style.btn} onClick={() => {
                        setPortionNumber(portionNumber + 1)
                    }}>NEXT</button>}
                </div>

            </div>
        </div>
    )
}

export default Paginator;