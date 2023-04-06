
interface IProps {
    text: string
}

const Button = ({ text }:IProps) => {
  return (
    <button className="gen-btn-class px-6 py-1 rounded-[5px] sm:text-[16px] text-[14px] text-white bg-mainPurple">
        { text }
    </button>
  )
}

export default Button