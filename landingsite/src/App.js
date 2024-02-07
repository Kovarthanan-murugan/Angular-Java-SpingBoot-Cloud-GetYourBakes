import React from 'react';
import './index.css';
import Background from './components/background/background';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useDeployResources} from './services/deployServices'
import {useEffect} from 'react'
import RobotAssistant from './components/roboAssitant/roboAssistant'
import GetYourBakes from './components/getYourBakesDeploy/GetYourBakesDeploy'
const HomePage = ()=>{
    
    return (
        <BrowserRouter>
        {/* <RobotAssistant classForComponent={"landingPage"}/> */}
        <GetYourBakes/>
      </BrowserRouter>
    );
}

export default HomePage;