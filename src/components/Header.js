import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiLeftArrowAlt } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobile } from '../slices';

const Header = ({isHome = false}) => {

  const dispatch = useDispatch();
  const isMobile = useSelector(state=>state.data.isMobile);

  const handleResize = () => {
    if (window.innerWidth < 720) {
      dispatch(setIsMobile(true));
    } else {
      dispatch(setIsMobile(false));
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  },[])

  const navigate = useNavigate();
  console.log(window.innerWidth);
  return (
    <header>

      {!isHome ? <BiLeftArrowAlt size="8rem" className="back-button" onClick={() => navigate('/')} /> : ""}
      <div>
        {!isHome ? !isMobile ? <img src={require("../img/logo-clean3000-transparent.png")} alt="" onClick={()=>navigate('/')} /> : <img className='logo-mini' src={require("../img/logo-clean3000-mini.png")} alt="" onClick={()=>navigate('/')} /> : <img src={require("../img/logo-clean3000-transparent.png")} alt="" onClick={()=>navigate('/')} />}
      </div>

    </header>
  )
}

export default Header