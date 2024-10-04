import React from 'react';
import { View, Text, TextInput } from 'react-native';
import CustomDatePicker from './CustomDatePicker';
import { useState } from 'react';

const ExamActivity = ({ form, handleInputChange }) => {
  const [date, setDate] = useState("");
  return(
    <>
      <View>
        <Text className="text-l font-psemibold">Subject</Text>
        <TextInput
          placeholder="Name"
          value={form.examSubject}
          onChangeText={(value) => handleInputChange('examSubject', value)}
          className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
        />
      </View>

      <View>
        <Text className="text-l font-psemibold">Subject Name</Text>
        <TextInput
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
            placeholder="Room"
            value={form.examRoom}
            onChangeText={(value) => handleInputChange('examRoom', value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
          />
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-l font-psemibold">Building</Text>
          <TextInput
            placeholder="Building"
            value={form.examBuilding}
            onChangeText={(value) => handleInputChange('examBuilding', value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
          />
        </View>
      </View>

      <View>
        <Text className="text-l font-psemibold">Date</Text>
        <View className="flex-row items-center">
          <CustomDatePicker date={date} setDate={setDate} handleInputChange={handleInputChange} fieldName={"examDate"}/>
          <Text className="text-center my-2 text-lg font-pmedium">{(form.examDate === "") ? "YYYY-MM-DD" : form.examDate}</Text>
        </View>
      </View>

      <View className="flex-row justify-between mt-2">
        <View className="flex-1 mr-2">
          <Text className="text-l font-psemibold">Start Time</Text>
          <TextInput
            placeholder="Start"
            value={form.examStartTime}
            onChangeText={(value) => handleInputChange('examStartTime', value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
          />
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-l font-psemibold">End Time</Text>
          <TextInput
            placeholder="End"
            value={form.examEndTime}
            onChangeText={(value) => handleInputChange('examEndTime', value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
          />
        </View>
      </View>
    </>
  );
};

export default ExamActivity;
