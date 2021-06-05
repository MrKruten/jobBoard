import React from 'react';
import css from '../../index.css';
import addIm from '../images/add.svg';
import deleteIm from '../images/delete.svg';


function AsideComponent({ types, sort, sortType, showBasket, showView, setShowModal, setShowAdd }) {
    return (
        <aside>
            <ul>
                <li>
                    <button className={css.addButton} onClick={() => {
                        setShowModal(true);
                        setShowAdd(true);
                    }}><img src={addIm} alt="Add"></img></button>
                </li>
                <li>
                    <button onClick={sort.bind(null, 'topic')}>Алфавит</button>
                </li>
                <li>
                    <button onClick={showView.bind(null)}>Просмотренные</button>
                </li>
                <li><select  onChange={(e) => sortType(e.target.value) }>
                    <option defaultChecked={"selected"} value="noSort">Сортировать</option>
                    {types.map((nameType,id) => (
                        <option key={id} value={nameType}>{nameType}</option>
                    ))}
                </select></li>
                <li>
                    <button className={css.basket} onClick={showBasket.bind(null)}><img src={deleteIm} alt="Basket"></img></button>
                </li>
            </ul>
        </aside>
    );
}

export default AsideComponent;