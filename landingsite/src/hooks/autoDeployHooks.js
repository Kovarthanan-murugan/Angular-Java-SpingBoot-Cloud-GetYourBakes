// import * as autoDeployService from '../services/deployServices'
// import {useState} from 'react'
// export const DeployResourceHook = ()=>{

//     const [deployStatus,setDeployStatus] = useState('');
    
//     setDeployStatus(autoDeployService.deployResources().then((result) => {

//         console.log("inside service",)
        
//     }).catch((err) => {
//         console.log("error")
//     }));
    

// }

// export const useGetDeployedPublicIpHook = ()=>{
//     const[publicIp,setPublicIp] = useState('');
    
//     const setIp = (ip)=>{
//         setPublicIp(ip);
//     }
//     return {publicIp,setIp()};
// }