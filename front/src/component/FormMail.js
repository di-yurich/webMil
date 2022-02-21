import React, { useEffect, useState, useCallback } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHttp } from "../hooks/http.hook";


function FormMail(props) {
  const {loading, request, error, clearError} = useHttp()

  const [mail, setMail] = useState({
    email: localStorage.getItem('email'),
    topic: localStorage.getItem('topic'),
    message: localStorage.getItem('message'),
    time:'0.10',
    stop: localStorage.getItem('stop')
  })

  const [checked, setChecked] = useState()
  const [logs, setLogs] = useState('')

  const changeHendler = event =>{
    setMail({...mail, [event.target.name]: event.target.value})
  }
  const addEntry = useCallback(() => {
    setLogs([...logs, <p className="logsSend">Повідомлення відправлено {Date()} </p> ])
  });

  const timeHendler = event =>{
    setMail({...mail, time: document.getElementById('chooseTime').value})
  }  
  
  const sendHendler = async () =>{
    try{   
        localStorage.setItem('email', mail.email)
        localStorage.setItem('topic', mail.topic)
        localStorage.setItem('message', mail.message)
        localStorage.setItem('time', mail.time)
        localStorage.setItem('stop', mail.stop)
        localStorage.setItem('startButton', 'none')
        localStorage.setItem('stopButton', 'block')

        await request('/api/card/send', 'POST', {...mail})
        addEntry() 
        document.getElementById('startSend').style.display = localStorage.getItem('startButton')
        document.getElementById('stopSend').style.display = localStorage.getItem('stopButton')
        setMail((mail) => ({...mail, stop: true}))

    } catch(e){
      console.log('send error')
    }
      
  }

  const stopHendler = async () =>{
    try{ 
        localStorage.setItem('startButton', 'block')
        localStorage.setItem('stopButton', 'none')
        localStorage.setItem('stop', mail.stop)
        await request('/api/card/send', 'POST', {...mail}, {})
        document.getElementById('startSend').style.display = localStorage.getItem('startButton')
        document.getElementById('stopSend').style.display = localStorage.getItem('stopButton')
        setMail((mail) => ({...mail, stop: false}))
    } catch(e){
      console.log('stop error')
    }
      
  }

 const defVelue = ()=> {
  //  if(localStorage.getItem('email')){
  //   document.getElementById('email').value = localStorage.getItem('email') 
  //   document.getElementById('topic').value = localStorage.getItem('topic') 
  //   document.getElementById('message').value = localStorage.getItem('message') 
  //  }
   

  }

  defVelue()

  
  
  return (
    <div className="container" >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Налаштування оповіщення
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Form.Group className="mb-3" >
          <Form.Label>Отримувач</Form.Label>
          <Form.Control name="email" type="email" id="email" placeholder="example@mil.gov.ua" onChange={changeHendler} defaultValue={localStorage.getItem('email')}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Тема повідомлення</Form.Label>
          <Form.Control name="topic" type="text" id="topic"  placeholder="example" onChange={changeHendler} defaultValue={localStorage.getItem('topic')} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Текст повідомлення</Form.Label>
          <Form.Control name="message" id="message"   as="textarea" onChange={changeHendler} defaultValue={localStorage.getItem('message')} />
        </Form.Group>


        <Form.Label>Частота відправки</Form.Label>
        <br/>
        <select className="chooseTime" id="chooseTime" onChange={timeHendler}>
          <option value="0.10">кожні 10 хвилин</option>
          <option value="1">щогодинно</option>
          {/* <option value="6">раз на 6 годин</option>
          <option value="12">раз на 12 годин</option>
          <option value="24">раз на добу</option> */}
        </select>
        <br/>
               
        <Button variant="primary" type="button" id="startSend" onClick={sendHendler} style={{display: localStorage.getItem('startButton')}}>
          Почати відправку
        </Button>
        <Button variant="primary" type="button" id="stopSend" onClick={stopHendler} style={{display: localStorage.getItem('stopButton')}}>
          Призупинити відправку
        </Button>

        <Form.Group className="mb-3" >
          {logs}
        </Form.Group>

        
      </Form>
      </Modal.Body>
    </div>
  );
}

export default FormMail;