import React from 'react';
import { BiLeftArrowAlt } from "react-icons/bi";

const names = {
    BiLeftArrowAlt
}

const Icon = ({name, size, className, action}) => {
    const iconType = names[name];
    return (
    <iconType size={size} className={className} onClick={action} />
  )
}

export default Icon