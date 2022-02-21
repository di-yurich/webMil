import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useHttp } from "../hooks/http.hook";


function FormAddObj(props) {
  const {loading, request, error, clearError} = useHttp()
 
 

  const [card, setCard] = useState({
    title: '',
    link: '',
    id1: '',
    id2: ''
  })


  useEffect(()=>{
    if (error){console.log(error)};
    
  },[error])


  const changeHendler = event =>{
    setCard({...card, [event.target.name]: event.target.value})
  }
  
 

  const addHendler = async () => {
    try{
      
      const data = await request('/api/card/add-card', 'POST', {...card})
      props.updateData(false)
      window.location.reload();
    } catch(e){}

  }



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Новий об'єкт моніторингу
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Form.Group className="mb-3" >
          <Form.Label>Назва об'єкту</Form.Label>
          <Form.Control name="title" type="text" placeholder="Сайт ЗСУ" onChange={changeHendler} />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Посилання на об'єкт</Form.Label>
          <Form.Control name="link" type="text" placeholder="https://example.com" onChange={changeHendler} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Ідентифікатор №1</Form.Label>
          <Form.Control name="id1" type="text" placeholder='id="example1"' onChange={changeHendler} />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Ідентифікатор №2</Form.Label>
          <Form.Control name="id2" type="text" placeholder='id="example2"' onChange={changeHendler} />
        </Form.Group>
        <Button variant="primary" type="button" onClick={addHendler}>
          Додати
        </Button>
      </Form>
      </Modal.Body>
    </Modal>
  );
}

export default FormAddObj;