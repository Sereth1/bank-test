import gsap from 'gsap';

export const animateModal = (
    isOpen: boolean,
    modalRef: React.RefObject<HTMLDivElement>,
    backdropRef: React.RefObject<HTMLDivElement>
) => {
    if (isOpen) {
        gsap.fromTo(
            modalRef.current,
            { y: -100, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
        );

        gsap.fromTo(
            backdropRef.current,
            { opacity: 0 },
            { opacity: 0.5, duration: 0.5, ease: 'power3.out' }
        );
    } else {
        gsap.to(modalRef.current, {
            y: -100,
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: 'power3.in',
        });

        gsap.to(backdropRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in',
        });
    }
};
