"use client";

import { useEffect } from 'react';
import HeroSection from '../components/Herosection';
import Philosophysection from '../components/Philosophysection';
import CategorySection from '../components/Categorypage';

export default function Home() {

  useEffect(() => {
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (!href) return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleClick);
    });

    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback);

    const itemsToObserve = document.querySelectorAll('.collection-item');
    itemsToObserve.forEach(item => {
      observer.observe(item);
    });

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleClick);
      });
      observer.disconnect();
    };

  }, []);

  return (
    <>
      <HeroSection />

      <div className="break"></div>
      <CategorySection />

      <div className="break"></div>
      <Philosophysection />
    </>
  );
}