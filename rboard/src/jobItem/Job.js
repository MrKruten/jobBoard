import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../index.css';

function Job({ job,remove, showRemoved, recover, viewed, showEditModal }) {
    const [showDesc,setShowDesc] = useState(false);
    return (
        <li className="listJobItem">
            <div className="listJobItemButtons">
                <button className="topicButton" onClick={()=>{
                    viewed(job);
                    setShowDesc(!showDesc);}}>
                    {job.topic}</button>
                <p className="type">{job.type}</p>
                {!showRemoved && <button className="editButton" onClick={showEditModal.bind(null, job)}></button>}
                {showRemoved && <button className="restoreButton" onClick={recover.bind(null,job)}></button>}
                <button className="removeButton" onClick={remove.bind(null,job)}></button>
            </div>
            {showDesc && (<div><hr></hr><p className="description">{job.description}</p></div>)}
        </li>
    );
}

/* Aside.propTypes = {
    types: PropTypes.arrayOf(PropTypes.object).isRequired,
}; */

export default Job;