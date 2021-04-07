import React, {useState} from 'react';
import './App.css';
import Aside from "./jobItem/Aside";
import Board from "./jobItem/Board";
import './index.css'

const mochdata=[
    {   topic: 'name',
        description:'description',
        type:'медицина',
        id:0},
    {   topic: 'Гонщик',
        description:'description1',
        type:'что-то',
        id:1},
    {   topic: 'Врач',
        description:'Обязанности: Осуществляет диагностику заболеваний и повреждений на основе комплексного применения современных методов лучевой диагностики, в том числе традиционного рентгеновского исследования (рентгенодиагностики), рентгеновской компьютерной томографии и магнитно-резонансной томографии. Проводит лучевые исследования в соответствии со стандартом медицинской помощи. - Оформляет протоколы проведенных лучевых исследований с заключением о предполагаемом диагнозе, необходимом комплексе уточняющих лучевых и других инструментальных исследований не позднее 24 часов после проведения исследования. Консультирует лечащих врачей по вопросам обоснованного и рационального выбора лучевых исследований, по результатам проведенных лучевых исследований, участвует в консилиумах, клинических разборах, клинико-диагностических конференциях. Систематически повышает свою квалификацию, внедряет новые методики лучевых исследований разрешённые к применению в здравоохранении Российской Федерации Постоянно анализирует результаты своей профессиональной деятельности, используя все доступные возможности для верификации',
        type:'медицина',
        id:2},
]

function App() {
    const [jobs, setJobs] = useState(mochdata);
    const [jobsRemove, setJobsRemove] = useState([]);

    function createType(jobs){
        let result = [];
        for (let str of jobs) {
            if (!result.includes(str.type)) {
                result.push(str.type);
            }
        }
        return result;
    }

    const [types,setTypes]= useState(createType(jobs));

    function sort(){
        setJobs(jobs.sort((a, b) => a.topic > b.topic ? 1 : -1));
        console.log(jobs);
    }

    function removeJob(id) {
        setJobsRemove(
            jobsRemove.concat(jobs[id])
        )
        setJobs(jobs.filter((job) => job.id !== id));
        console.log(jobsRemove);
    }
  return (
    <div className="App">
        <header>
            <h1>Доска объявлений</h1>
        </header>
        <main>
            <Aside types={types} sort={sort}/>
            {jobs.length ? <Board jobs={jobs} remove={removeJob}/> : <p>No</p>}
        </main>
    </div>
  );
}
//add={} sort={} sortType={} types={} basket={}
//
export default App;
