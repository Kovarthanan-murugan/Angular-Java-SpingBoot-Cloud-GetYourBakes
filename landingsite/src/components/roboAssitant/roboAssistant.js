import robot from '../../assets/robot.png'
import bubble from '../../assets/speechbubble5.png'
import './robotAssitant.css';
import {useState,useEffect,useRef} from 'react';
import clickImg from '../../assets/click.png'
import GetYourBakes from '../getYourBakesDeploy/GetYourBakesDeploy'
import Background from '../background/background';

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
   
    const bakesProvisionPage =['Here you can find the current resource provisioning status','Here you can find  Deploy and Delete actions','Here you can find the link for the provisioned application after provision done','Now all the provisoned resource will be deleted from the AWS', 'New resources will be provisioned for getyourbakes application']
    const [message,setMessage] = useState('')
    const [inCurrentSequence,setInCurrentSequence] = useState(0)
    const [currentPageData,setCurrentPageData] = useState([])
    const myStateRef = useRef(currentPageData);
    const inCurrentSequenceRef = useRef(inCurrentSequence);
    const [animate, setAnimate] = useState(false);
    const [clickedAnimate, setclickedAnimate] = useState(false);
    const [scrollDown, setScrollDown] = useState(false);
    const [scrolledToPage, setScrolledToPage] = useState(false);
    const  refScrolledToPagev = useRef(scrolledToPage)
    const [pointerStatus, setPointerStatus] = useState(false);
    const [bakesRoboAnimate, setBakesRoboAnimate] = useState(false);
    const  refBakesRoboAnimate = useRef(bakesRoboAnimate);
    
    useEffect(()=>{
          
      console.log("inside useeffect",window.scrollY)
      let data = null
      

      if(props.classForComponent == 'landingPage'){
        data = listDataLandingPage

        
        console.log("landind",props.classForComponent)
      setCurrentPageData(listDataLandingPage)
      myStateRef.current = listDataLandingPage
      }
      else if(props.classForComponent == 'bakes'){
        data = listDataBakes
        setCurrentPageData(data)
        myStateRef.current = listDataLandingPage
      }


      console.log("dsds",data);
        window.addEventListener('click', (event)=>{
          updateRobotMessage(event.target)});
        
        setTimeout(()=>{startTypingAnimation(data[0])},1500)
        const handleScroll = () => {
          const threshold = 1400; // Adjust this value to the desired scroll position
          console.log('inside assistant',refScrolledToPagev)

          if(window.scrollY >=700){
            setScrollDown(false);
          }
          if (window.scrollY >= threshold) {
          //   console.log("uyou scrolled")
            if(refScrolledToPagev.current == false){
              refBakesRoboAnimate.current = true;
              if(props.classForComponent == 'bakes'){
            startTypingAnimation(bakesProvisionPage[0])
            refScrolledToPagev.current = true
              }
          }

            
          } else {
          }
        };

   window.addEventListener('scroll', handleScroll);

   return ()=>{
      window.removeEventListener('scroll',handleScroll)
   }

        
    },[])


    // Function to toggle the animation
    const toggleAnimation = () => {
      setAnimate(true); // Apply animation
      setclickedAnimate(true)
      setTimeout(() => {
         // Remove animation after a certain duration
      }, 2000); // Adjust the duration according to your animation
    };
  
            let typingAnimation;
            function startTypingAnimation(data) {
              
              clearInterval(typingAnimation);
            let textIndex = 0;
            console.log("inside",myStateRef.current)
            typingAnimation = setInterval(() => {
              const text = data; // Replace with your actual text
            setMessage(text.substring(0, textIndex))

              textIndex++;
        
              if (textIndex > text.length) {
                clearInterval(typingAnimation);
                setAnimate(false);
                if(data =='First He Wants me to show you one of the project he is working'){
                  setScrollDown(true)
                }
                if(data =='Hello Excited to see you today!!'){
                  setPointerStatus(true)
                }
              }
            }, 100);
        

          }



        
   function nextSequence(){
    let sequence  = inCurrentSequenceRef.current +1
    console.log("currentPageData",myStateRef.current)
     console.log("sequence",myStateRef.current[sequence])
    if(myStateRef.current[sequence] != undefined){

    startTypingAnimation(myStateRef.current[sequence])
    setInCurrentSequence(inCurrentSequence+1)
    inCurrentSequenceRef.current = sequence
    }
   }

   function clickEffect(e){
    var d=document.createElement("div");
    d.className="clickEffect";
    d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
    document.body.appendChild(d);
    d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
    }
    document.addEventListener('click',clickEffect);

            function updateRobotMessage(currentElement){

              if(props.classForComponent == 'bakes'){
        

              if (currentElement.classList.contains('stackInfo')) {
                startTypingAnimation(bakesProvisionPage[0])
                
            } else if (currentElement.classList.contains('actions')) {
              startTypingAnimation(bakesProvisionPage[1])
            }
            else if (currentElement.classList.contains('output'))
            {
              startTypingAnimation(bakesProvisionPage[2])
            }
            else if (currentElement.classList.contains('missile-button-red'))
            {
              startTypingAnimation(bakesProvisionPage[3])
            }
            else if (currentElement.classList.contains('missile-button-green'))
            {
              startTypingAnimation(bakesProvisionPage[4])
            }
            
          }
          else{
            if(currentElement.classList.contains('myAssistant'))
            {
              console.log("myssiis");
              toggleAnimation()
              nextSequence()
            }
          }

              console.log('currentElement',currentElement)

            }
    return (
      <>
    <div className = {props.classForComponent}>
      <div className = "landingPageDecorate">
      <div className = "full-robo-component">
        <div class="container">
          <div class='typingMessage'>{message}</div>
          
          <img className = "myAssistantbubble" src={bubble} alt='myAssistantBubble' ></img>

        </div>
        <div className = "myAssistantWrapper">
          <img className={pointerStatus ==true?'pointerAnimate':'pointer'} src ={clickImg}></img>
        <img className={`myAssistant ${animate ? 'landingPageAnimateOnClick' :clickedAnimate?'landingPageAnimateOffClick':''} ${animate?'':''}`}  src={robot} alt='myAssistant' ></img>
        </div>

      </div>
      </div>
      {/* <button onClick={nextSequence}>Next</button> */}
<div className={scrollDown?'arrow-down':''}><p className={scrollDown?'':'arrow-down-display'}>ScrollDown</p></div>
      <div class="arrow-container animated fadeInDown">
  <div class="arrow-2">
    <i class="fa fa-angle-down"></i>
  </div>
  <div class="arrow-1 animated hinge infinite zoomIn"></div>
</div>
    </div>

    {/* <Background/> */}
    </>
    )
}


