import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const TaskActivity = ({ form, handleInputChange, toggleOccurs }) => (
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
      <Text className="text-l font-psemibold">Details</Text>
      <TextInput
        placeholder="Task description"
        value={form.taskDescription}
        onChangeText={(value) => handleInputChange("taskDescription", value)}
        className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2 h-56" // Adjusted padding and height
        multiline // Added multiline for better input experience
      />
    </View>
    {/* Occurs Toggle */}
    <View>
      <Text className="text-l font-psemibold mt-2">Occurs</Text>
      <View className="flex-row gap-5 my-1">
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
      <View className="flex-row justify-between mt-2">
        <View className="flex-1 mr-2">
          <Text className="text-l font-psemibold">Due Date</Text>
          <TextInput
            placeholder="Date"
            value={form.taskDueDate}
            onChangeText={(value) => handleInputChange("taskDueDate", value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
          />
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-l font-psemibold">Time</Text>
          <TextInput
            placeholder="Time"
            value={form.taskDueTime}
            onChangeText={(value) => handleInputChange("taskDueTime", value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
          />
        </View>
      </View>
    ) : (
      <>
        <View className="flex-row justify-between mt-2">
          <View className="flex-1 mr-2">
            <Text className="text-l font-psemibold">Days</Text>
            <TextInput
              placeholder="Days"
              value={form.taskDays}
              onChangeText={(value) => handleInputChange("taskDays", value)}
              className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
            />
          </View>

          <View className="flex-1 ml-2">
            <Text className="text-l font-psemibold">Time</Text>
            <TextInput
              placeholder="Time"
              value={form.taskDueTime}
              onChangeText={(value) => handleInputChange("taskDueTime", value)}
              className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
            />
          </View>
        </View>

        <View className="flex-row justify-between mt-2">
          <View className="flex-1 mr-2">
            <Text className="text-l font-psemibold">Start Date</Text>
            <TextInput
              placeholder="Start"
              value={form.taskStartDate}
              onChangeText={(value) =>
                handleInputChange("taskStartDate", value)
              }
              className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
            />
          </View>

          <View className="flex-1 ml-2">
            <Text className="text-l font-psemibold">End Date</Text>
            <TextInput
              placeholder="End"
              value={form.taskEndDate}
              onChangeText={(value) => handleInputChange("taskEndDate", value)}
              className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
            />
          </View>
        </View>
      </>
    )}
  </>
);

export default TaskActivity;
