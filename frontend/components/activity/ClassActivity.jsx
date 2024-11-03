import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import CustomDatePicker from "./CustomDatePicker";
import CustomTimePicker from './CustomTimePicker';

const ClassActivity = ({ form, handleInputChange, formatTime }) => {
  const [startClassDate, setStartClassDate] = useState("");
  const [endClassDate, setEndClassDate] = useState("");

  return (
    <>
      <View>
        <Text className="text-l font-psemibold">Subject</Text>
        <TextInput
          id="className"
          name="className"
          placeholder="Name"
          value={form.classSubject}
          onChangeText={(value) => handleInputChange("classSubject", value)}
          className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
        />
      </View>

      <View>
        <Text className="text-l font-psemibold mt-2">Subject Name</Text>
        <TextInput
          id="classSubjectName"
          name="classSubjectName"
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
            id="classRoom"
            name="classRoom"
            placeholder="Room"
            value={form.classRoom}
            onChangeText={(value) => handleInputChange("classRoom", value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
          />
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-l font-psemibold">Building</Text>
          <TextInput
            id="classBuilding"
            name="classBuilding"
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
          id="classDays"
          name="classDays"
          placeholder="e.g., Monday, Wednesday, Friday"
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
          <View className="flex-row items-center">
            <CustomTimePicker
              title={"start"}
              handleInputChange={handleInputChange}
              fieldName={"classStartTime"}
              endTime={form.classEndTime}
            />
            <Text className="text-center my-2 text-lg font-pmedium">{(form.classStartTime === "") ? "00:00" : formatTime(form.classStartTime)}</Text>
          </View>
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-l font-psemibold">End Time</Text>
          <View className="flex-row items-center">
            <CustomTimePicker
              title={"end"}
              handleInputChange={handleInputChange}
              fieldName={"classEndTime"}
              startTime={form.classStartTime}
            />
            <Text className="text-center my-2 text-lg font-pmedium">{(form.classEndTime === "") ? "00:00" : formatTime(form.classEndTime)}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ClassActivity;
