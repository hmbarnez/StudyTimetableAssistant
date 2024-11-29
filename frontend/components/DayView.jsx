import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const parseTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const prepareEventData = (data) => {
  const allEvents = [];

  ['classes', 'exams', 'tasks'].forEach((type) => {
    data[type]?.forEach((event) => {
      console.log('event:', event);
      console.log('type:', type);
      allEvents.push({
        ...event,
        startMinute: parseTimeToMinutes(event.startingTime),
        endMinute: parseTimeToMinutes(event.endingTime),
        eventColor: 
          type === 'classes' ? '#ACE7F4' : 
          type === 'exams' ? '#ACF4D1' : 
          '#ffcf56',
      });
    });
  });

  return allEvents;
};

const findOverlaps = (events) => {
  const eventSlots = Array(1440).fill(null).map(() => []); // One slot per minute
  events.forEach((event, index) => {
    for (let i = event.startMinute; i < event.endMinute; i++) {
      eventSlots[i].push(index); // Map events to each minute slot
    }
  });
  return eventSlots;
};

const Timeline = () => (
  <>
    {Array.from({ length: 1440 }, (_, i) => (
      <View key={i} style={styles.minuteBlock}>
        {i % 60 === 0 && (
          <Text style={styles.hourText}>{formatTime(Math.floor(i / 60))}</Text>
        )}
      </View>
    ))}
  </>
);

const Event = ({ event, index, eventSlots }) => {
  const startMinute = event.startMinute;
  const endMinute = event.endMinute;
  const duration = endMinute - startMinute;
  
  // Find the number of overlapping events
  const overlappingCount = Math.max(
    ...eventSlots.slice(startMinute, endMinute).map((slot) => slot.length)
  );
  
  // Determine the event's position based on overlaps
  const widthPercentage = 80 / overlappingCount; // Divide width for overlaps
  const overlapIndex = eventSlots[startMinute].indexOf(index); // Index in overlap

  return (
    <View
      style={[
        styles.eventBlock,
        {
          top: startMinute, // Position based on minute
          height: duration, // Duration in minutes maps to height
          width: `${widthPercentage}%`, // Adjust width for overlaps
          left: `${overlapIndex * widthPercentage + 18}%`, // Offset based on overlap
          backgroundColor: event.eventColor,
        },
      ]}
    >
      <Text style={styles.eventText}>{event.subjectName || event.taskTitle}</Text>
      <Text style={styles.eventTime}>
        {event.startingTime} - {event.endingTime} 
      </Text>
    </View>
  );
};

const DayView = ({data}) => {
  // const data = {
  //   "classes": [
  //     {
  //       "subjectName": "classname",
  //       "subject": "class1",
  //       "building": "classbuild",
  //       "room": "classroom",
  //       "eventDays": "Wednesday",
  //       "startingDate": "2024-11-13",
  //       "endingDate": "2024-11-13",
  //       "startingTime": "11:30",
  //       "endingTime": "14:00",
  //       "type": "class",
  //       "id": "qaHdcf4cbsSxx5UvvGGK"
  //     }
  //   ],
  //   "exams": [
  //     {
  //       "subjectName": "examsub",
  //       "subject": "exam1",
  //       "building": "exambuild",
  //       "room": "examroom",
  //       "startingDate": "2024-11-13",
  //       "endingDate": "2024-11-13",
  //       "eventDays": "Wednesday",
  //       "startingTime": "10:30",
  //       "endingTime": "11:50",
  //       "type": "exam",
  //       "id": "erVMTr9J6sYWqnF5lZFL"
  //     }
  //   ],
  //   "tasks": [
  //     {
  //       "taskTitle": "task title",
  //       "taskDescription": "task desc",
  //       "eventDays": "Wednesday",
  //       "startingDate": "2024-11-13",
  //       "endingDate": "2024-11-20",
  //       "startingTime": "11:00",
  //       "endingTime": "13:00",
  //       "type": "task",
  //       "id": "arzr6fW29cIhcQdUW5M6"
  //     },
  //     {
  //       "taskTitle": "task title 2",
  //       "taskDescription": "task desc",
  //       "eventDays": "Wednesday",
  //       "startingDate": "2024-11-13",
  //       "endingDate": "2024-11-20",
  //       "startingTime": "11:00",
  //       "endingTime": "13:00",
  //       "type": "task",
  //       "id": "arzr6fW29cIhcQdUW5M6"
  //     }
  //   ]
  // }
  

  const events = prepareEventData(data);
  const sortedEvents = events.sort((a, b) => a.startMinute - b.startMinute);
  const eventSlots = findOverlaps(sortedEvents); // Detect overlaps

  const scrollViewRef = useRef(null);

  // Scroll to the first event on mount
  useEffect(() => {
    if (sortedEvents.length > 0) {
      const firstEventStart = sortedEvents[0].startMinute; // First event minute
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

const formatTime = (hour) => {
  const formattedHour = hour < 10 ? `0${hour}` : hour;
  return `${formattedHour}:00`;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingRight: 5,
    position: 'relative',
    backgroundColor: '#F2F2F7',
  },
  minuteBlock: {
    height: 1, // 1px per minute
  },
  hourText: {
    fontSize: 14,
    color: '#555',
    position: 'absolute',
    top: -5,
    left: 5,
  },
  eventBlock: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#F2F2F7',
    borderRadius: 5,
    padding: 1,
  },
  eventText: {
    fontWeight: 'bold',
  },
  eventTime: {
    color: '#555',
  },
});

export default DayView;
