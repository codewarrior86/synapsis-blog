import React from "react";


export const STYLES = {
    primarySolid: "btn--primary--solid",
    secondarySolid: "btn--secondary--solid",
    primaryOutline: "btn--primary--outline",
    secondaryOutline: "btn--secondary--outline",
    btnDisabled: "btn--disabled",
    warningSolid: "btn--warning--solid",
    alertSolid: "btn--alert--solid",
};

export const SIZES = {
    small: "btn--small",
    medium: "btn--medium",
    large: "btn--large",
};

export const IMGSIZE = [
    "img-none",
    "img-small",
    "img-medium",
    "img-large"
];

export const WIDTH = [
    "w-20p",
    "w-30p",
    "w-100px",
    "w-150px"
];

export const HEIGHT = [
    "h-20p",
    "h-30p",
    "h-20px",
    "h-30px",
    "h-40px",
    "h-50px",
];

const CustomButton = React.forwardRef((
    { children,
        customStyle,
        img,
        type,
        onClick,
        buttonStyle,
        buttonSize,
        imgSize,
        width,
        height,
        isDisabled, },
    ref) => {

    const checkButtonStyle = buttonStyle ? buttonStyle : Object.values(STYLES)[0];
    const checkButtonSize = buttonSize ? buttonSize : Object.values(SIZES)[1];
    const checkImgSize = IMGSIZE.includes(imgSize) ? imgSize : IMGSIZE[0];
    const checkWidth = WIDTH.includes(width) ? width : WIDTH[0];
    const checkHeight = HEIGHT.includes(height) ? height : HEIGHT[0];

    return (
        <button
            ref={ref}
            className={`button ${customStyle} ${checkButtonStyle} ${checkButtonSize} ${checkHeight} ${checkWidth}`}
            onClick={onClick}
            type={type || "button"}
            disabled={isDisabled}
        >
            <img src={img} className={`img-button ${checkImgSize}`}></img>
            {children}
        </button>
    )
});

export default CustomButton;