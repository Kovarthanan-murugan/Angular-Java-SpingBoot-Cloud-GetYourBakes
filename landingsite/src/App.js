import React from 'react';
import './index.css';
import Background from './components/background/background';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useDeployResources} from './services/deployServices'
import {useEffect} from 'react'
import RobotAssistant from './components/roboAssitant/roboAssistant'
import GetYourBakes from './components/getYourBakesDeploy/GetYourBakesDeploy'
import LandingPage from './components/bakesInfo/bakesInfo';
import Otherprojects from './components/otherprojects/otherprojects';
const HomePage = ()=>{
    
    return (
        <BrowserRouter>
        <div className="closure">
        <RobotAssistant classForComponent={"landingPage"}/>
        <LandingPage/>
        <GetYourBakes/>
        <Otherprojects/>
        </div>

      </BrowserRouter>
    );
}

export default HomePage;