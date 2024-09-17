export const PrimaryButton = ({children, onClick, size = "small"} : {
    children: React.ReactNode,
    onClick: () => void,
    size?: "small" | "medium" | "large"
}) => {
  return (
    <button onClick={onClick} className=" bg-orange-600 hover:bg-orange-800 text-white rounded-full px-7 mx-3 py-3"> {children} </button>
  )
}
