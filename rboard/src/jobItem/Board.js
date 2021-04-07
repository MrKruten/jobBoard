import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';
import Job from "./Job";

function Board({ jobs, remove }) {
    return (
        <div className="jobBoard">
            <ul className="listJob">
                {jobs.map((job,id) => (
                    <Job job={job} key={id} remove={remove}></Job>
                ))}
            </ul>
        </div>
    );
}

/* Aside.propTypes = {
    types: PropTypes.arrayOf(PropTypes.object).isRequired,
}; */

export default Board;