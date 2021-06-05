import React from 'react';
import css from '../../index.css';
import JobComponent from "./job.component";

function BoardComponent({ jobs, remove, showRemoved, recover, viewed, showEditModal }) {
    return (
        <div className={css.jobBoard}>
            <ul>
                {jobs.map((job) => (
                    <JobComponent job={job} key={job.id}
                                  remove={remove}
                                  showRemoved={showRemoved}
                                  recover={recover}
                                  viewed={viewed}
                                  showEditModal={showEditModal}></JobComponent>
                ))}
            </ul>
        </div>
    );
}

export default BoardComponent;