import React, {useState} from 'react';
import './App.css';
import Aside from "./jobItem/Aside";
import Board from "./jobItem/Board";
import './index.css'
import AddEdit from "./jobItem/AddEdit";

const mochdata=[
    {   topic: 'name',
        description:'description',
        type:'type',
        id:0},
    {   topic: 'Гонщик',
        description:'description1',
        type:'Вождение',
        id:1},
    {   topic: 'Врач',
        description:'Обязанности: Осуществляет диагностику заболеваний и повреждений на основе комплексного применения современных методов лучевой диагностики, в том числе традиционного рентгеновского исследования (рентгенодиагностики), рентгеновской компьютерной томографии и магнитно-резонансной томографии. Проводит лучевые исследования в соответствии со стандартом медицинской помощи. - Оформляет протоколы проведенных лучевых исследований с заключением о предполагаемом диагнозе, необходимом комплексе уточняющих лучевых и других инструментальных исследований не позднее 24 часов после проведения исследования. Консультирует лечащих врачей по вопросам обоснованного и рационального выбора лучевых исследований, по результатам проведенных лучевых исследований, участвует в консилиумах, клинических разборах, клинико-диагностических конференциях. Систематически повышает свою квалификацию, внедряет новые методики лучевых исследований разрешённые к применению в здравоохранении Российской Федерации Постоянно анализирует результаты своей профессиональной деятельности, используя все доступные возможности для верификации',
        type:'медицина',
        id:2},
    {   topic: 'Менеджер по работе с клиентами',
        description:'ООО ЛК "Сименс Финанс" – федеральная лизинговая компания, входящая в финансовое подразделение международного концерна "Сименс АГ", одна из лидеров рынка, приглашает менеджера по работе с клиентами (на период декретного отпуска основного сотрудника).',
        type:'Менеджмент',
        id:3},
    {   topic: 'Водитель-курьер на личном автомобиле',
        description:'Требуемый опыт работы: 1–3 года. ' +
            'Полная занятость, сменный график. ' +
            'Возможно временное оформление: договор услуг, подряда, ГПХ, самозанятые, ИП.',
        type:'Вождение',
        id:4},
    {   topic: 'Менеджер по работе с клиентами',
        description:'ООО ЛК "Сименс Финанс" – федеральная лизинговая компания, входящая в финансовое подразделение международного концерна "Сименс АГ", одна из лидеров рынка, приглашает менеджера по работе с клиентами (на период декретного отпуска основного сотрудника).',
        type:'Менеджмент',
        id:5},
    {   topic: 'Водитель-курьер на личном автомобиле',
        description:'Требуемый опыт работы: 1–3 года. ' +
            'Полная занятость, сменный график. ' +
            'Возможно временное оформление: договор услуг, подряда, ГПХ, самозанятые, ИП.',
        type:'Вождение',
        id:6}
]

function App() {
    const example = {topic:'',
        type:'',
        description:'',
        id:-1}
    const [jobs, setJobs] = useState(mochdata);
    const [jobsRemove, setJobsRemove] = useState([]);
    const [showRemoved, setShowRemoved] = useState(false);
    const [types,setTypes] = useState(createType(jobs));
    const [showSorted, setShowSorted] = useState(false);
    const [sortedJobs, setSortedJobs] = useState();
    const [showViewed, setShowViewed] = useState(false);
    const [viewedJobs, setViewedJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [editJob, setEditJob] = useState(example);

    function createType(jobs){
        let result = [];
        for (let str of jobs) {
            if (!result.includes(str.type)) {
                result.push(str.type);
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
            const sorted = [].slice.call(jobs).filter((job) => job.type === nameType);
            setSortedJobs(sorted);
            setShowSorted(true);
        }
        else setShowSorted(false)
    }

    function removeJob(rJob) {
        if(showRemoved){
            setJobsRemove(jobsRemove.filter((job) => job !== rJob));
            return;
        }
        let rId = jobs.indexOf(rJob);

        setJobsRemove(
            jobsRemove.concat(jobs[rId])
        );
        let count = 0;
        for(let str of jobs){
            if(str.type === jobs[rId].type){
                count++;
            }
        }
        if(count < 2)
            setTypes(types.filter((e) => e!==jobs[rId].type));
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
        removeJob(job);
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

    function add(topic, description, type,id){
        if(id === -1){
            let max = -1;
            for(let str of jobs){
                if(str.id > max)
                    max = str.id+1
            }
            for(let str of jobsRemove){
                if(str.id > max)
                    max = str.id+1
            }
            id = max;
        }
        const addJob = {topic:topic,
            type:type,
            description:description,
            id:id}
        setJobs(jobs.concat(addJob));
        if(types.indexOf(type) === -1)
            setTypes(types.concat(type))
    }

    function edit(topic, description, type){
        const eId = jobs.indexOf(editJob);
        let count = 0;
        for(let str of jobs){
            if(str.type === jobs[eId].type){
                count++;
            }
        }
        if(count < 2)
            setTypes(types.filter((e) => e!==jobs[eId].type));
        if(types.indexOf(type) === -1)
            setTypes(types.concat(type))
        const eJob = {topic:topic,
            type:type,
            description:description,
            id:eId};
        const mass = jobs.slice.call(jobs);
        mass.splice(eId,1,eJob,);
        setJobs(mass);
        setEditJob(example);
    }

  return (
    <div className="App">
        <header>
            <h1>Доска объявлений</h1>
        </header>
        <main>
            <Aside types={types}
                   sort={sort}
                   sortType={sortType}
                   showBasket={showBasket}
                   showView={showView}
                   setShowModal={setShowModal}
                   setShowAdd={setShowAdd}/>
            <Board jobs={showRemoved ? jobsRemove : showSorted ? sortedJobs : showViewed ? viewedJobs :  jobs }
                   remove={removeJob} showRemoved={showRemoved}
                   recover={recover}
                   viewed={viewed}
                   showEditModal={showEditModal}/>
        </main>
        {showModal && <AddEdit showModal={showModal}
                 setShowModal={setShowModal}
                 showAdd={showAdd}
                 job={editJob}
                 add={add}
                 edit={edit}/>}
    </div>
  );
}
//add={}
export default App;
