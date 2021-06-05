import React, { useState, useEffect } from "react";
import './app.component.css';
import AsideComponent from "./jobItem/aside.component";
import BoardComponent from "./jobItem/board.component";
import css from '../index.css'
import AddEditComponent from "./jobItem/addEdit.component";
import axios from "axios";


export default function App() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/job")
            .then(response => response.json())
            .then(data => {
                setJobs(data);
                setTypes(createType(data));
                let max = -1;
                for(let str of data){
                    if(str.id > max){
                        max = str.id;
                    }
                }
                setMaxId(max);
            });
    },[]);

    const example = {topic:'',
        category:'',
        description:'',
        id:-1}
    const [jobsRemove, setJobsRemove] = useState([]);
    const [showRemoved, setShowRemoved] = useState(false);
    const [types,setTypes] = useState([]);
    const [showSorted, setShowSorted] = useState(false);
    const [sortedJobs, setSortedJobs] = useState();
    const [showViewed, setShowViewed] = useState(false);
    const [viewedJobs, setViewedJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [editJob, setEditJob] = useState(example);
    const [maxId, setMaxId] = useState(-1);

    function createType(jobs){
        let result = [];
        for (let str of jobs) {
            if (!result.includes(str.category)) {
                result.push(str.category);
            }
        }
        return result;
    }

    function sort(field){
        setShowRemoved(false);
        const sorted = [].slice.call(jobs).sort((a, b) => {
            if (a[field] === b[field]) { return 0; }
            return a[field] > b[field] ? 1 : -1;});
        setSortedJobs(sorted);
        setShowSorted(!showSorted);
    }

    function sortType(nameType){
        setShowRemoved(false);
        if(nameType !== "noSort") {
            const sorted = [].slice.call(jobs).filter((job) => job.category === nameType);
            setSortedJobs(sorted);
            setShowSorted(true);
        }
        else setShowSorted(false)
    }

    function removeJob(rJob) {
        if(showRemoved){
            let url = "http://127.0.0.1:8000/delete/"+rJob.id+"/";
            axios.post(url)
                .then(response => {
                    console.log(response)
                })
                .catch(e => {
                    console.log(e)
                })
            setJobsRemove(jobsRemove.filter((job) => job !== rJob));
            return;
        }
        let rId = jobs.indexOf(rJob);

        setJobsRemove(
            jobsRemove.concat(jobs[rId])
        );
        let count = 0;
        for(let str of jobs){
            if(str.category === jobs[rId].category){
                count++;
            }
        }
        if(count < 2)
            setTypes(types.filter((e) => e!==jobs[rId].category));
        setJobs(jobs.filter((job) => job !== rJob));
        if(showSorted)
            setSortedJobs(sortedJobs.filter((job) => job !== rJob));
        setViewedJobs(viewedJobs.filter((job) => job !==rJob));
    }

    function showBasket() {
        setShowRemoved(!showRemoved);
        setShowViewed(false);
        setShowSorted(false);
    }

    function recover(job){
        setJobs(
            jobs.concat(job)
        );
        setJobsRemove(
            jobsRemove.filter((e) => e !== job)
        );
        if (!types.includes(job.type)) {
            setTypes(
                types.concat(job.type)
            );
        }
    }

    function viewed(job){
        if(!viewedJobs.includes(job)){
            setViewedJobs(viewedJobs.concat(job));
        }
    }

    function showView(){
        setShowRemoved(false);
        setShowSorted(false);
        setShowViewed(!showViewed);
    }

    function showEditModal(job){
        setShowAdd(false);
        setEditJob(job);
        setShowModal(true);
    }

    function add(topic, description, category,id){
        id = maxId + 1;
        setMaxId(id);
        const addJob = {topic:topic,
            category:category,
            description:description,
            id:id}
        setJobs(jobs.concat(addJob));
        if(types.indexOf(category) === -1)
            setTypes(types.concat(category))
    }

    function edit(topic, description, category){
        let count = 0;
        for(let str of jobs){
            if(str.category === editJob.category){
                count++;
            }
        }
        if(count < 2)
            setTypes(types.filter((e) => e!==editJob.category));
        if(types.indexOf(category) === -1)
            setTypes(types.concat(category))
        const eJob = {topic:topic,
            category:category,
            description:description,
            id:editJob.id};
        const eId = jobs.indexOf(editJob);
        const mass = jobs.slice.call(jobs);
        mass.splice(eId,1,eJob,);
        setJobs(mass);
        setEditJob(example);
    }

    return (
        <div className={css.App}>
            <header>
                <h1>Доска объявлений</h1>
            </header>
            <main>
                <AsideComponent types={types}
                                sort={sort}
                                sortType={sortType}
                                showBasket={showBasket}
                                showView={showView}
                                setShowModal={setShowModal}
                                setShowAdd={setShowAdd}/>
                <BoardComponent jobs={showRemoved ? jobsRemove : showSorted ? sortedJobs : showViewed ? viewedJobs :  jobs }
                                remove={removeJob} showRemoved={showRemoved}
                                recover={recover}
                                viewed={viewed}
                                showEditModal={showEditModal}/>
            </main>
            {showModal && <AddEditComponent showModal={showModal}
                                            setShowModal={setShowModal}
                                            showAdd={showAdd}
                                            job={editJob}
                                            add={add}
                                            edit={edit}/>}
        </div>
    );
}