import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import givenClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHearIcon from "../../assets/images/icons/purple-heart.svg";

import './styles.css';

import api from '../../services/api';

export default function Landing(){
    const [connections,setConnections] = useState(0);

    useEffect(()=> {
          async function loadConnections(){
            const response = await  api.get('/connections');

            setConnections(response.data.total);
          }
          loadConnections();
    },[]);
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua Plataforma de estudos online</h2>
                </div>
                <img 
                    src={landingImg} 
                    alt="Plataforma de estudos"
                    className="hero-image"
                />
                <div className="buttons-container">
                    <Link to='/study' className='study' >
                      <img src={studyIcon} alt="Estudar"/>
                      Estudar
                    </Link>
                    <Link to="give-classes" className='give-classes' >
                      <img src={givenClassesIcon} alt="Dar Aulas"/>
                      Dar Aulas
                    </Link>
                </div>
                <span className="total-connections">
                        Total de {connections} conexões já realizadas <img src={purpleHearIcon} alt="Coração roxo"/>
                </span>
            </div>
        </div>
    )
} 
