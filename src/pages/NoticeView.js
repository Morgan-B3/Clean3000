import { Layout } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const NoticeView = () => {

    const { id } = useParams();

    useEffect(()=> {
        document.title = `Avis n°${id}`;
    }, []);

    const notices = useSelector(state => state.data.notices);
    const notice = notices.find((notice) => notice.id === id);

    console.log(notice);
    console.log(id);

    return (
        <Layout>
            {/* <div>{notice.client}</div> */}
        </Layout>
    )
}

export default NoticeView