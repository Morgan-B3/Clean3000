import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addClient, addNotice } from '../slices';
import { FaPlusCircle } from "react-icons/fa";

export const NewNotice = () => {
    
    useEffect(()=> {
        document.title = "Nouvel Avis";
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clients = useSelector(state=> state.data.clients);

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }

    const formatDate = (date = new Date()) =>{
        return[
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
          ].join('-');
    }

    const id = Date.now();
    const [isNewClient, setIsNewClient] = useState(false);
    const [newClient, setNewClient] = useState("");
    const [observation, setObservation] = useState("");
    const [date, setDate] = useState(formatDate());
    const [notice, setNotice] = useState({
        id,
        client: "",
        date,
        observation,
    });

    const clientsOptions = clients.map((client, index) => {
        return(
            <option key={index} value={index}>{client}</option>
        )
    })

    const handleChangeClient = (e)=> {
        const id = e.target.value;
        if (id === "new"){
            setIsNewClient(true);
        } else {
            setIsNewClient(false);
            setNotice(prevState =>({
                ...prevState,
                client: clients[id],
            }));
        }
    }

    const handleChangeNewClient = (value) => {
        setNewClient(value);
        setNotice(prevState =>({
            ...prevState,
            client: value,
        }));
    }

    const handleChangeDate = (value)=>{
        setNotice(prevState =>({
            ...prevState,
            date: value,
        }))
    }

    const handleChangeObservation = (value) =>{
        setNotice(prevState=>({
            ...prevState,
            observation: value,
        }))
    }


    const redirect = ()=>{
        dispatch(addNotice(notice))
        navigate(`/avis/${notice.id}`)
    }

    const validate = (e)=>{
        e.preventDefault();
        if(isNewClient){
            setNotice(prevState=>({
                ...prevState,
                client: newClient,
            }))
            dispatch(addClient(newClient));
        }
        setNotice({
            id,
            date,
            observation: observation || "Pas d'observations.",
        })

        console.log(notice);
        redirect();
    }


    return (
        <Layout>
            <h1>Avis de passage</h1>
            <div >
                <form action="" className='container' onSubmit={(e)=>validate(e)}>
                    <div className='container responsive-container'>
                        <div className='container'>

                            <div className='field'>
                                <label htmlFor="client">Nom du client / Entreprise* :</label>
                                <select name="client" id="client" onChange={(e)=>handleChangeClient(e)} required >
                                    <option value="">Choisir un client</option>
                                    <option className="add" value="new">Nouveau client</option>
                                    {clientsOptions}
                                </select>
                            </div>


                            { isNewClient ? 
                            <div className='field'>
                                <label htmlFor="newClient">Saisir le nom du nouveau client / entreprise* :</label>
                                <input id='newClient' name='newClient' type="text" value={newClient} onChange={(e)=>handleChangeNewClient(e.target.value)} required />
                            </div> 
                            : "" }
                        </div>


                        <div className='field'>
                            <label htmlFor="date">Date d'intervention* :</label>
                            <input id='date' name='date' type="date" value={notice.date} onChange={(e)=>handleChangeDate(e.target.value)} required />
                        </div>
                    </div>


                    <div className='field'>
                        <label htmlFor="observations">Observations :</label>
                        <textarea name="observations" id="observations" cols="30" rows="10" placeholder="Pas d'obeservations." value={notice.observation} onChange={(e)=>handleChangeObservation(e.target.value)}></textarea>
                    </div>


                    <div className='flex-evenly'>
                        <div className='field text-center'>
                            <label htmlFor="signature1">Signature du technicien* :
                            </label>
                            <input id='signature1' name='signature1' className='sign' type="text" />
                        </div>
                        <div className='field text-center'>
                            <label htmlFor="signature2">Signature du client /<br/>Cachet de l'entrprise* :</label>
                            <input id='signature2' name='signature2' className='sign' type="text" />
                        </div>
                    </div>

                    <input className='btn add' type="submit" value="Enregistrer" />

                </form>
            </div>
        </Layout>
    )
}

export default NewNotice
