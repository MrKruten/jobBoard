import React, {useState} from 'react';
import css from '../../index.css';
import axios from 'axios';

function AddEditComponent({showModal, setShowModal, showAdd, add, edit, job }) {
    const [topic, setTopic] = useState(job.topic);
    const [description, setDescription] = useState(job.description);
    const [type, setType] = useState(job.category);

    function submitHandler(event) {
        event.preventDefault();
        if (topic.trim() && description.trim() && type.trim()) {
            let bodyFormData = new FormData();
            bodyFormData.append("topic", topic);
            bodyFormData.append("category", type);
            bodyFormData.append("description", description);
            if(showAdd) {
                axios.post("http://127.0.0.1:8000/create",bodyFormData)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
            else {
                let url = "http://127.0.0.1:8000/edit/"+job.id+"/";

                axios.post(url,bodyFormData)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
            showAdd ? add(topic, description, type, job.id) : edit(topic, description, type);
            setShowModal(false);
        }

    }

    return (
        <div className={showModal ? (css.addEditFormTrue)  : css.addEditForm} onClick={() => setShowModal(false)}>
            <div className={showModal ? (css.addEditFormModalTrue) : css.addEditFormModal} onClick={(e) => e.stopPropagation()}>
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

export default AddEditComponent;