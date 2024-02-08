import {useDeployResources} from '../../services/deployServices'
import {useEffect} from 'react'
import Background from '../background/background';
import './GetYourBakesDeploy.css'
import RobotAssistant from '../roboAssitant/roboAssistant'

function createListOfResourcesProvision (stack){

    return <p>Resource: {stack.logicalId} Status:{stack.status}</p>
}

export default function GetYourBakes(){    
    
    const {publicIp,fetchIpData,deployResource,deleteResources,status,allProvisionResources,getStatus,currentOperation}= useDeployResources();

    useEffect(()=>{
        getStatus();
     },[])
 
    return(
        <>
        <Background/>
        <RobotAssistant classForComponent={"bakes"}/>
    {/* <div className='wrapper'>
        <div className = "info-container">
            <h1 className='welcomeheader'>Hi Welcome</h1>
            <br/>
            <h1 className='info'>This is the landing page for my Getyourbakes project resource autoprovisioning in AWS</h1>
            <h1 className='uisoon'>Working on AWS cloud formation to facilitate resource provisioning, that will be updated soon..!</h1>
            <h1 className='deployed'>Use the below link to for the pre-deployed application</h1>
        </div>
        <div className="deloy-container">
            <div className ="deploy-actions">

            
            {status != '' && (status == 'DeployComplete')? 
            <><a href={`http://${publicIp}:4000`}> Deployed application</a> <button onClick={deleteResources}>Delete Resource</button></>
            :
            (currentOperation == 'deploy'? 'Provisiing is in process'
            :
            <button onClick={deployResource}>Deploy</button>)}
            </div>
            <div className="output-terminal">
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
            </div>
        </div>
    </div> */}
    </>
    )
    
}