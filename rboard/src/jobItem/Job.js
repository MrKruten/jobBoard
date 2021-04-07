import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../index.css';

function Job({ job,remove }) {
    const [showDesc,setShowDesc] = useState(false);
    return (
        <li className="listJobItem">
            <div className="listJobItemButtons">
                <button className="topicButton" onClick={()=>setShowDesc(!showDesc)}>{job.topic}</button>
                <button className="editButton"></button>
                <button className="removeButton" onClick={remove.bind(null,job.id)}></button>
            </div>
            {showDesc&&(<div><hr></hr><p>{job.description}</p></div>)}
        </li>
    );
}

/* Aside.propTypes = {
    types: PropTypes.arrayOf(PropTypes.object).isRequired,
}; */

export default Job;