import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BiLeftArrowAlt } from "react-icons/bi";

const Header = ({isHome = false}) => {
    const navigate = useNavigate();

  return (
    <header>
        {!isHome ? <div className="back-button" onClick={() => navigate('/')} ><BiLeftArrowAlt size="8rem"/><span className='back'>Retour</span></div> : ""}
        <div>
            <img src={require("../img/logo-clean3000-transparent.png")} alt="" onClick={()=>navigate('/')} />
        </div>
    </header>
  )
}

export default Header