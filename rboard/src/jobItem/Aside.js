import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';
import addIm from '../images/add.svg';
import deleteIm from '../images/delete.svg';

function Aside({ types, sort }) {
    return (
        <aside>
            <ul className="menu">
                <li>
                    <button className="addButton"><img src={addIm} alt="Add"></img></button>
                </li>
                <li>
                    <button className="sortAlphabet" onClick={sort.bind(null)}>Алфавит</button>
                </li>
                <li><select className="sortType">
                    <option defaultChecked={"selected"}>Сортировать по категориям</option>
                    {types.map((nameType,id) => (
                        <option key={id}>{nameType}</option>
                    ))}
                </select></li>
                <li>
                    <button className="basket" alt="Basket"><img src={deleteIm}></img></button>
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