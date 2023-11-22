import React, { useState, useEffect } from "react";
import leftArrow from '../imgs/leftArrow.svg';
import rightArrow from '../imgs/rightArrow.svg';

export default function Carousel({
    disableLeft = false,
    disableRight = false,
    onLeftClick,
    onRightClick,
    children,
}: {
    disableLeft?: boolean
    disableRight?: boolean
    onLeftClick?: () => void,
    onRightClick?: () => void,
    children: React.ReactNode
}) {
    const [iconDimn, setIconDimn] = useState<number>(80);

    useEffect(() => {
        const width = window.innerWidth;
        if (width < 768) setIconDimn(40);
    }, []);

    return (
        <section className='mngo-h-full mngo-flex mngo-items-center mngo-justify-between mngo-w-10/12 mngo-m-auto'>
            <img src={leftArrow} alt="left arrow"
                className={`
                    mngo-cursor-pointer mngo-transition mngo-duration-300 hover:-mngo-translate-x-4
                    ${disableLeft ? "mngo-opacity-50 mngo-pointer-events-none" : ""}
                `}
                width={iconDimn} height={iconDimn}
                onClick={onLeftClick}
            />

            <>{children}</>

            <img src={rightArrow} alt="right arrow"
                className={`
                    mngo-cursor-pointer mngo-transition mngo-duration-300 hover:mngo-translate-x-4
                    ${disableRight ? "mngo-opacity-50 mngo-pointer-events-none" : ""}
                `}
                width={iconDimn} height={iconDimn}
                onClick={onRightClick}
            />
        </section>
    )
}