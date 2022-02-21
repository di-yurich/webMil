import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import FormAddObj from './FormAddObj';
import plus from '../pictures/plus.png';
import mail from '../pictures/mail.png';
import FormMail from "./FormMail";


function Header(){
    const [modalShowAdd, setModalShowAdd] = useState(false);

    const updateData = (value) => {
        setModalShowAdd(value)
     }


    return(
        <header>
            <h2>Defacement Checked</h2>
            <div>
                <Button className="buttonAdd" onClick={(e) => {
                        e.preventDefault();
                        window.location.href='/send-mail';
                        }}>
                    <img src={mail}/>
                </Button>

                <Button className="buttonAdd" onClick={() => setModalShowAdd(true)}>
                    <img src={plus}/>
                </Button>

            </div>
            

            <FormAddObj
                show={modalShowAdd}
                onHide={() => setModalShowAdd(false)}
                updateData={updateData}
            />
        </header>
    )
}

export default Header;