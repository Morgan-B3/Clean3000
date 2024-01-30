import React from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon';

const Header = ({isHome = false}) => {
    const navigate = useNavigate();

  return (
    <header>
        {!isHome ? <Icon name="BiLeftArrowAlt" size="8rem" className="back-button" action={() => navigate('/')} /> : ""}
        <div>
            <img src={require("../img/logo-clean3000-transparent.png")} alt="" onClick={()=>navigate('/')} />
        </div>
    </header>
  )
}

export default Header