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

    const [isNewClient, setIsNewClient] = useState(false);
    const [notice, setNotice] = useState({
        id: Date.now(),
        client: "",
        date: formatDate(),
        observation: "",
    });

    const clientsOptions = clients.map((client, index) => {
        return(
            <option key={index} value={index}>{client}</option>
        )
    })

    const handleChangeClient = (e)=> {
        const idClient = e.target.value;
        if (idClient === "new"){
            setIsNewClient(true);
        } else {
            setIsNewClient(false);
            setNotice({
                ...notice,
                client: clients[idClient],
            });
        }
    }

    const handleChangeNotice = (target)=>{
        setNotice({
            ...notice,
            [target.name]: target.value,
        })
    }    

    const validate = (e)=>{
        e.preventDefault();
        if(isNewClient){
            dispatch(addClient(notice.client));
        }
        dispatch(addNotice(notice))
        navigate(`/avis/${notice.id}`)
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
                                <input id='newClient' name='client' type="text" value={notice.client} onChange={(e)=>handleChangeNotice(e.target)} required />
                            </div> 
                            : "" }
                        </div>

                        <div className='field'>
                            <label htmlFor="date">Date d'intervention* :</label>
                            <input id='date' name='date' type="date" value={notice.date} onChange={(e)=>handleChangeNotice(e.target)} required />
                        </div>
                    </div>

                    <div className='field'>
                        <label htmlFor="observation">Observations :</label>
                        <textarea name="observation" id="observation" cols="30" rows="10" placeholder="Pas d'obeservations." value={notice.observation} onChange={(e)=>handleChangeNotice(e.target)}></textarea>
                    </div>

                    <div className='form-bottom'>
                        <div className='flex-evenly'>
                            <div className='field text-center'>
                                <label htmlFor="signature1">Signature du technicien* :
                                </label>
                                <div className='sign' id='signature1' name='signature1'></div>
                            </div>
                            <div className='field text-center'>
                                <label htmlFor="signature2">Signature du client /<br/>Cachet de l'entrprise* :</label>
                                <div className='sign' id='signature2' name='signature2'></div>
                            </div>
                        </div>

                        <button className='add' type="submit">Enrgistrer<FaPlusCircle className='icon' size={40} /></button>
                    </div>

                </form>
            </div>
        </Layout>
    )
}

export default NewNotice
