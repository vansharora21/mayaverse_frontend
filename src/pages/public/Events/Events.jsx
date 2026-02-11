import React, { useState, useEffect, useRef } from 'react';
import { getEvents, registerForEvent } from '../../../services/mockData';
import { useAuth } from '../../../hooks/useAuth';
import { formatDate, formatCurrency } from '../../../utils/helpers';
import { EVENT_CATEGORIES } from '../../../constants/config';
import { useGSAP } from '../../../animations/hooks/useGSAP';
import { setupEventsAnimations } from '../../../animations/scenes/EventsAnimations';
import styles from './Events.module.css';

/**
 * MAYAVERSE - Events Page (Trials Arena)
 * 
 * Displays all available events with filtering and registration.
 * 
 * ANIMATIONS:
 * - Arena entrance (hero section)
 * - Event cards pulse subtly
 * - Category-based hover glow
 * - Cards entrance on scroll
 * - Filter button ripple effects
 */

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, hasRegisteredForEvent } = useAuth();

  // Refs for animated elements
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const filterButtonsRef = useRef(null);

  // Initialize animations
  useGSAP(() => {
    if (loading) return;
    if (!heroTitleRef.current) return;

    const cleanup = setupEventsAnimations({
      heroTitleRef,
      heroSubtitleRef,
      cardsContainerRef,
      filterButtonsRef,
    });
    return cleanup;
  }, [filteredEvents, loading]); // Re-run when events change or loading finishes

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
      loadEvents(); // Reload to update participant count
    } catch (error) {
      alert(error.message || 'Failed to register for event');
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading events...</div>;
  }

  return (
    <div className={styles.eventsPage}>
      {/* Hero Section - Trials Arena */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 ref={heroTitleRef} className={styles.pageTitle}>Events</h1>
          <p ref={heroSubtitleRef} className={styles.pageSubtitle}>
            Explore our exciting lineup of technical, cultural, and gaming events
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className={styles.eventsSection}>
        <div className={styles.container}>
          {/* Category Filter */}
          <div ref={filterButtonsRef} className={styles.filterBar}>
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

          {/* Events Grid */}
          <div ref={cardsContainerRef} className={styles.eventsGrid}>
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className={styles.eventCard}
                data-event-card
                data-event-category={event.category}
              >
                <div className={styles.eventHeader}>
                  <span className={styles.eventCategory}>{event.category}</span>
                  <span className={styles.eventStatus}>{event.status}</span>
                </div>

                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDescription}>{event.description}</p>

                <div className={styles.eventDetails}>
                  <div className={styles.eventDetail}>
                    <strong>📅 Date:</strong> {formatDate(event.date)}
                  </div>
                  <div className={styles.eventDetail}>
                    <strong>🕐 Time:</strong> {event.time}
                  </div>
                  <div className={styles.eventDetail}>
                    <strong>📍 Venue:</strong> {event.venue}
                  </div>
                  <div className={styles.eventDetail}>
                    <strong>💰 Fee:</strong> {formatCurrency(event.registrationFee, 'INR')}
                  </div>
                  <div className={styles.eventDetail}>
                    <strong>👥 Participants:</strong> {event.currentParticipants}/{event.maxParticipants}
                  </div>
                </div>

                {event.prizes && event.prizes.length > 0 && (
                  <div className={styles.prizes}>
                    <strong>🏆 Prizes:</strong> {event.prizes.join(', ')}
                  </div>
                )}

                <button
                  className={styles.registerButton}
                  onClick={() => handleRegister(event.id)}
                  disabled={hasRegisteredForEvent(event.id) || event.currentParticipants >= event.maxParticipants}
                >
                  {hasRegisteredForEvent(event.id) ? 'Already Registered' :
                    event.currentParticipants >= event.maxParticipants ? 'Full' : 'Register Now'}
                </button>
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