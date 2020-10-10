import React from 'react';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface TeacherData{
     id: number,
     name: string,
     avatar: string,
     whatsapp: string,
     bio: string,
     cost: string
}

interface Teacher {
    teacher: TeacherData
}

const TeacherItem: React.FC<Teacher> = (props) =>{
    const { name, avatar, bio, cost, whatsapp } = props.teacher;
    return (
        <article className="teacher-item">
            <header>
                    <img src={avatar} alt={name} />
                    <div>
                        <strong>{name}</strong>
                    </div>
                    </header>
                    <p>
                     {bio}
                    </p>
                    <footer>
                        <p>
                            Preço/hora  
                            <strong>R$ {cost},00</strong>
                        </p>
                    <a href={`https://wa.me/552196312XXXX${whatsapp}`} >
                            <img src={whatsAppIcon} alt="WhatsApp"/>
                            Entar em contato
                    </a>
            </footer>
    </article>
    )
}

export default TeacherItem;