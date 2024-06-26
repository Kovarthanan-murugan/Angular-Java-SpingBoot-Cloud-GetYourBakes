import {useDeployResources} from '../../services/deployServices'
import {useEffect} from 'react'
import Background from '../background/background';
import './GetYourBakesDeploy.css'
import RobotAssistant from '../roboAssitant/roboAssistant'
import ufo from '../../assets/architecture.jpg'
import loadinggif from '../../assets/loading.gif'
function createListOfResourcesProvision (stack){

    return <p>Resource: {stack.logicalId} Status:{stack.status}</p>
}

export default function GetYourBakes(){    
    const a = ()=>{
        console.log("clicked kova")
    }
    const {publicIp,fetchIpData,deployResource,deleteResources,status,allProvisionResources,getStatus,currentOperation,updateUserCount}= useDeployResources();

    useEffect(()=>{
        getStatus();
        updateUserCount('?insideSite');
        
     },[])
 
    return(
        <>
        <div className="bakesContainer">
            <RobotAssistant classForComponent={"bakes"}/>
            {/* <Background/> */}
            <div className='flex-container bakesWrap'>

            <div className="cloudInfo">
                <h1>AWS Architecture</h1>
                {/* <img className='architectureImg' src={ufo}></img> */}
                <iframe className='video' src='https://www.youtube.com/embed/XXWc2wPCGU4'
                frameborder='0'
                allow='autoplay; encrypted-media'
                allowfullscreen
                title='video'
                    />


            </div>

            <div className='resourceSection flex-container'>
                

                    <div className='stackInfo flex-item'>

                    <h1>Provisioning Information</h1>

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

                    <div className='actions flex-item'>
                        {
                        status != '' && (status == 'DeployComplete') && (currentOperation != 'delete')
                        ? 
                        <button className ='missile-button missile-button-red' onClick={deleteResources}>Delete</button>
                        :(currentOperation == 'deploy' || status =='DeployInProgress'?'Provising is in process'
                        :((status == 'DeleteInProgress' || currentOperation == 'delete') && status != 'DeleteComplete' || status =='DeleteInProgress' ? 'Deleting resources' :<button className = 'missile-button missile-button-green'onClick={()=>{deployResource();updateUserCount('?deployCliked');}}>Deploy</button>)
                        )
                        }
                        {
                            ((status == 'DeleteInProgress' || currentOperation == 'delete') && status != 'DeleteComplete' ) ||(currentOperation == 'deploy' && (status != 'DeployComplete' || status =='DeployInProgress')) ? <img className='loadingGif'src={loadinggif}></img>:''
                        }
                        
                        {/* {
                        status != '' && (status == 'DeployComplete')
                        ? 
                        <>
                        <a href={`http://${publicIp}:4000`}> Deployed application</a> <button onClick={deleteResources}>Delete Resource</button>
                        </>
                        :(currentOperation == 'deploy'? 'Provisiing is in process'
                        :<button onClick={deployResource}>Deploy</button>)
                        } */}

                    </div>

                    <div onClick = {a} className='output flex-item'>
                        {
                        status != '' && ((status == 'DeployComplete') || (status == 'DeleteInProgress'))
                        ? 
                        <a href={`http://${publicIp}:4000`} onClick={()=>{updateUserCount('?visitedDeploy');}}target='_blank'> Deployed application</a>
                        :'No Provisioned resource available'

                        }


                    </div>

                </div>
            </div>

        </div>
        
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