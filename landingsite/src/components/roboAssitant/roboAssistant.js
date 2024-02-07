import robot from '../../assets/robot.png'
import bubble from '../../assets/speechbubble5.png'
import './robotAssitant.css';
import {useState,useEffect} from 'react';
 export default function Assistant(props){

    const [message,setMessage] = useState('')
    const [inCurrentSequence,setInCurrentSequence] = useState(0)
        useEffect(()=>{
            window.addEventListener('click', (event)=>{console.log('clicked',event.target)});
            const listData = ["Hello Excited to see you today!!","kovarthanan wanted me to show his work to you"]
            setTimeout(()=>{startTypingAnimation(listData[0])},1500)
            

            
        },[])
        function startTypingAnimation(data) {
            let textIndex = 0;
        
            const typingAnimation = setInterval(() => {
              const text = data; // Replace with your actual text
            //   typingMessage.textContent = text.substring(0, textIndex);
            setMessage(text.substring(0, textIndex))

              textIndex++;
        
              if (textIndex > text.length) {
                clearInterval(typingAnimation);

              }
            }, 100);
        

          }
        
   function nextSequence(){
    let sequence  = inCurrentSequence +1
    
    const listData = ["","Kovarthanan created me to his assistant",
    "First I want to share some information I learned about him when he created me",
    "He is passionate about electronics and software development",
    "He helped business to build their digital products for 2 years",
    "Then he did his Master's in Applied computer science at Dalhousie University",
    "Now he works with Fidelity Canada in capacity of Student Digital Applications developer",
    "His skill set includes Java, Amazon Web Services, Javascript realted technologies like React, Angular and Node.",
    "First He Wants me to show you one of the project he is working"]
    console.log("sequence",listData[sequence])
    if(listData[sequence] != undefined){
    startTypingAnimation(listData[sequence])
    setInCurrentSequence(inCurrentSequence+1)
    }
   }
    return (
    <div className = {props.classForComponent}>
      <div className='container'>
      <div className='typingMessage' >{message}</div>
      </div>
      <button onClick={nextSequence}>Next</button>

      <img className = "myAssistantbubble" src={bubble} alt='myAssistantBubble' ></img>
      
      <img className = "myAssistant" src={robot} alt='myAssistant' style ={{width:'500px',height:'500px'}}></img>
    </div>
    )
}
