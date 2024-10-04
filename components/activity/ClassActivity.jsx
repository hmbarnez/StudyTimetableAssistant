import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import CustomDatePicker from "./CustomDatePicker";

const ClassActivity = ({ form, handleInputChange }) => {
  const [startClassDate, setStartClassDate] = useState("");
  const [endClassDate, setEndClassDate] = useState("");

  return (
    <>
      <View>
        <Text className="text-l font-psemibold">Subject</Text>
        <TextInput
          placeholder="Name"
          value={form.classSubject}
          onChangeText={(value) => handleInputChange("classSubject", value)}
          className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
        />
      </View>

      <View>
        <Text className="text-l font-psemibold mt-2">Subject Name</Text>
        <TextInput
          placeholder="Subject Name"
          value={form.classSubjectName}
          onChangeText={(value) => handleInputChange("classSubjectName", value)}
          className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
        />
      </View>

      <View className="flex-row justify-between mt-2">
        <View className="flex-1 mr-2">
          <Text className="text-l font-psemibold">Room</Text>
          <TextInput
            placeholder="Room"
            value={form.classRoom}
            onChangeText={(value) => handleInputChange("classRoom", value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
          />
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-l font-psemibold">Building</Text>
          <TextInput
            placeholder="Building"
            value={form.classBuilding}
            onChangeText={(value) => handleInputChange("classBuilding", value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
          />
        </View>
      </View>
      

      <View>
        <Text className="text-l font-psemibold mt-2">Days</Text>
        <TextInput
          placeholder="e.g., Mon, Wed, Fri"
          value={form.classDays}
          onChangeText={(value) => handleInputChange("classDays", value)}
          className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
        />
      </View>
      
      <View>
        <Text className="text-l font-psemibold pt-2">Start Date</Text>
        <View className="flex-row items-center">
          <CustomDatePicker
            date={startClassDate}
            setDate={setStartClassDate}
            handleInputChange={handleInputChange}
            fieldName={"classStartDate"}
          />
          <Text className="text-center my-2 text-lg font-pmedium">
            {form.classStartDate === "" ? "YYYY-MM-DD" : form.classStartDate}
          </Text>
        </View>
      </View>

      <View>
        <Text className="text-l font-psemibold pt-2">End Date</Text>
        <View className="flex-row items-center">
          <CustomDatePicker
            date={endClassDate}
            setDate={setEndClassDate}
            handleInputChange={handleInputChange}
            fieldName={"classEndDate"}
          />
          <Text className="text-center my-2 text-lg font-pmedium">
            {form.classEndDate === "" ? "YYYY-MM-DD" : form.classEndDate}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between mt-2">
        <View className="flex-1 mr-2">
          <Text className="text-l font-psemibold">Start Time</Text>
          <TextInput
            placeholder="Start"
            value={form.classStartTime}
            onChangeText={(value) => handleInputChange("classStartTime", value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
          />
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-l font-psemibold">End Time</Text>
          <TextInput
            placeholder="End"
            value={form.classEndTime}
            onChangeText={(value) => handleInputChange("classEndTime", value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
          />
        </View>
      </View>
    </>
  );
};

export default ClassActivity;
