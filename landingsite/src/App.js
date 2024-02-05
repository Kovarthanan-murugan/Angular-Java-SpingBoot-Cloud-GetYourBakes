import React from 'react';
import './index.css';
import Background from './components/background/background';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useDeployResources} from './services/deployServices'
import {useEffect} from 'react'
import robot from './assets/robot.png'
function createListOfResourcesProvision (stack){

    return <p>Resource: {stack.logicalId} Status:{stack.status}</p>
}
const HomePage = ()=>{
    const {publicIp,fetchIpData,deployResource,deleteResources,status,allProvisionResources,getStatus,currentOperation}= useDeployResources();
    function test(){
        console.log("component",allProvisionResources)

    }
    useEffect(()=>{
       getStatus();
    },[])

    
    return (
        <BrowserRouter>
        <Background/>
     <div className='wrapper'>
      <h1 className='welcomeheader'>Hi Welcome</h1>
      <br/>
      <h1 className='info'>This is the landing page for my Getyourbakes project resource autoprovisioning in AWS</h1>
      <h1 className='uisoon'>Working on AWS cloud formation to facilitate resource provisioning, that will be updated soon..!</h1>
      <h1 className='deployed'>Use the below link to for the pre-deployed application</h1>
       
      {status != '' && (status == 'DeployComplete')? 
      <><a href={`http://${publicIp}:4000`}> Deployed application</a> <button onClick={deleteResources}>Delete Resource</button></>
      :
      (currentOperation == 'deploy'? 'Provisiing is in process'
      :
      <button onClick={deployResource}>Deploy</button>)}
      <table>
        <thead>   
        <tr>    
        <th>Resource</th>
        <th>Stack</th>
        </tr> 
        </thead>
       <tbody>
            {

allProvisionResources?.length > 1 ? (
              allProvisionResources.map((value, index) => (
                <tr key={index}>
                  <td>{value.logicalID}</td>
                  <td>{value.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No resources available</td>
              </tr>
            )}
          </tbody>
      </table>
      <img src={robot} alt='myAssistant' style ={{width:'600px',height:'600px'}}></img>
      {/* <a className='projectlink' style={{color:"white",fontSize:"20px"}} href="https://getyourbakesfrontend-irzzq65cdq-uc.a.run.app/">https://getyourbakesfrontend-irzzq65cdq-uc.a.run.app/</a> */}
      </div>
      </BrowserRouter>
    );
}

export default HomePage;