'use client';

import { useEffect, useRef } from 'react';
import type { AnimationItem, LottiePlayer } from 'lottie-web';

export default function HeroLottie() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animInstance = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    let isCancelled = false;

    import('lottie-web/build/player/lottie_light.js').then((lottieModule) => {
      if (isCancelled || !containerRef.current) return;
      const lottie = ((lottieModule as unknown as { default?: LottiePlayer }).default || lottieModule) as LottiePlayer;

      if (animInstance.current) {
        animInstance.current.destroy();
        animInstance.current = null;
      }
      containerRef.current.innerHTML = '';

      fetch('/togetherly/manage-money.json')
        .then((res) => res.json())
        .then((animationData) => {
          if (isCancelled || !containerRef.current) return;
          if (containerRef.current.querySelector('svg')) return;

          animInstance.current = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData,
          });
        })
        .catch((err) => {
          console.error('Failed to load Manage Money Lottie animation:', err);
        });
    });

    return () => {
      isCancelled = true;
      if (animInstance.current) {
        animInstance.current.destroy();
        animInstance.current = null;
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-[480px] lg:max-w-[520px] mx-auto flex items-center justify-center select-none [&_svg:not(:first-child)]:hidden">
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#2C7A73]/15 via-[#FAF6EF] to-[#F29B7F]/15 rounded-none blur-3xl pointer-events-none -z-10" />
      <div
        ref={containerRef}
        className="w-full h-auto aspect-square max-h-[460px] flex items-center justify-center relative z-10 pointer-events-none [&_svg:not(:first-child)]:hidden"
      />
    </div>
  );
}
