import React from 'react'

interface ButtonProps {
    padding?: string;
    width?: string;
    color?: string;
    font_weight?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    text?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({text, padding, width, color, font_weight, disabled, type, onClick} : ButtonProps) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={`bg-mainPurple ${padding} ${width} ${color} ${font_weight} rounded-full transition duration-200 text-base hover:bg-mainPurpleHover font-sans`}>
        {text}
    </button>
  )
}

export default Button;