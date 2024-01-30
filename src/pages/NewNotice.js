import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import clients from '../clients';

export const NewNotice = () => {
    
    useEffect(()=> {
        document.title = "Nouvel Avis";
    }, []);

    const [clientsList, setClients] = useState(clients);
    const [avis, setAvis] = useState({
        client: "",
        date: Date.now(),
        Observation: "Pas d'observation",
    });
    const [isNewClient, setIsNewClient] = useState(false);
    const [newClient, setNewClient] = useState("");

    const clientsOptions = clientsList.map((client, index) => {
        return(
            <option value={index}>{client}</option>
        )
    })

    const handleChange = (e)=> {
        const id = e.target.value;
        if (id === "new"){
            setIsNewClient(true);
        } else {
            setIsNewClient(false);
            setAvis(prevState => ({
                ...prevState,
                client: clients[id]
            }));
        }
    }

    const validate = ()=>{
        const secure = prompt("Avez vous terminé ? O/N");
        if (secure === "O" || secure === "o"){

        }
    }

    return (
        <Layout>
            <h1>Avis de passage</h1>
            <div >
                <form action="" className='container'>
                    <div className='container'>
                        <div className='container'>
                            <div className='field'>
                                <label htmlFor="">Nom du client / Entreprise :</label>
                                <select name="" id="" onChange={(e)=>handleChange(e)}>
                                    <option value="">Choisir un client</option>
                                    <option value="new">Nouveau client</option>
                                    {clientsOptions}
                                </select>
                            </div>
                            { isNewClient ? 
                            <div className='field'>
                                <label htmlFor="">Saisir le nom du nouveau client / entreprise :</label>
                                <input type="text" value={newClient} onChange={(e)=>setNewClient(e.target.value)} />
                            </div> 
                            : "" }
                        </div>
                        <div className='field'>
                            <label htmlFor="">Date d'intervention :</label>
                            <input type="date" />
                        </div>
                    </div>
                    <div className='field'>
                        <label htmlFor="">Observations :</label>
                        <textarea name="" id="" cols="30" rows="10" placeholder="Pas d'obeservations."></textarea>
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
                    <button onClick={()=>validate()}>Enregistrer</button>
                </form>
            </div>
        </Layout>
    )
}

export default NewNotice
