import axios from "axios";
import {useGetDeployedPublicIpHook} from '../hooks/autoDeployHooks'
import{useState} from 'react';
const basePath = 'https://nxzr5jmjrk.execute-api.us-east-1.amazonaws.com';

export const useDeployResources = ()=>{ 
  const [publicIp,setPublicIp] =useState('')
  const [status,setStatus] = useState('')
  const [allProvisionResources,SetAllProvisionResources] = useState([1]);
  const [currentOperation,setCurrentOperation] = useState('testing');
  const [loading,setLoading] = useState()
  
  const fetchIpData = async()=>{
    console.log("inside  fetch")
  await axios.get(basePath+'/getdeployedpublicip')
    .then(response => {
      console.log(response.data.response);
      if(currentOperation != 'delete'){
      setPublicIp(response.data.response)
      }
      return response.data.response
      })
    .catch(error => {
      console.log("error",error);
    });
  }

const getStatus= async (query =(currentOperation == 'delete' || status == 'DeleteInProgress' ? '?fordelete=true':''),statusCheck )=>{
  // console.log("triggerfromschedule",schedule)
  let statusResponse = ''
  await axios.get(basePath+'/getStackStatus'+query).then( (response) => {statusResponse = response.data.response.stackCurrentStatus;console.log('status',response.data.response.stackCurrentStatus);
  if (response.data.response.statusResponse != ''){
  SetAllProvisionResources(response.data.response.statusResponse)
  }
  else{
    SetAllProvisionResources(1)
  }
  setStatus(statusResponse)
  // processResourceResponse(response.data.response.statusResponse)
  console.log("dd",response.data.response.statusResponse)
  console.log("statusbefore",statusResponse)
  console.log("inside if",statusResponse,currentOperation)
  if((statusResponse == 'DeployComplete' )|| (statusResponse == 'DeleteComplete')){
    console.log("inside if",statusResponse,currentOperation)
    if(statusResponse != 'DeleteComplete'){
    fetchIpData();
    }
    setStatus(response.data.response.stackCurrentStatus)
    clearInterval(statusCheck)
    // if (schedule == true){
    //   return true
    // }
    
    console.log("set",allProvisionResources)
  }
  }).catch(error => {console.log(error)});
  console.log("status check",statusResponse)
}

const sheduleToGetStackStatus= (query = '')=>{
  const statusCheck = setInterval(async()=>{
    console.log("interval still runnning")
    getStatus(query,statusCheck);
    // if (doneStatusCheck == true){
    // clearInterval(statusCheck);
    // }
  },60000)

  

}
  const deployResource = async()=>{
    console.log("deploy",status)
    await axios.get(basePath+'/deploycloudformation').then( response =>{console.log(response)}).catch( error => {console.log(error)});
    sheduleToGetStackStatus()
    setCurrentOperation('deploy')
  }

const deleteResources = ()=>{ 
  axios.get(basePath+'/deletecloudformationstack').then(((data)=>{console.log("delete",data)})).catch( error =>{console.log(error)})
  sheduleToGetStackStatus('?fordelete=true');
  setCurrentOperation('delete')
  };

  const updateUserCount = (action='')=>{

    axios.get(basePath+'/updateUser'+action).then(()=>{}).catch((error)=>{console.log('errror update user in')})

  }


  return {publicIp,fetchIpData,deployResource,deleteResources,status,allProvisionResources,getStatus,currentOperation,updateUserCount}
};

