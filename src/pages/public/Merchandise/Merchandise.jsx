import React, { useState, useEffect } from 'react';
import { getMerchandise } from '../../../services/mockData';
import { formatCurrency } from '../../../utils/helpers';
import { MERCH_CATEGORIES } from '../../../constants/config';
import styles from './Merchandise.module.css';

const Merchandise = () => {
  const [merchandise, setMerchandise] = useState([]);
  const [filteredMerch, setFilteredMerch] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

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
    <div className={styles.merchPage}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Merchandise</h1>
          <p className={styles.pageSubtitle}>
            Get exclusive techfest merchandise and collectibles
          </p>
        </div>
      </section>

      <section className={styles.merchSection}>
        <div className={styles.container}>
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

          <div className={styles.merchGrid}>
            {filteredMerch.map(item => (
              <div key={item.id} className={styles.merchCard}>
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