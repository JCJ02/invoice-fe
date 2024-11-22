"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';

const NotFound = () => {
    useEffect(() => {
        document.title = "404 Not Found - Invoice Application";
    }, []);
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-2 font-poppins px-1 h-screen w-full">
                <h1 className="font-bold text-5xl lg:text-8xl">404</h1>
                <p className="text-center text-xs lg:text-lg">Oops... The Link You Clicked may be broken or the page may have been removed. We're Sorry!</p>
            </div>
        </>
    )
}

export default NotFound;
