import React, { useState, useEffect, useRef } from 'react';
import { getEvents, registerForEvent } from '../../../services/mockData';
import { useAuth } from '../../../hooks/useAuth';
import { formatDate, formatCurrency } from '../../../utils/helpers';
import { EVENT_CATEGORIES } from '../../../constants/config';
import RunestoneCard from '../../../components/events/RunestoneCard';
import styles from './Events.module.css';

/**
 * MAYAVERSE - Events Page (Trials Arena)
 * 
 * Displays events as cinematic 3D Runestone cards.
 */

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, hasRegisteredForEvent } = useAuth();

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [selectedCategory, events]);

  const loadEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.events);
      setFilteredEvents(response.events);
      setLoading(false);
    } catch (error) {
      console.error('Error loading events:', error);
      setLoading(false);
    }
  };

  const filterEvents = () => {
    if (selectedCategory === 'All') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === selectedCategory));
    }
  };

  const handleRegister = async (eventId) => {
    if (!isAuthenticated()) {
      alert('Please login to register for events');
      return;
    }

    try {
      await registerForEvent(user.id, eventId);
      alert('Successfully registered for event!');
      loadEvents();
    } catch (error) {
      alert(error.message || 'Failed to register for event');
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading events...</div>;
  }

  return (
    <div className={styles.eventsPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>The Trials Arena</h1>
          <p className={styles.pageSubtitle}>
            Unlock ancient runestones to reveal the challenges within
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className={styles.eventsSection}>
        <div className={styles.container}>
          {/* Category Filter */}
          <div className={styles.filterBar}>
            <button
              className={`${styles.filterButton} ${selectedCategory === 'All' ? styles.active : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All Events
            </button>
            {Object.values(EVENT_CATEGORIES).map(category => (
              <button
                key={category}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Events Grid — Runestone Cards */}
          <div className={styles.eventsGrid}>
            {filteredEvents.map(event => (
              <div key={event.id} className={styles.cardWrapper}>
                <RunestoneCard
                  event={{
                    id: event.id,
                    title: event.title,
                    category: event.category,
                    date: formatDate(event.date),
                    time: event.time,
                    venue: event.venue,
                    description: event.description,
                  }}
                  onRegister={handleRegister}
                />
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className={styles.noEvents}>
              <p>No events found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
