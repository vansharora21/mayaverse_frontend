import React, { useEffect, useRef } from 'react';
import styles from './ParallaxIntro.module.css';

const ParallaxIntro = ({ onStart, isFading }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.vx = Math.random() * 0.4 - 0.2;
                this.vy = Math.random() * 0.4 - 0.2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.y < 0 || this.x > canvas.width || this.y > canvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.fillStyle = 'rgba(0,242,254,0.3)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            resize();
            particles = [];
            for (let i = 0; i < 60; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div
            className={`${styles.parallaxContainer} ${isFading ? styles.fadeOut : ''}`}
            onClick={!isFading ? onStart : undefined}
        >
            <canvas ref={canvasRef} className={styles.canvasBg} />
            <div className={styles.titleContainer}>
                <h1 className={styles.parallaxTitle}>PARALLAX</h1>
            </div>
        </div>
    );
};

export default ParallaxIntro;
