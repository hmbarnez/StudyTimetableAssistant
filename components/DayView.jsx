import React, { useRef, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

// Event data
const events = [
  { title: 'Meeting', startTime: 9.5, endTime: 10.5, eventColor: '#ACF4D1' },
  { title: 'Lunch', startTime: 11.5, endTime: 13, eventColor: '#ACE7F4' },
  { title: 'Gym', startTime: 13, endTime: 15, eventColor: '#ACF4D1' },
  { title: 'Project Work', startTime: 14, endTime: 16, eventColor: '#ACE7F4' },
  { title: 'Test Event', startTime: 13, endTime: 17, eventColor: '#ACF4D1' },
];

// Helper function to sort events by start time
const sortEvents = (events) => events.sort((a, b) => a.startTime - b.startTime);

// Helper function to find overlapping events
const findOverlaps = (sortedEvents) => {
  const eventSlots = Array(48).fill(null).map(() => []);
  sortedEvents.forEach((event, index) => {
    for (let i = event.startTime * 2; i < event.endTime * 2; i++) {
      eventSlots[i].push(index); // Track events for each half-hour slot
    }
  });
  return eventSlots;
};

// Combined helper function to convert 24-hour time to 12-hour time with AM/PM
const formatTime = (time, includeMinutes = false) => {
  const hour = Math.floor(time);
  const minutes = includeMinutes ? (time % 1 === 0.5 ? '30' : '00') : '';
  const period = hour < 12 ? 'AM' : 'PM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return includeMinutes ? `${formattedHour}:${minutes} ${period}` : `${formattedHour} ${period}`;
};

// Component to render a single event
const Event = ({ event, index, eventSlots }) => {
  const startSlot = event.startTime * 2;
  const endSlot = event.endTime * 2;
  const duration = endSlot - startSlot;
  const overlappingCount = Math.max(...eventSlots.slice(startSlot, endSlot).map(slot => slot.length));
  const widthPercentage = 80 / overlappingCount; 
  const overlapIndex = eventSlots[startSlot].indexOf(index); // Get the position of this event in the overlap

  return (
    <View
      key={index}
      style={[
        styles.eventBlock,
        {
          top: startSlot * 40, // Position based on start time (40px per half-hour)
          height: duration * 40, // Height based on duration
          width: `${widthPercentage}%`, // Divide width if there are overlaps
          left: `${overlapIndex * widthPercentage + 18}%`, // Position event based on overlap index and add margin
          backgroundColor: event.eventColor,
        },
      ]}
    >
      <Text style={styles.eventText}>{event.title}</Text>
      <Text style={styles.eventTime}>
        {formatTime(event.startTime, true)} - {formatTime(event.endTime, true)}
      </Text>
    </View>
  );
};

// Component to render the timeline with hours
const Timeline = () => (
  <>
    {Array.from({ length: 24 }, (_, i) => (
      <View key={i} style={styles.hourBlock}>
        <Text style={styles.hourText}>{formatTime(i)}</Text>
      </View>
    ))}
  </>
);

const DayView = () => {
  const sortedEvents = sortEvents(events);
  const eventSlots = findOverlaps(sortedEvents);

  // Reference to the ScrollView
  const scrollViewRef = useRef(null);

  // Scroll to the first event when the component mounts
  useEffect(() => {
    if (sortedEvents.length > 0) {
      const firstEventStart = sortedEvents[0].startTime * 80; // Calculate the position of the first event
      scrollViewRef.current.scrollTo({ y: firstEventStart, animated: true });
    }
  }, [sortedEvents]);

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.container}>
      <Timeline />
      {sortedEvents.map((event, index) => (
        <Event key={index} event={event} index={index} eventSlots={eventSlots} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingRight: 5,
    position: 'relative',
    backgroundColor: '#F2F2F7',
  },
  hourBlock: {
    height: 80, // Each hour block is 80px tall
    borderBottomWidth: 2,
    borderBottomColor: '#DDD',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  hourText: {
    fontSize: 16,
    color: '#333',
  },
  eventBlock: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  eventText: {
    fontWeight: 'bold',
  },
  eventTime: {
    color: '#555',
  },
});

export default DayView;