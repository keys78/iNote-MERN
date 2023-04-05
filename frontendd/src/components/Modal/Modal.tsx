import { backdropVariant, modalVariant } from '@/utils/animation';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'

interface props {
    showModal: boolean,
    general?: string
    children: any
    setShowModal: (val: boolean) => void;
}

const Modal = ({ showModal, setShowModal, general, children }: props) => {
    const modalRef = useRef(null)

    const handleClickOutside = () => { setShowModal(!showModal) }
    useOnClickOutside(modalRef, handleClickOutside)

    return (
        <AnimatePresence>
            {
                showModal ? (
                    <motion.div
                        variants={backdropVariant}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className='fixed w-full h-[100vh] left-0 top-0 fix-marg flex px-4 items-center justify-center z-50 bg-modalBackgroundLayer'>
                        <motion.div
                            ref={modalRef}
                            variants={modalVariant}
                            className={`${general} max-w-[480px] w-full bg-white rounded-md text-black sm:p-8 p-4 overflow-auto`} >
                            {children}
                        </motion.div>
                    </motion.div>
                ) : null}
        </AnimatePresence>
    )
}

export default Modal;

