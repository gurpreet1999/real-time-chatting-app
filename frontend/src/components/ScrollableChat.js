import { useEffect, useRef } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { useSelector } from "react-redux";


import ScrollToBottom from 'react-scroll-to-bottom';
import {
  calculateTop,
  
  isSameSender,
  isSameSenderMargin,

} from "../config/chatLogic";






const ScrollableChat = ({ messages }) => {
  const elementRef = useRef(null);
const {user}=useSelector(state=>state.user)
console.log(user.id)
console.log(messages)
useEffect(() => {
    
  elementRef.current?.scrollIntoView()
}, [messages]);
  return (
    < div className="allMessage"  style={{position:"relative" ,height:"auto" }} >
      {messages &&
        messages.map((m, i) => (
          <div  key={m._id}   style={{  display:"flex", }} >
            {(isSameSender(messages, m, i, user.id))?(<span
              style={{
                backgroundColor: `${
                  m.sender._id === user.id ? "#BEE3F8" : "#B9F5D0"
                }`,
                position:"absolute",
                ...calculateTop(i),
                ...isSameSenderMargin(messages, m, i, user.id),
               
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              <p   >{m.content}</p>
            </span>):(
<>

              <span
              style={{
                position:"absolute",
                ...calculateTop(i),
                ...isSameSenderMargin(messages, m, i, user.id),
              
                display:"flex",
                maxWidth: "75%",
              }}
            >

<Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
               order={m.sender._id===user.id?1:0}
               marginLeft={m.sender._id!==user.id?"-30px":"0px"}
               marginRight={m.sender._id===user.id?"-30px":"0px"}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
              <p  style={{ borderRadius: "20px",
                padding: "5px 15px",
               
                backgroundColor: `${
                  m.sender._id === user.id ? "#BEE3F8" : "#B9F5D0"
                }`,
               
             
             
                   
                    
                }} >  {m.content}</p>
            
            </span>
            </>
            )
}
            </div>

        ))}
        <div ref={elementRef} style={{position:"absolute" ,top:`${(messages.length-1)*40}px` }}  ></div> 
    </ div>
  );
};

export default ScrollableChat;