import React, { useState, useEffect, useRef } from 'react';
import { getMerchandise } from '../../../services/mockData';
import { formatCurrency } from '../../../utils/helpers';
import { MERCH_CATEGORIES } from '../../../constants/config';
import { useGSAP } from '../../../animations/hooks/useGSAP';
import styles from './Merchandise.module.css';

/**
 * MAYAVERSE - Merchandise Page (Rift Market)
 * 
 * Browse and purchase exclusive techfest merchandise.
 * 
 * ANIMATIONS:
 * - Rift-style page entry
 * - Red lightning flashes (CSS + GSAP)
 * - Product portal pulsing
 * 
 * To enable full animations, implement MerchandiseAnimations.js from the guide
 */

const Merchandise = () => {
  const [merchandise, setMerchandise] = useState([]);
  const [filteredMerch, setFilteredMerch] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Refs for animated elements
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const riftOverlayRef = useRef(null);
  const containerRef = useRef(null);
  const productsRef = useRef(null);

  // Rift entry animation
  useGSAP(() => {
    if (!riftOverlayRef.current || !heroTitleRef.current) return;

    const { gsap } = window;
    if (!gsap) return;

    const tl = gsap.timeline();

    // Rift opens
    tl.from(riftOverlayRef.current, {
      scaleX: 0,
      duration: 1.5,
      ease: 'power4.inOut',
    })
    .to(riftOverlayRef.current, {
      opacity: 0,
      duration: 0.5,
    })
    // Hero reveals
    .from(heroTitleRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: 'power2.out',
    }, '-=0.5')
    .from(heroSubtitleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.6');

    return () => tl.kill();
  }, []);

  // Lightning flash effect
  useGSAP(() => {
    if (!containerRef.current) return;

    const { gsap } = window;
    if (!gsap) return;

    const flash = () => {
      gsap.to(containerRef.current, {
        boxShadow: 'inset 0 0 100px rgba(239, 68, 68, 0.8)',
        duration: 0.05,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.delayedCall(3 + Math.random() * 5, flash);
        },
      });
    };

    const timer = setTimeout(flash, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    loadMerchandise();
  }, []);

  useEffect(() => {
    filterMerchandise();
  }, [selectedCategory, merchandise]);

  const loadMerchandise = async () => {
    try {
      const response = await getMerchandise();
      setMerchandise(response.merchandise);
      setFilteredMerch(response.merchandise);
      setLoading(false);
    } catch (error) {
      console.error('Error loading merchandise:', error);
      setLoading(false);
    }
  };

  const filterMerchandise = () => {
    if (selectedCategory === 'All') {
      setFilteredMerch(merchandise);
    } else {
      setFilteredMerch(merchandise.filter(item => item.category === selectedCategory));
    }
  };

  if (loading) return <div className={styles.loading}>Loading merchandise...</div>;

  return (
    <div className={styles.merchPage} ref={containerRef}>
      {/* Rift Overlay */}
      <div ref={riftOverlayRef} className={styles.riftOverlay} />

      {/* Hero Section - Rift Market */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 ref={heroTitleRef} className={styles.pageTitle}>Merchandise</h1>
          <p ref={heroSubtitleRef} className={styles.pageSubtitle}>
            Get exclusive techfest merchandise and collectibles
          </p>
        </div>
      </section>

      {/* Merchandise Section */}
      <section className={styles.merchSection}>
        <div className={styles.container}>
          {/* Category Filter */}
          <div className={styles.filterBar}>
            <button
              className={`${styles.filterButton} ${selectedCategory === 'All' ? styles.active : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All Items
            </button>
            {Object.values(MERCH_CATEGORIES).map(category => (
              <button
                key={category}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div ref={productsRef} className={styles.merchGrid}>
            {filteredMerch.map(item => (
              <div 
                key={item.id} 
                className={styles.merchCard}
                data-merch-card
              >
                <div className={styles.merchImage}>
                  <div className={styles.imagePlaceholder}>{item.name[0]}</div>
                  {item.stock < 20 && (
                    <span className={styles.lowStockBadge}>Low Stock</span>
                  )}
                </div>
                <div className={styles.merchInfo}>
                  <span className={styles.category}>{item.category}</span>
                  <h3 className={styles.merchName}>{item.name}</h3>
                  <p className={styles.merchDescription}>{item.description}</p>
                  <div className={styles.merchDetails}>
                    <div className={styles.price}>{formatCurrency(item.price, 'INR')}</div>
                    <div className={styles.stock}>Stock: {item.stock}</div>
                  </div>
                  <button className={styles.buyButton} disabled={item.stock === 0}>
                    {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Merchandise;