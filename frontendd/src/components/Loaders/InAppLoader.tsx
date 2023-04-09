import Image from "next/image"


const InAppLoader = () => {
    return (
        <div className='flex items-center justify-center h-full bg-lightGrey dark:bg-veryDarkGrey'>
            <Image src="/assets/loading_gif2.gif" alt='' height={25} width={25} />
        </div>
    )
}

export default InAppLoader