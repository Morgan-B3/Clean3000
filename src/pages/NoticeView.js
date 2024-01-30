import { Layout } from 'antd'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const NoticeView = () => {

    const { id } = useParams();

    useEffect(()=> {
        document.title = `Avis n°${id}`;
    }, []);

    return (
        <Layout>
            <div>NoticeView</div>
        </Layout>
    )
}

export default NoticeView