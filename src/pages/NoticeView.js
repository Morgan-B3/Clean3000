import Layout from '../components/Layout'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaMinusCircle } from "react-icons/fa";
import { Modal } from 'antd';
import { removeNotice } from '../slices';


const NoticeView = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        document.title = `Avis n°${id}`;
    }, []);

    const notices = useSelector(state => state.data.notices);
    const notice = notices.find((notice) => notice.id == id);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const handleClick = () => {
        dispatch(removeNotice(notice.id));
        navigate('/');
    }

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

            <button className='delete ' onClick={showModal}>Supprimer<FaMinusCircle size={40} /></button>
            <Modal title="Supprimer cet élément ?" open={isModalOpen} onCancel={handleCancel}footer={null} centered >
                <div className='modal-content'>
                    <button className='delete' onClick={()=>handleClick()}>Oui</button>
                    <button className='blue' onClick={()=>handleCancel()} >Non</button>
                </div>
            </Modal>
        </Layout>
    )
}

export default NoticeView