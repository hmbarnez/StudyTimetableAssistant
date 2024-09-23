import { View, Text, TextInput, TouchableOpacity ,ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';

const Activity = () => {
  const [form, setForm] = useState({
    subject: '',
    subjectName: '',
    room: '',
    building: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const saveActivity = () => {
    console.log(form);
  };

  const cancelActivity = () => {
    console.log('Activity canceled');
  };

  return (
    <SafeAreaView className="bg-[#FFFFFF] h-full">
      <ScrollView className="w-full min-h-[100vh] px-4 mt-10 bg-[#F2F2F7] rounded-3xl pt-4">
        <View className="flex-row justify-between items-center mt-0 mb-2">
          <Text className="text-2xl font-pbold p-4">New Activity</Text>
          <View className="bg-gray-200 rounded-md p-1 px-3">
            <Text className="text-green-600 text-sm">Exams</Text>
          </View>
        </View>

        <View className="w-full p-4 pt-0 space-y-4">
          <View>
          <Text className="text-l font-psemibold">
          Subject
          </Text>
          <TextInput
            placeholder="Name"
            value={form.subject}
            onChangeText={(value) => handleInputChange('subject', value)}
            className="border border-gray-300 rounded p-2 mt-2"
          />
          </View>

          <Text className="text-l font-psemibold">
            Subject Name
          </Text>
          <TextInput
            placeholder="Subject Name"
            value={form.subjectName}
            onChangeText={(value) => handleInputChange('subjectName', value)}
            className="border border-gray-300 rounded p-2 mt-2"
          />

          <Text className="text-l font-psemibold">
            Room
          </Text>
          <View className="flex-row justify-between mt-2">
            <TextInput
              placeholder="Room"
              value={form.room}
              onChangeText={(value) => handleInputChange('room', value)}
              className="border border-gray-300 rounded p-2 flex-1 mr-2"
            />

            <TextInput
              placeholder="Building"
              value={form.building}
              onChangeText={(value) => handleInputChange('building', value)}
              className="border border-gray-300 rounded p-2 flex-1 ml-2"
            />
          </View>

          <Text className="text-l font-psemibold">
            Date
          </Text>
          <TextInput
            placeholder="Date"
            value={form.date}
            onChangeText={(value) => handleInputChange('date', value)}
            className="border border-gray-300 rounded p-2 mt-2"
          />

          <Text className="text-l font-psemibold">
            Start Time
          </Text>
          <View className="flex-row justify-between mt-2">
            <TextInput
              placeholder="Start"
              value={form.startTime}
              onChangeText={(value) => handleInputChange('startTime', value)}
              className="border border-gray-300 rounded p-2 flex-1 mr-2"
            />
            <TextInput
              placeholder="End"
              value={form.endTime}
              onChangeText={(value) => handleInputChange('endTime', value)}
              className="border border-gray-300 rounded p-2 flex-1 ml-2"
            />
          </View>

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
