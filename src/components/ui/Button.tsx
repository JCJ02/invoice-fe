import React from 'react';

type ButtonProps = {
    children: any
    onClick?: any
}

const Button = ({ children, onClick }: ButtonProps) => {
    return (
        <button className="bg-[#D2232D] text-white text-xs md:text-md lg:text-lg py-1 px-2 lg:px-4 rounded-md" onClick={onClick}>{children}</button>
    )
}

export default Button
