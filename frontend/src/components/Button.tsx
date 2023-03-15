
interface IProps {
    text: string
}

const Button = ({ text }:IProps) => {
  return (
    <button className="gen-btn-class px-6 py-1 rounded-[5px] text-white bg-mainPurple">
        { text }
    </button>
  )
}

export default Button