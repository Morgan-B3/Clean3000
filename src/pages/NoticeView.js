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
                    <div>
                        <b>Nom du client / Entreprise :</b>
                        <p>{notice.client}</p>
                    </div>
                    <div>
                        <b>Date d'intervention :</b>
                        <p>{notice.date}</p>
                    </div>
                </div>


                <div className=''>
                    <b>Observations :</b>
                    <p>{notice.observation ? notice.observation : "Pas d'observation particulière."}</p>
                </div>


                <div className='form-bottom' >
                    <div className='flex-evenly'>
                        <div className='text-center'>
                            <b>Signature du technicien :</b>
                            <div className='sign'></div>
                        </div>
                        <div className='text-center'>
                            <b>Signature du client /<br/>Cachet de l'entrprise :</b>
                            <div className='sign'></div>
                        </div>
                    </div>

                    <button className='delete ' onClick={showModal}>Supprimer<FaMinusCircle size={40} /></button>
                    <Modal title="Supprimer cet élément ?" open={isModalOpen} onCancel={handleCancel}footer={null} centered >
                        <div className='modal-content'>
                            <button className='delete' onClick={()=>handleClick()}>Oui</button>
                            <button className='blue' onClick={()=>handleCancel()} >Non</button>
                        </div>
                    </Modal>
                </div>
            </div>

        </Layout>
    )
}

export default NoticeView