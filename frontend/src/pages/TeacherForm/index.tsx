import React,{ useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

import api from '../../services/api';

export default function TeacherForm(){
    const history = useHistory();
    const [name,setName] = useState('');
    const [avatar,setAvatar] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [bio,setBio] = useState('');

    const [subject,setSubject] = useState('');
    const [cost,setCost] = useState('');

    const [scheduleItems,setScheduleItems] = useState([
        {week_day: '0', from: "", to: ""}
    ])

    function addNewScheduleItem(){
          setScheduleItems([
            {week_day: '0', from: '', to: ''},
              ...scheduleItems,             
          ])
    }
    function setScheduleItemValue(position: number, field: string, value: string){
          const newArray = scheduleItems.map((scheduleItem,index)=> {
              if(index === position){
                  return {...scheduleItem,[field]: value}
             }
             return scheduleItem;
          })

          setScheduleItems(newArray);

          console.log(newArray);
    }

    async function handleCreateClass(e: FormEvent){
            e.preventDefault()

           try {
            const response = await api.post('/classes',{
                        name,
                        avatar,
                        whatsapp,
                        bio,
                        subject,
                        cost,
                        schedule: scheduleItems
                    })
            alert("Cadastro Concluido com sucesso");
            history.push('/');
            console.log(response.data);
           } catch (error) {
                console.log(error);
                alert("Ocorreu um Erro");
           }
    }

    return (
       <div id='page-teacher-form' className='container' >
           <PageHeader 
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulario de inscrição"
           />
           <main>
               <fieldset>
                   <legend>Seus dados</legend>
                    <Input 
                        name="name"  
                        label="Nome Completo"
                        value={name}
                        onChange={(e) => setName(e.target.value) }
                    />
                    <Input 
                        name="avatar" 
                        label="Avatar"
                        value={avatar}
                        onChange={(e)=> setAvatar(e.target.value)}
                    />
                    <Input 
                        name="whatsapp" 
                        label="Whatsapp" 
                        value={whatsapp}
                        onChange={(e)=> setWhatsapp(e.target.value)}
                    />
                    <TextArea 
                        name='bio' 
                        label="Biografia"
                        value={bio}
                        onChange={(e)=> setBio(e.target.value)}
                    />
               </fieldset>
               <fieldset>
                   <legend>Sobre a aula</legend>
                    <Select 
                        name="subject"  
                        label="Materia"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
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
                    <Input 
                        name="cost" 
                        label="Custo da sua hora por aula"
                        value={cost}
                        onChange={(e)=> setCost(e.target.value)}
                    />

               </fieldset>
               <fieldset>
                   <legend>Horários disponiveis
                        <button type='button' onClick={addNewScheduleItem} >
                            + Novo Horário
                        </button>
                   </legend>
                   {scheduleItems.map( (scheduleItem, index )=> {
                       return (
                            <div  key={scheduleItem.week_day} className="schedule-item">
                            <Select
                                    onChange={(e)=> setScheduleItemValue(index,'week_day',e.target.value) } 
                                    name="week_day"  
                                    label="Dia da semana"
                                    value={scheduleItem.week_day}
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
                                    name='from' 
                                    label='Das' 
                                    type='time'
                                    value={scheduleItem.from}
                                    onChange={(e)=> setScheduleItemValue(index,'from',e.target.value) } 
                                />
                                <Input 
                                   name='to' 
                                   label='Até' 
                                   type='time'
                                   value={scheduleItem.to}
                                   onChange={(e)=> setScheduleItemValue(index,'to',e.target.value) } 
                                />
                        </div>
                       )
                    })}
               </fieldset>
               <footer>
                   <p>
                       <img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br />
                        Preencha todos os dados
                   </p>
                   <button type="button" onClick={handleCreateClass} >
                       Salvar cadastro
                   </button>
               </footer>
           </main>
       </div>
    )
}