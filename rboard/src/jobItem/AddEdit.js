import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../index.css';


function AddEdit({showModal, setShowModal, showAdd, add, edit, job }) {
    const [topic, setTopic] = useState(job.topic);
    const [description, setDescription] = useState(job.description);
    const [type, setType] = useState(job.type);

    function submitHandler(event) {
        event.preventDefault();
        if (topic.trim() && description.trim() && type.trim()) {
            showAdd ? add(topic, description, type, job.id) : edit(topic, description, type);
            setShowModal(false);
        }
    }

    return (
        <div className={showModal ? "addEditForm active" : "addEditForm"} onClick={() => setShowModal(false)}>
            <div className={showModal ? "modal active" : "modal"} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={submitHandler}>
                    <h3>{showAdd ? "Добавление объявления": "Редактирование объявления"}</h3>
                    <p><label htmlFor="topicInput">
                        Название:
                        <input
                               value={topic}
                               id="topicInput"
                               onChange={(event) => setTopic(event.target.value)}/>
                    </label></p>
                    <p><label htmlFor="typeInput">
                        Категория:
                        <input
                               value={type}
                               onChange={(event) => setType(event.target.value)}
                               id="typeInput"/>
                    </label></p>
                    <p className="labelDesc"><label htmlFor="descriptionInput">
                        Описание:
                    </label>
                    </p>
                    <textarea
                        className="descriptionArea"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        id="descriptionInput"/>
                    <p><input type="submit"/></p>
                </form>
            </div>
        </div>
    );
}
//add, sort, sortType, types, basket
/* Aside.propTypes = {
    types: PropTypes.arrayOf(PropTypes.object).isRequired,
}; */

export default AddEdit;