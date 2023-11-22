import React, { useState, useEffect } from "react";
import leftArrow from '../imgs/leftArrow.svg';
import rightArrow from '../imgs/rightArrow.svg';

const ICON_DIMN = 80;

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
    return (
        <section className='mngo-h-full mngo-flex mngo-items-center mngo-justify-between mngo-w-10/12 mngo-m-auto'>
            <img src={leftArrow} alt="left arrow"
                className={`
                    mngo-cursor-pointer mngo-transition mngo-duration-300 hover:-mngo-translate-x-4
                    ${disableLeft ? "mngo-opacity-50 mngo-pointer-events-none" : ""}
                `}
                width={ICON_DIMN} height={ICON_DIMN}
                onClick={onLeftClick}
            />

            <>{children}</>

            <img src={rightArrow} alt="right arrow"
                className={`
                    mngo-cursor-pointer mngo-transition mngo-duration-300 hover:mngo-translate-x-4
                    ${disableRight ? "mngo-opacity-50 mngo-pointer-events-none" : ""}
                `}
                width={ICON_DIMN} height={ICON_DIMN}
                onClick={onRightClick}
            />
        </section>
    )
}