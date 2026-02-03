import React, { useState, useEffect } from 'react';
import { getEvents, registerForEvent } from '../../../services/mockData';
import { useAuth } from '../../../hooks/useAuth';
import { formatDate, formatCurrency } from '../../../utils/helpers';
import { EVENT_CATEGORIES } from '../../../constants/config';
import styles from './Events.module.css';

/**
 * MAYAVERSE - Events Page
 * 
 * Displays all available events with filtering and registration.
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
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Events</h1>
          <p className={styles.pageSubtitle}>
            Explore our exciting lineup of technical, cultural, and gaming events
          </p>
        </div>
      </section>

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

          {/* Events Grid */}
          <div className={styles.eventsGrid}>
            {filteredEvents.map(event => (
              <div key={event.id} className={styles.eventCard}>
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