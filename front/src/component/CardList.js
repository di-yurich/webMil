import React, { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import {useHttp} from '../hooks/http.hook';
import axios from "axios"


function CardList(){
    const {request, loading} = useHttp()
    const [loadCard, setLoadCard] = useState([])
    
    const [html, setHtml] = useState()
    
    const getCard = useCallback(async () =>{
        try{
            const fetched = await request('/api/card/get-card', 'GET', null, {} )
            setLoadCard(fetched)
        }catch(e){
            console.log('getCard error')
        }
    }, [request])
    
    useEffect(()=>{  
        getCard()
    }, [getCard])

  
    return(
        <div className="cardList">

            {loadCard.map((el, key)=>{
                return <Card 
                    key={el._id}
                    id={el._id}
                    title={el.title}
                    link={el.link}
                    id1={el.id1}
                    id2={el.id2}
                    />
            })
            }
        </div>
    )
}

export default CardList;