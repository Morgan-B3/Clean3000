import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import { RiArrowRightSLine } from "react-icons/ri";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



const Home = () => {

    useEffect(()=> {
        document.title = `clean3000`;
    }, []);

    const navigate = useNavigate();

    const notices = useSelector(state => state.data.notices);

    const noticesList = notices.map((notice, index) => {
        return (
            <span key={index} className='noticeItem' onClick={()=>navigate(`/avis/${notice.id}`)} >
                <div>
                    <p>Avis n°{notice.id}</p>
                    <p>-</p>
                    <p>{notice.client}</p>
                    <p>-</p>
                    <p>{notice.date}</p>
                </div>
                <RiArrowRightSLine size={35} color='white' />
            </span>
        )
    })

    return (
        <Layout isHome={true}>
            <h1>Récapitulatif</h1>
            <button className='add ' onClick={()=>navigate(`/nouvel-avis`)}>Nouvel avis<FaPlusCircle className='icon' size={40} /></button>
            <section className='noticeList'>
                {notices.length ? noticesList : <span className='empty'>Aucun avis pour le moment</span>}
            </section>
        </Layout>
    )
}

export default Home