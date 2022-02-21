import React, {useState, useCallback, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import {useHttp} from '../hooks/http.hook';
import basket from '../pictures/basket.png';

function Card(props){
    const {request, loading} = useHttp()
    const [def, setDef] = useState()
    const [classAlarm, setClassAlarm] = useState('')
    const [time, setTime] = useState()
    const deleteHendler = (event) => {
        request(`/api/card/:${props.id}`, 'POST', {...props}, {} )
        window.location.reload();
    }

    const getSite = useCallback(async () =>{
        try{
            const fetched = await request(`/api/card/get-site/:${props.id}`, 'POST', {...props}, {} )
            console.log(fetched.message.indexOf(props.id1))
            setTime(Date())
            if (fetched.message.indexOf(props.id1) != -1 && fetched.message.indexOf(props.id2) != -1){
                setDef('відсутні')
                setClassAlarm('')
                document.getElementById(props.id).disabled = true
                document.getElementById(props.id + '1').disabled = true
            } else {
                setDef('наявні ознаки deface')
                setClassAlarm('cardAlarm')
                document.getElementById(props.id).disabled = false
                document.getElementById(props.id + '1').disabled = false
            }
        }catch(e){
            console.log('getSite error')
        }
    }, [request])

    useEffect(()=>{  
        getSite()
        setInterval(()=>{getSite()},60000)
        
    }, [getSite])



    return(
        <div className={'card ' + classAlarm}>
            <h3>{props.title}</h3>
            <p>Посилання: <a href={props.link}>{props.link}</a></p>
            <p>Ознаки deface: <span>{def}</span></p>
            <p>Доступність: <span>online</span></p>
            <p>Час останньої перевірки: {time}</p>
            <div className="groupButton">
                <Button id={props.id} className="cardButton" variant="primary" disabled>True deface</Button>
                <Button id={props.id + '1'} className="cardButton" variant="primary" disabled>False deface</Button>
                <Button className="cardButton" variant="danger" onClick={deleteHendler}><img className="delete" src={basket}/></Button>
            </div>
            
        </div>
    )
}

export default Card;