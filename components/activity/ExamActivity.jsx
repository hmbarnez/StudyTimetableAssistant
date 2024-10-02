import React from 'react';
import { View, Text, TextInput } from 'react-native';

const ExamActivity = ({ form, handleInputChange }) => (
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
      <TextInput
        placeholder="Date"
        value={form.examDate}
        onChangeText={(value) => handleInputChange('examDate', value)}
        className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
      />
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

export default ExamActivity;
