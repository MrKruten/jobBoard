import React, {useState} from 'react';
import css from '../../index.css';

function JobComponent({ job,remove, showRemoved, recover, viewed, showEditModal }) {
    const [showDesc,setShowDesc] = useState(false);
    return (
        <li className={css.listJobItem}>
            <div className={css.listJobItemButtons}>
                <button className={css.topicButton} onClick={()=>{
                    viewed(job);
                    setShowDesc(!showDesc);}}>
                    {job.topic}</button>
                <p className={css.type}>{job.category}</p>
                {!showRemoved && <button className={css.editButton} onClick={showEditModal.bind(null, job)}></button>}
                {showRemoved && <button className={css.restoreButton} onClick={recover.bind(null,job)}></button>}
                <button className={css.removeButton} onClick={remove.bind(null,job)}></button>
            </div>
            {showDesc && (<div><hr></hr><p className={css.description}>{job.description}</p></div>)}
        </li>
    );
}

export default JobComponent;