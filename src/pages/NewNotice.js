import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addClient, addNotice } from '../slices';

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
    const [newClient, setNewClient] = useState("");
    const [observation, setObservation] = useState("");
    const [date, setDate] = useState(formatDate());
    const [notice, setNotice] = useState({
        id: Date.now(),
        client: "",
        date,
        observation: observation || "Pas d'observations.",
    });

    const clientsOptions = clients.map((client, index) => {
        return(
            <option key={index} value={index}>{client}</option>
        )
    })

    const handleChange = (e)=> {
        const id = e.target.value;
        if (id === "new"){
            setIsNewClient(true);
        } else {
            setIsNewClient(false);
            setNotice(prevState => ({
                ...prevState,
                client: clients[id]
            }));
        }
    }

    const validate = (e)=>{
        e.preventDefault();
        const secure = prompt("Avez vous terminé ? O/N");
        if (secure === "O" || secure === "o"){
            if(isNewClient){
                dispatch(addClient(newClient));
                setNotice(prevState=>({
                    ...prevState,
                    client: newClient
                }))
            }
            dispatch(addNotice(notice))
            navigate(`/avis/${notice.id}`)
        }
    }

    return (
        <Layout>
            <h1>Avis de passage</h1>
            <div >
                <form action="" className='container' onSubmit={(e)=>validate(e)}>
                    <div className='container'>
                        <div className='container'>


                            <div className='field'>
                                <label htmlFor="">Nom du client / Entreprise :</label>
                                <select name="" id="" onChange={(e)=>handleChange(e)} required >
                                    <option value="">Choisir un client</option>
                                    <option value="new">Nouveau client</option>
                                    {clientsOptions}
                                </select>
                            </div>


                            { isNewClient ? 
                            <div className='field'>
                                <label htmlFor="">Saisir le nom du nouveau client / entreprise :</label>
                                <input type="text" value={newClient} onChange={(e)=>setNewClient(e.target.value)} required />
                            </div> 
                            : "" }
                        </div>


                        <div className='field'>
                            <label htmlFor="">Date d'intervention :</label>
                            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} required />
                        </div>
                    </div>


                    <div className='field'>
                        <label htmlFor="">Observations :</label>
                        <textarea name="" id="" cols="30" rows="10" placeholder="Pas d'obeservations." value={observation} onChange={(e)=>setObservation(e.target.value)}></textarea>
                    </div>


                    <div>
                        <div className='field'>
                            <label htmlFor="">Signature du technicien :
                            </label>
                            <input type="text" />
                        </div>
                        <div className='field'>
                            <label htmlFor="">Signature du client /<br/>Cachet de l'entrprise :</label>
                            <input type="text" />
                        </div>
                    </div>


                    <input type="submit" value="Enregistrer" />


                </form>
            </div>
        </Layout>
    )
}

export default NewNotice
