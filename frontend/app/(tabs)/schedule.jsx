import { View, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import React, { useState } from 'react';
import { icons } from '../../constants';
import ScheduleButton from '../../components/ScheduleButton';
import DayView from '../../components/DayView';
import { set } from 'date-fns';

// Mock schedule data
const scheduleData = {
  "2024-11-13": {
    classes: [
      {
        subjectName: "classname",
        subject: "class1",
        building: "classbuild",
        room: "classroom",
        eventDays: "Wednesday",
        startingDate: "2024-11-13",
        endingDate: "2024-11-13",
        startingTime: "11:30",
        endingTime: "14:00",
        type: "class",
        id: "qaHdcf4cbsSxx5UvvGGK",
      },
    ],
    exams: [
      {
        subjectName: "examsub",
        subject: "exam1",
        building: "exambuild",
        room: "examroom",
        startingDate: "2024-11-13",
        endingDate: "2024-11-13",
        eventDays: "Wednesday",
        startingTime: "10:30",
        endingTime: "11:50",
        type: "exam",
        id: "erVMTr9J6sYWqnF5lZFL",
      },
    ],
    tasks: [
      {
        taskTitle: "task title",
        taskDescription: "task desc",
        eventDays: "Wednesday",
        startingDate: "2024-11-13",
        endingDate: "2024-11-20",
        startingTime: "11:00",
        endingTime: "13:00",
        type: "task",
        id: "arzr6fW29cIhcQdUW5M6",
      },
    ],
  },
  "2024-11-27": {
    "classes": [
      {
        "subjectName": "classname",
        "subject": "class1",
        "building": "classbuild",
        "room": "classroom",
        "eventDays": "Wednesday",
        "startingDate": "2024-11-13",
        "endingDate": "2024-11-13",
        "startingTime": "11:30",
        "endingTime": "14:00",
        "type": "class",
        "id": "qaHdcf4cbsSxx5UvvGGK"
      }
    ],
    "exams": [
      {
        "subjectName": "examsub",
        "subject": "exam1",
        "building": "exambuild",
        "room": "examroom",
        "startingDate": "2024-11-13",
        "endingDate": "2024-11-13",
        "eventDays": "Wednesday",
        "startingTime": "10:30",
        "endingTime": "11:50",
        "type": "exam",
        "id": "erVMTr9J6sYWqnF5lZFL"
      }
    ],
    "tasks": [
      {
        "taskTitle": "task title",
        "taskDescription": "task desc",
        "eventDays": "Wednesday",
        "startingDate": "2024-11-13",
        "endingDate": "2024-11-20",
        "startingTime": "11:00",
        "endingTime": "13:00",
        "type": "task",
        "id": "arzr6fW29cIhcQdUW5M6"
      },
      {
        "taskTitle": "task title 2",
        "taskDescription": "task desc",
        "eventDays": "Wednesday",
        "startingDate": "2024-11-13",
        "endingDate": "2024-11-20",
        "startingTime": "11:00",
        "endingTime": "13:00",
        "type": "task",
        "id": "arzr6fW29cIhcQdUW5M6"
      }
    ]
  },
};

const Schedule = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0] // Default to today's date
  );
  
  // Get the schedule for the selected date, or default to empty categories
  const selectedSchedule = scheduleData[selectedDate] || {
    classes: [],
    exams: [],
    tasks: [],
  };
  return (
    <View className="bg-white px-4 pt-20 h-full w-full justify-center">
      <View className="flex flex-row justify-evenly items-center pt-10 bg-white">
        <ScheduleButton
          title="Months"
          isActive={!isActive}
          handlesPress={() => setIsActive(false)}
        />
        <ScheduleButton
          title="Days"
          isActive={isActive}
          handlesPress={() => setIsActive(true)}
        />
      </View>
      {/* View for calendar and timeline */}
      <View className="w-full flex-1 mt-6 pb-2 mb-80">
        {!isActive ? (
          <Calendar
            markedDates={Object.keys(scheduleData).reduce((acc, date) => {
              acc[date] = { marked: true, dotColor: '#4DC591' }; // Highlight all dates with events
              return acc;
            }, {})}
            theme={{
              backgroundColor: '#F2F2F7',
              calendarBackground: '#F2F2F7',
              todayTextColor: '#4DC591',
              textDayHeaderFontSize: 15,
              textMonthFontSize: 25,
              textMonthFontWeight: 'bold',
              monthTextColor: '#4DC591',
              textDayFontSize: 20,
              dotColor: '#4DC591',
            }}
            className="rounded-3xl p-5 py-10 w-full"
            onDayPress={(day) => {
              setSelectedDate(day.dateString); // Update selected date
              setIsActive(true); // Switch to day view
            }}
            hideArrows={false}
            renderArrow={(direction) => (
              <View>
                {direction === 'left' ? (
                  <Image
                    source={icons.lefticon}
                    className="w-6 h-6"
                    resizeMode="contain"
                    tintColor="#4DC591"
                  />
                ) : (
                  <Image
                    source={icons.righticon}
                    className="w-6 h-6"
                    resizeMode="contain"
                    tintColor="#4DC591"
                  />
                )}
              </View>
            )}
          />
        ) : (
          <View className="rounded-3xl p-2 bg-[#F2F2F7] h-[540px] pb-8">
            {/* Pass the selected schedule to DayView */}
            <DayView data={selectedSchedule} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Schedule;
