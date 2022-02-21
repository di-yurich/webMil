import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

import dashboard from '../pictures/dashboard.png';



function HeaderSec(){
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
                        window.location.href='/';
                        }}>
                    <img src={dashboard}/>
                </Button>
            </div>
        
        </header>
    )
}

export default HeaderSec;