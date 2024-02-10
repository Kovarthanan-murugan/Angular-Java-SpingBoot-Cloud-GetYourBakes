import robot from '../../assets/robot.png'
import bubble from '../../assets/speechbubble5.png'
import './robotAssitant.css';
import {useState,useEffect} from 'react';
 export default function Assistant(props){
    const listDataLandingPage = ["Hello Excited to see you today!!","Kovarthanan created me to his assistant",
    "First I want to share some information I learned about him when he created me",
    "He is passionate about electronics and software development",
    "He helped business to build their digital products for 2 years",
    "Then he did his Master's in Applied computer science at Dalhousie University",
    "Now he works with Fidelity Canada in capacity of Student Digital Applications developer",
    "His skill set includes Java, Amazon Web Services, Javascript realted technologies like React, Angular and Node.",
    "First He Wants me to show you one of the project he is working"];
    const listDataBakes = ["Here you can find the AWS auto deploy setup for one of his project","summa",
    "First I want to share some information I learned about him when he created me",
    "He is passionate about electronics and software development",
    "He helped business to build their digital products for 2 years",
    "Then he did his Master's in Applied computer science at Dalhousie University",
    "Now he works with Fidelity Canada in capacity of Student Digital Applications developer",
    "His skill set includes Java, Amazon Web Services, Javascript realted technologies like React, Angular and Node.",
    "First He Wants me to show you one of the project he is working"];
    const [message,setMessage] = useState('')
    const [inCurrentSequence,setInCurrentSequence] = useState(0)
    const [currentPageData,setCurrentPageData] = useState([])


            function startTypingAnimation(data) {
            let textIndex = 0;
            console.log("inside",currentPageData)
            const typingAnimation = setInterval(() => {
              const text = data; // Replace with your actual text
            setMessage(text.substring(0, textIndex))

              textIndex++;
        
              if (textIndex > text.length) {
                clearInterval(typingAnimation);

              }
            }, 100);
        

          }
        useEffect(()=>{


          let data = null
          

          if(props.classForComponent == 'landingPage'){
            data = listDataLandingPage
            console.log("landind",props.classForComponent)
          setCurrentPageData(listDataLandingPage)
          }
          else if(props.classForComponent == 'bakes'){
            data = listDataBakes
            setCurrentPageData(data)
          }

          console.log("dsds",data);
            window.addEventListener('click', (event)=>{console.log('clicked',event.target)});
            
            setTimeout(()=>{startTypingAnimation(data[0])},1500)
            

            
        },[props.classForComponent == 'landingPage'])


        
   function nextSequence(){
    let sequence  = inCurrentSequence +1
     console.log("sequence",currentPageData[sequence])
    if(currentPageData[sequence] != undefined){
    startTypingAnimation(currentPageData[sequence])
    setInCurrentSequence(inCurrentSequence+1)
    }
   }
    return (
    <div className = {props.classForComponent}>
      <div className = "full-robo-component">
        <div class="container">
          <div class='typingMessage'>{message}</div>
          <img className = "myAssistantbubble" src={bubble} alt='myAssistantBubble' ></img>

        </div>
        <div className = "myAssistantWrapper">
        <img className = "myAssistant" src={robot} alt='myAssistant' ></img>
        </div>
      </div>
      <button onClick={nextSequence}>Next</button>
    </div>
    )
}


