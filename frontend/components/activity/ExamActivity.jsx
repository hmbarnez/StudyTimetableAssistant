import React from 'react';
import { View, Text, TextInput } from 'react-native';
import CustomDatePicker from './CustomDatePicker';
import { useState } from 'react';
import CustomTimePicker from './CustomTimePicker';

const ExamActivity = ({ form, handleInputChange, formatTime}) => {
  const [date, setDate] = useState("");
  
  return(
    <>
      <View>
        <Text className="text-l font-psemibold">Subject</Text>
        <TextInput
          id='examSubject'
          name="examSubject"
          placeholder="Name"
          value={form.examSubject}
          onChangeText={(value) => handleInputChange('examSubject', value)}
          className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
        />
      </View>

      <View>
        <Text className="text-l font-psemibold mt-2">Subject Name</Text>
        <TextInput
          id='examSubjectName'
          name="examSubjectName"
          placeholder="Subject Name"
          value={form.examSubjectName}
          onChangeText={(value) => handleInputChange('examSubjectName', value)}
          className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
        />
      </View>

      <View className="flex-row justify-between mt-2">
        <View className="flex-1 mr-2">
          <Text className="text-l font-psemibold">Room</Text>
          <TextInput
            id='examRoom'
            name="examRoom"
            placeholder="Room"
            value={form.examRoom}
            onChangeText={(value) => handleInputChange('examRoom', value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
          />
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-l font-psemibold">Building</Text>
          <TextInput
            id='examBuilding'
            name="examBuilding"
            placeholder="Building"
            value={form.examBuilding}
            onChangeText={(value) => handleInputChange('examBuilding', value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
          />
        </View>
      </View>

      <View>
        <Text className="text-l font-psemibold mt-2">Date</Text>
        <View className="flex-row items-center">
          <CustomDatePicker date={date} setDate={setDate} handleInputChange={handleInputChange} fieldName={"examDate"}/>
          <Text className="text-center my-2 text-lg font-pmedium">{(form.examDate === "") ? "YYYY-MM-DD" : form.examDate}</Text>
        </View>
      </View>

      <View className="flex-row justify-between mt-2">
        <View className="flex-1 mr-2">
          <Text className="text-l font-psemibold">Start Time</Text>
          <View className="flex-row items-center">
            <CustomTimePicker 
              title={"start"} 
              handleInputChange={handleInputChange} 
              fieldName={"examStartTime"} 
              endTime={form.examEndTime} 
            />
            <Text className="text-center my-2 text-lg font-pmedium">{(form.examStartTime === "") ? "00:00" : formatTime(form.examStartTime)}</Text>
          </View>
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-l font-psemibold">End Time</Text>
          <View className="flex-row items-center">
            <CustomTimePicker 
              title={"end"} 
              handleInputChange={handleInputChange} 
              fieldName={"examEndTime"} 
              startTime={form.examStartTime}
            />
            <Text className="text-center my-2 text-lg font-pmedium">{(form.examEndTime === "") ? "00:00" : formatTime(form.examEndTime)}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ExamActivity;
