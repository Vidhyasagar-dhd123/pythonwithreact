import React, {useState} from 'react'
import { useWebSocket } from '../contexts/WebSocketProvider'

const CreateRoom = ({randomPlayer}) =>{
    const {socket, sendJson, ready}  = useWebSocket();
    const [roomId, setRoomId] = useState(null)
    const [name, setName] = useState(null)
    const joinRoom = () =>{
        if(randomPlayer && name){
            sendJson({type:"join.message",message:"random",room:"random",name:name})
        }
        else if(!randomPlayer && roomId && name){
            sendJson({type:"join.message",message:roomId,room:roomId,name:name})
        }
        else{
            window.alert("Please Enter a valid room name!")
        }
    }
    const render =()=>{
        return (
            <div className="row align-items-center w-50">
            {randomPlayer?
            <div className="col-md-6 d-flex">
                <div className="btn btn-success w-100">Auto Select is On</div>
            </div>:
            <div className="col-md-6">
                <input onInput={(event)=>setRoomId(event.target.value)} type="text" className="form-control" placeholder="Enter room name" />
            </div>
            }
            <div className="col-md-6 ">
                <input type='text' placeholder='Your name' onInput={(event)=>{setName(event.target.value)}}/>
                <div onClick={joinRoom} className='form-control btn btn-primary'>Join</div>
            </div>
        </div>
        )
        
    }
        return  (
            render()
        )
    
    }


export default CreateRoom