import Button from "../shared/Button"

const EmptyBoard = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-lightGrey dark:bg-veryDarkGrey">
        <h2 className="heading-lg text-mediumGrey text-center">This board is empty. Create a new column to get started.</h2> <br />
        <Button text={"+ Add New Column"} padding={'py-3 px-4'} width={''} color={'text-white'} font_weight={'font-bold'} />

    </div>
  )
}
export default EmptyBoard
