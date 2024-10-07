import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const animateHeroSection = (
    heroRef: RefObject<HTMLDivElement>,
    textRef: RefObject<HTMLDivElement>,
    buttonRef: RefObject<HTMLDivElement>,
    whiteBgRef: RefObject<HTMLDivElement>,
    newTextRef: RefObject<HTMLDivElement>,
    hasScrolled: boolean,
    setHasScrolled: (value: boolean) => void
) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(heroRef.current, { scale: 1, duration: 1, ease: 'power3.out' })
        .to(whiteBgRef.current, { opacity: 1, duration: 1 }, '-=1');

    tl.fromTo(
        newTextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    ScrollTrigger.create({
        start: 0,
        onUpdate: (self) => {
            if (!hasScrolled && self.scroll() > 0) {
                tl.play();
                setHasScrolled(true);
            }
        },
    });
};
