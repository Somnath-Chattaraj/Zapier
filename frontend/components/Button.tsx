import React from 'react'

export const PrimaryButton = ({children, onClick, size = "small"} : {
    children: React.ReactNode,
    onClick: () => void,
    size?: "small" | "medium" | "large"
}) => {
  return (
    <button onClick={onClick} className=" bg-orange-600 hover:bg-orange-800 text-white rounded-full px-7 mx-3 py-3"> {children} </button>
  )
}

export const SecondaryButton = ({children, onClick, size = "small"} : {
  children: React.ReactNode,
  onClick: () => void,
  size?: "small" | "medium" | "large"
}) => {
  return (
    <button onClick={onClick} className=" bg-transparent hover:bg-gray-200 border border-black text-black font-semibold rounded-full px-10 mx-3 py-2"> {children} </button>
  )
}
