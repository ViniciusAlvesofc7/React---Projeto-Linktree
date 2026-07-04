import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = (props:InputProps) => {
  return (
    <input
        className="border-0 h-9 rounded-md outline-none px-1 bg-white text-black placeholder:text-gray-500 placeholder:text-sm font-semibold"
        {...props}
    />
      
    
  )
}

export default Input
