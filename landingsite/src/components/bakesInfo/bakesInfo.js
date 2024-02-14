import './bakesInfo.css'
import img from '../../assets/ufo2.jpg'
import bakes from '../../assets/bakes.png'
import cake from '../../assets/cake.png'
import {useEffect,useState,useRef} from 'react'
import {useTypingService} from '../../services/typingService'
export default function BakesInfo(){
    const {startTypingAnimation,message,subMessage} = useTypingService()
    const [scrolledToPage, setScrolledToPage] = useState(false);
    const  refScrolledToPagev = useRef(scrolledToPage)

  
    useEffect(()=>{

        const handleScroll = () => {
            const threshold = 700; // Adjust this value to the desired scroll position
            console.log('scrolledValue',refScrolledToPagev)
            if (window.scrollY >= threshold) {
            //   console.log("uyou scrolled")
              if(refScrolledToPagev.current == false){
                
              startTypingAnimation("Full Stack Application Build with Angular, Java and Amazon Web Services")
              refScrolledToPagev.current = true
            }

              
            } else {
            }
          };

     window.addEventListener('scroll', handleScroll);

     return ()=>{
        window.removeEventListener('scroll',handleScroll)
     }

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