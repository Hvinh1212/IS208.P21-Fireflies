import React from "react"

interface ButtonProps {
    text: string
}

const Button: React.FC<ButtonProps> = ({ text }) => {
    return (
        <button className="px-3 py-1 bg-green-600 text-white rounded-full cursor-pointer text-sm"
        >
            {text}
        </button>
    )
}

export default Button;