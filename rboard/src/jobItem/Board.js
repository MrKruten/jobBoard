import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';
import Job from "./Job";

function Board({ jobs, remove, showRemoved, recover, viewed, showEditModal }) {
    return (
        <div className="jobBoard">
            <ul className="listJob">
                {jobs.map((job,id) => (
                    <Job job={job} key={id}
                         remove={remove}
                         showRemoved={showRemoved}
                         recover={recover}
                         viewed={viewed}
                         showEditModal={showEditModal}></Job>
                ))}
            </ul>
        </div>
    );
}

/* Aside.propTypes = {
    types: PropTypes.arrayOf(PropTypes.object).isRequired,
}; */

export default Board;