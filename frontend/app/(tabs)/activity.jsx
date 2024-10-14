import { View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import ExamActivity from '../../components/activity/ExamActivity';
import ClassActivity from '../../components/activity/ClassActivity';
import TaskActivity from '../../components/activity/TaskActivity';
// import { db } from '../../firebaseConfig';
// import { collection, addDoc } from 'firebase/firestore';

const Activity = () => {
  const intitialform = {
    // Exam fields
    examSubject: '',
    examSubjectName: '',
    examRoom: '',
    examBuilding: '',
    examDate: '',
    examStartTime: '',
    examEndTime: '',
    
    // Class fields
    classSubject: '',
    classSubjectName: '',
    classRoom: '',
    classBuilding: '',
    classDays: '', // State to store days for repeating events
    classStartDate: '',
    classEndDate: '',
    classStartTime: '',
    classEndTime: '',

    // Task fields
    taskTitle: '',
    taskDescription: '',
    taskDate: '',
    taskStartDate: '',
    taskEndDate: '',
    taskStartTime: '',
    taskEndTime: '',
    taskDays: '', // State to store days for repeating tasks
    taskOccurs: 'Once', // Separate state for "Occurs" in Tasks
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

  //submit form function will put in a separate file
  // const submitForm = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, 'Eventz'), {
  //       userId: "testid123",
  //       examSubject: form.examSubject,
  //     });
  //     console.log('Document written with ID: ', docRef.id);
  //     alert('Success', 'Activity added successfully');
  //   } catch (e) {
  //     console.error('Error adding document: ', e);
  //     alert('Error', 'An error occurred. Please try again later.');
  //   }
  // };

  const saveActivity = () => {
    // submitForm();
    console.log(form);
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
              <Text className={`text-[#4DC591] font-psemibold ${activityType === 'Exams' && 'underline'}`}>Exams</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivityType('Classes')}>
              <Text className={`text-[#4DC591] font-psemibold ${activityType === 'Classes' && 'underline'}`}>Classes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivityType('Tasks')}>
              <Text className={`text-[#4DC591] font-psemibold ${activityType === 'Tasks' && 'underline'}`}>Tasks</Text>
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
              <Text className="text-[#00664F] font-psemibold">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cancelActivity}
              className="bg-[#00664F] rounded p-3 w-1/3 items-center"
            >
              <Text className="text-[#4DC591] font-psemibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activity;
