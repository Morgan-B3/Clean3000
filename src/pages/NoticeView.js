import Layout from '../components/Layout'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const NoticeView = () => {

    const { id } = useParams();

    useEffect(()=> {
        document.title = `Avis n°${id}`;
    }, []);

    const notices = useSelector(state => state.data.notices);
    const notice = notices.find((notice) => notice.id == id);

    console.log(notice);
    console.log(id);

    return (
        <Layout>
            <h1>Avis de passage n°{id}</h1>
                    <div className='container'>
                        <div className='container'>

                            <div className='field'>
                                <label htmlFor="">Nom du client / Entreprise :</label>
                                <p>{notice.client}</p>
                            </div>

                        </div>

                        <div className='field'>
                            <label htmlFor="">Date d'intervention :</label>
                            <p>{notice.date}</p>
                        </div>
                    </div>


                    <div className='field'>
                        <label htmlFor="">Observations :</label>
                        <p>{notice.observation}</p>
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

        </Layout>
    )
}

export default NoticeView