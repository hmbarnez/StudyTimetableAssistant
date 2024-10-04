import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import CustomDatePicker from "./CustomDatePicker";

const TaskActivity = ({ form, handleInputChange, toggleOccurs }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [taskDate, setTaskDate] = useState(""); //for one time task
  return (
    <>
      <View>
        <Text className="text-l font-psemibold">Title</Text>
        <TextInput
          placeholder="Task Title"
          value={form.taskTitle}
          onChangeText={(value) => handleInputChange("taskTitle", value)}
          className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
        />
      </View>

      <View>
        <Text className="text-l font-psemibold mt-2">Details</Text>
        <TextInput
          placeholder="Task description"
          value={form.taskDescription}
          onChangeText={(value) => handleInputChange("taskDescription", value)}
          className={`text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2 h-${
              form.taskOccurs === "Once" ? 28 : 28
            }`} // changes height based on taskOccurs right now just keeping it static, can change later
          multiline // Added multiline for better input experience
        />
      </View>
      {/* Occurs Toggle */}
      <View>
        <Text className="text-l font-psemibold mt-2">Occurs</Text>
        <View className="flex-row gap-2 my-1">
          <TouchableOpacity
            onPress={() => toggleOccurs("Once", "task")}
            className={`bg-[${
              form.taskOccurs === "Once" ? "#4DC591" : "#FFFFFF"
            }] rounded-md p-2 w-24 flex items-center justify-center`}
          >
            <Text
              className={`${
                form.taskOccurs === "Once" ? "text-[#00664F]" : "text-[#00664F]"
              } font-psemibold`}
            >
              Once
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleOccurs("Repeating", "task")}
            className={`bg-[${
              form.taskOccurs === "Repeating" ? "#4DC591" : "#FFFFFF"
            }] rounded-md p-2 w-24 flex items-center justify-center`}
          >
            <Text
              className={`${
                form.taskOccurs === "Repeating"
                  ? "text-[#00664F]"
                  : "text-[#00664F]"
              } font-psemibold`}
            >
              Repeating
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Repeat similar structure for other Task fields */}
      {form.taskOccurs === "Once" ? (
        <>
          <View>
            <Text className="text-l font-psemibold pt-2">Date</Text>
            <View className="flex-row items-center">
              <CustomDatePicker
                date={taskDate}
                setDate={setTaskDate}
                handleInputChange={handleInputChange}
                fieldName={"taskDate"}
              />
              <Text className="text-center my-2 text-lg font-pmedium">
                {form.taskDate === "" ? "YYYY-MM-DD" : form.taskDate}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between mt-2">
            <View className="flex-1 mr-2">
              <Text className="text-l font-psemibold">Start Time</Text>
              <TextInput
                placeholder="Time"
                value={form.taskStartTime}
                onChangeText={(value) =>
                  handleInputChange("taskStartTime", value)
                }
                className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
              />
            </View>

            <View className="flex-1 mr-2">
              <Text className="text-l font-psemibold">End Time</Text>
              <TextInput
                placeholder="Time"
                value={form.taskEndTime}
                onChangeText={(value) =>
                  handleInputChange("taskEndTime", value)
                }
                className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <View>
            <Text className="text-l font-psemibold pt-2">Start Date</Text>
            <View className="flex-row items-center">
              <CustomDatePicker
                date={startDate}
                setDate={setStartDate}
                handleInputChange={handleInputChange}
                fieldName={"taskStartDate"}
              />
              <Text className="text-center my-2 text-lg font-pmedium">
                {form.taskStartDate === "" ? "YYYY-MM-DD" : form.taskStartDate}
              </Text>
            </View>
          </View>

          <View>
            <Text className="text-l font-psemibold pt-2">End Date</Text>
            <View className="flex-row items-center">
              <CustomDatePicker
                date={endDate}
                setDate={setEndDate}
                handleInputChange={handleInputChange}
                fieldName={"taskEndDate"}
              />
              <Text className="text-center my-2 text-lg font-pmedium">
                {form.taskEndDate === "" ? "YYYY-MM-DD" : form.taskEndDate}
              </Text>
            </View>
          </View>

          <View className="flex-1 mr-2">
            <Text className="text-l font-psemibold">Days</Text>
            <TextInput
              placeholder="Days"
              value={form.taskDays}
              onChangeText={(value) => handleInputChange("taskDays", value)}
              className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
            />
          </View>

          <View className="flex-row justify-between mt-2">
            <View className="flex-1 mr-2">
              <Text className="text-l font-psemibold">Start Time</Text>
              <TextInput
                placeholder="Time"
                value={form.taskStartTime}
                onChangeText={(value) =>
                  handleInputChange("taskStartTime", value)
                }
                className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
              />
            </View>

            <View className="flex-1 mr-2">
              <Text className="text-l font-psemibold">End Time</Text>
              <TextInput
                placeholder="Time"
                value={form.taskEndTime}
                onChangeText={(value) =>
                  handleInputChange("taskEndTime", value)
                }
                className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default TaskActivity;
