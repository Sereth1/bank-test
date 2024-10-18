'use client';
import { animateHeroSection } from '@/gsap/animateHeroSection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import Button from '../common/Button';
import { useModal } from '@/context/ModalProvider';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);
    const whiteBgRef = useRef(null);
    const newTextRef = useRef(null);
    const { openModal } = useModal();
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        animateHeroSection(heroRef, textRef, buttonRef, whiteBgRef, newTextRef, hasScrolled, setHasScrolled);
    }, [hasScrolled]);

    return (
        <section
            ref={heroRef}
            className="relative h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{ backgroundImage: 'url(/backgrounds/introImage.jpg)' }}
        >

            <div
                ref={whiteBgRef}
                className="absolute inset-0 bg-white opacity-0"
            ></div>


            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

                <div className={`min-h-[200px] transition-all duration-500 ${hasScrolled ? 'opacity-0' : 'opacity-100'}`}>
                    {!hasScrolled && (
                        <>
                            <h1 ref={textRef} className="text-5xl md:text-7xl font-bold mb-4">
                                CHANGE THE WAY YOU MONEY
                            </h1>
                            <p className="text-lg md:text-2xl mb-6">
                                For those who want more from their money — there’s StarBank. Sign up for free, in a tap.
                            </p>
                        </>
                    )}
                </div>


                {hasScrolled && (
                    <Button label="Sign up" variant="primary" onClick={() => openModal('register')} />
                )}
            </div>

            {/* New Text */}
            <div
                ref={newTextRef}
                className="absolute inset-0 flex items-center justify-center opacity-0"
            >
                <h2 className="text-4xl text-center font-semibold text-gray-800">Welcome to Your New Financial Journey</h2>
            </div>
        </section>
    );
};

export default HeroSection;
