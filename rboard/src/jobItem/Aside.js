import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';
import addIm from '../images/add.svg';
import deleteIm from '../images/delete.svg';


function Aside({ types, sort, sortType, showBasket, showView, setShowModal, setShowAdd }) {
    return (
        <aside>
            <ul className="menu">
                <li>
                    <button className="addButton" onClick={() => {
                        setShowModal(true);
                        setShowAdd(true);
                    }}><img src={addIm} alt="Add"></img></button>
                </li>
                <li>
                    <button className="sortAlphabet" onClick={sort.bind(null, 'topic')}>Алфавит</button>
                </li>
                <li>
                    <button className="viewedButton" onClick={showView.bind(null)}>Просмотренные</button>
                </li>
                <li><select className="sortType" onChange={(e) => sortType(e.target.value) }>
                    <option defaultChecked={"selected"} value="noSort">Сортировать</option>
                    {types.map((nameType,id) => (
                        <option key={id} value={nameType}>{nameType}</option>
                    ))}
                </select></li>
                <li>
                    <button className="basket" onClick={showBasket.bind(null)}><img src={deleteIm} alt="Basket"></img></button>
                </li>
            </ul>
        </aside>
    );
}
//add, sort, sortType, types, basket
/* Aside.propTypes = {
    types: PropTypes.arrayOf(PropTypes.object).isRequired,
}; */

export default Aside;