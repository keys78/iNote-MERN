export const menuVariations = {
    closed: {
        opacity: 0,
        y: -10,
        pointerEvents: 'none',
        transition: { duration: 0.2, delay: 0.2 }
    },
    open: {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        transition: { duration: 0.2 }
    },
};

export const backdropVariant = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
};

export const modalVariant = {
    hidden: {
        y: "-200px",
    },
    visible: {
        y: 0,
        transition: {
            duration: 0.25,
        },
    },
};

export const sideBarVariant = {
    hidden: {
        x: "-200px",
    },
    visible: {
        x: 0,
        transition: {
            duration: 0.25,
        },
    },
};