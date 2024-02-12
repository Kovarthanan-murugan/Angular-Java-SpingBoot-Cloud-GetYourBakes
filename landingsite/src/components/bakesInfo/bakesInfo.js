import './bakesInfo.css'
import img from '../../assets/ufo2.jpg'
import bakes from '../../assets/bakes.png'
import cake from '../../assets/cake.png'
import {useEffect} from 'react'
import {useTypingService} from '../../services/typingService'
export default function BakesInfo(){
    const {startTypingAnimation,message,subMessage} = useTypingService()

    useEffect(()=>{

            startTypingAnimation("Full Stack Application Build with Angular, Java and Amazon Web Services")
   
    },[]);


    return(
        
        <div className = 'bakesInfo'>
            <div className = "bakesInfoDecorate">
                <div className="bakesImg">
                    <img src={bakes}></img>
                </div>
                <div className="bakesPageMessage">
                    <h1>GetYourBakes</h1>
                    <p>{message}</p>
                    
                    </div>
                <div className='bakesDecMessage'>
                    <img className='decMessageImg'src={cake}></img>
                </div>

            </div>

        </div>
    )
}