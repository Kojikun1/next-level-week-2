import React,{ useState, useEffect, useRef } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeacherData } from '../../components/TeacherItem';
import Input from '../../components/Input';

import api from '../../services/api';

import "./styles.css";
import Select from '../../components/Select';

export default function TeacherList(){
    const [subject,setSubject] = useState('');
    const [week_day,setWeek_day] = useState('');
    const [time,setTime] = useState('');
    const [teacherItems,setTeacherItems] = useState<TeacherData[]>([]);

    async function loadClasses(){
        try {
            const response = await api.get('/classes',{
                params: {
                    week_day,
                    subject,
                    time
                }
            });
            setTeacherItems(response.data)

        } catch (error) {
            console.log(error);

           if(error.response) alert(`${error.response.data.message}`);
        }
     }

    useEffect(()=> {
        if(!!time){
             loadClasses();
        }
    },[time]);
    
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Ester são os proffys disponíveis." >
                 <form  id="search-teachers">
                 <Select
                        name="subject"  
                        label="Materia"
                        onChange={(e) => setSubject(e.target.value)}
                        value={subject}
                        options={[
                            {value: 'Artes', label: 'Artes'},
                            {value: 'Biologia', label: 'Biologia'},
                            {value: 'Ciências', label: 'Ciências'},
                            {value: 'Educação física', label: 'Educação física'},
                            {value: 'Física', label: 'Física'},
                            {value: 'Geografica', label: 'Geografia'},
                            {value: 'História', label: 'História'},
                            {value: 'Inglês', label: 'Inglês'},
                            {value: 'Literatura', label: 'Literatura'},
                            {value: 'Matematica', label: 'Matematica'},
                        ]}
                    />
                    <Select
                        name="week_day"  
                        label="Dia da semana"
                        onChange={(e) => setWeek_day(e.target.value)}
                        value={week_day}
                        options={[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda-feira'},
                            {value: '2', label: 'Terça-feira'},
                            {value: '3', label: 'Quarta-feira'},
                            {value: '4', label: 'Quinta-feira'},
                            {value: '5', label: 'Sexta-feira'},
                            {value: '6', label: 'Sabado'},
                            
                        ]}
                    />
                    <Input 
                        name="time" 
                        label="Hora" 
                        type='time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)} 
                    />
                 </form>
            </PageHeader>
            <main>
                {teacherItems.map(item => (
                    <TeacherItem key={item.id} teacher={item}  />
                ))}
            </main>
        </div>
    )
}