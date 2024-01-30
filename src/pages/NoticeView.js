import Layout from '../components/Layout'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaMinusCircle } from "react-icons/fa";


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
                <div className='flex-50'>
                    <p>Nom du client / Entreprise :</p>
                    <b>{notice.client}</b>
                    <p>Date d'intervention :</p>
                    <b>{notice.date}</b>
                </div>


                <div className=''>
                    <p>Observations :</p>
                    <b>{notice.observation}</b>
                </div>


                <div className='flex-evenly'>
                    <div className='text-center'>
                        <p>Signature du technicien :</p>
                        <div className='sign'></div>
                    </div>
                    <div className='text-center'>
                        <p>Signature du client /<br/>Cachet de l'entrprise :</p>
                        <div className='sign'></div>
                    </div>
                </div>
            </div>

            <button className='delete responsive-btn'>Supprimer<FaMinusCircle size={40} /></button>
        </Layout>
    )
}

export default NoticeView