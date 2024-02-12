import {useState} from 'react'





export  const useTypingService=()=>{
    let typingAnimation;

    const [message,setMessage] = useState('')
    const [subMessage,setSubMessage] = useState('')
    const [messageStatus,setMessageStatus] = useState('false')

    function startTypingAnimation(data) {
              
        clearInterval(typingAnimation);
      let textIndex = 0;
      typingAnimation = setInterval(() => {
        const text = data; // Replace with your actual text
      setMessage(text.substring(0, textIndex))
    
        textIndex++;
    
        if (textIndex > text.length) {


          clearInterval(typingAnimation);
        //   setAnimate(false);
    
        }
      }, 100);
    
    
    }

    return {message,startTypingAnimation,subMessage}
}


