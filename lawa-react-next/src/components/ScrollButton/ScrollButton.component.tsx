import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import cn from 'classnames'
import Image from 'next/image';

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        handleScroll();

    })

    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        setScrollPosition(scrollTop);
        if (scrollTop > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button className={cn(styles.button, {
            [styles.buttonHidden]: !isVisible,
            [styles.buttonVisible]: isVisible,
        })} onClick={scrollToTop}>
            <Image src='/arrowdown.svg' width='45' height='45' alt='arrow' />
        </button>
    );
};
