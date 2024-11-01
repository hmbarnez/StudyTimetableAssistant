import { View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import ExamActivity from '../../components/activity/ExamActivity';
import ClassActivity from '../../components/activity/ClassActivity';
import TaskActivity from '../../components/activity/TaskActivity';
// import { db } from '../../firebaseConfig';
// import { collection, addDoc } from 'firebase/firestore';

const Activity = () => {
  const intitialform = {
    examSubject: '', examSubjectName: '', examRoom: '', examBuilding: '', examDate: '', examStartTime: '', examEndTime: '',
    classSubject: '', classSubjectName: '', classRoom: '', classBuilding: '', classDays: '', classStartDate: '', classEndDate: '', classStartTime: '', classEndTime: '',
    taskTitle: '', taskDescription: '', taskDate: '', taskStartDate: '', taskEndDate: '', taskStartTime: '', taskEndTime: '', taskDays: '', taskOccurs: 'Once'
};

  const [form, setForm] = useState(intitialform);

  const [activityType, setActivityType] = useState('Exams'); // Default to "Exams"

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const toggleOccurs = (occursType, type) => {
    if (type === 'task') {
      setForm({ ...form, taskOccurs: occursType });
    }
  };

  const convertTo12Hour = (time) => {
    let [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert "00" to "12" and "13-23" to "1-11"
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // get the day of the week using moment and .format('dddd')
  const getDayOfWeekFromDate = (formDate) => {
    console.log('formDate:', formDate);
    const date = moment(formDate, 'YYYY-MM-DD');
    return date.format('dddd');
  }


  const saveActivity = () => {
    let requestBody = {};
    if (activityType === 'Exams') {
      // Create the request body for an exam event
      requestBody = {
        subjectName: form.examSubjectName, subject: form.examSubject, building: form.examBuilding, room: form.examRoom,
        startingDate: form.examDate, endingDate: form.examDate, eventDays: getDayOfWeekFromDate(form.examDate),
        startingTime: form.examStartTime, endingTime: form.examEndTime, type: 'exam'
      };
    } else if (activityType === 'Classes') {
      // Create the request body for a class event
      requestBody = {
        subjectName: form.classSubjectName, subject: form.classSubject, building: form.classBuilding, room: form.classRoom,
        eventDays: form.classDays, startingDate: form.classStartDate, endingDate: form.classEndDate,
        startingTime: form.classStartTime, endingTime: form.classEndTime, type: 'class'
      };
    } else if (activityType === 'Tasks') {
      let taskDaysFormatted = form.taskDays, endingDate = form.taskEndDate, startingDate = form.taskStartDate;
      if (form.taskOccurs === 'Once') {
          taskDaysFormatted = getDayOfWeekFromDate(form.taskDate);
          endingDate = form.taskDate;
          startingDate = form.taskDate;
      }
      requestBody = {
          taskTitle: form.taskTitle, taskDescription: form.taskDescription,
          eventDays: taskDaysFormatted, startingDate, endingDate,
          startingTime: form.taskStartTime, endingTime: form.taskEndTime, type: 'task'
      };
    } 
  
    const userId = 'GwwihkBX4iMUZcWouAku'; // Replace with the actual user ID later with redux
    // Submit the constructed requestBody  
    axios.post(`http://localhost:3000/events/${userId}`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('Event saved successfully:', requestBody);
      //reset the form
      alert('Event saved successfully');
      setForm(intitialform);
    })
    .catch(error => {
      console.error('Error saving event:', error);
    });
  };
  

  const cancelActivity = () => {
    setForm(intitialform);
  };

  return (
    <SafeAreaView className="bg-[#FFFFFF] h-full">
      <ScrollView className="px-4 mt-10 bg-[#F2F2F7] rounded-t-3xl py-4">
        <View className="flex-row justify-between items-center mt-0 mb-2">
          <Text className="text-2xl font-pbold p-4">New Activity</Text>
          <View className="bg-[#4DC59120] rounded-md p-2 px-3 flex-row space-x-4">
            <TouchableOpacity onPress={() => setActivityType('Exams')}>
              <Text className={`text-[#4DC591] font-semibold ${activityType === 'Exams' && 'underline'}`}>Exams</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivityType('Classes')}>
              <Text className={`text-[#4DC591] font-semibold ${activityType === 'Classes' && 'underline'}`}>Classes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivityType('Tasks')}>
              <Text className={`text-[#4DC591] font-semibold ${activityType === 'Tasks' && 'underline'}`}>Tasks</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-full p-4 pt-0 space-y-4">
          {/* Conditional Rendering for "Exams" */}
          {activityType === 'Exams' && (
            <ExamActivity form={form} handleInputChange={handleInputChange} formatTime={convertTo12Hour}/>
          )}

          {/* Placeholder for "Classes" */}
          {activityType === 'Classes' && (
            <ClassActivity form={form} handleInputChange={handleInputChange} formatTime={convertTo12Hour} />
          )}

          {/* Placeholder for "Tasks" */}
          {activityType === 'Tasks' && (
            <TaskActivity form={form} handleInputChange={handleInputChange} toggleOccurs={toggleOccurs} formatTime={convertTo12Hour} />
          )}

          {/* Save and Cancel Buttons */}
          <View className="flex-row justify-around mt-6">
            <TouchableOpacity
              onPress={saveActivity}
              className="bg-[#4DC591] rounded p-3 w-1/3 items-center"
            >
              <Text className="text-[#00664F] font-semibold">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cancelActivity}
              className="bg-[#00664F] rounded p-3 w-1/3 items-center"
            >
              <Text className="text-[#4DC591] font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activity;
