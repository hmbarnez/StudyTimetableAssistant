import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const ClassActivity = ({ form, handleInputChange, toggleOccurs }) => (
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
      <Text className="text-l font-psemibold">Subject Name</Text>
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
    {/* Occurs Toggle */}

    <View>
      <Text className="text-l font-psemibold mt-2">Occurs</Text>
      <View className="flex-row gap-5 my-1">
        <TouchableOpacity
          onPress={() => toggleOccurs("Once", "class")}
          className={`bg-[${
            form.classOccurs === "Once" ? "#4DC591" : "#FFFFFF"
          }] rounded-md p-2 w-24 flex items-center justify-center`}
        >
          <Text
            className={`${
              form.classOccurs === "Once" ? "text-[#00664F]" : "text-[#00664F]"
            } font-psemibold`}
          >
            Once
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleOccurs("Repeating", "class")}
          className={`bg-[${
            form.classOccurs === "Repeating" ? "#4DC591" : "#FFFFFF"
          }] rounded-md p-2 w-24 flex items-center justify-center`}
        >
          <Text
            className={`${
              form.classOccurs === "Repeating"
                ? "text-[#00664F]"
                : "text-[#00664F]"
            } font-psemibold`}
          >
            Repeating
          </Text>
        </TouchableOpacity>
      </View>
    </View>

    {form.classOccurs === "Once" ? (
      <View>
        <Text className="text-l font-psemibold">Date</Text>
        <TextInput
          placeholder="Date"
          value={form.classDate}
          onChangeText={(value) => handleInputChange("classDate", value)}
          className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
        />
      </View>
    ) : (
      <>
        <View>
          <Text className="text-l font-psemibold">Days</Text>
          <TextInput
            placeholder="e.g., Mon, Wed, Fri"
            value={form.classDays}
            onChangeText={(value) => handleInputChange("classDays", value)}
            className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
          />
        </View>
        {/*start date and end date if repeating*/}
        <View className="flex-row justify-between mt-2">
          <View className="flex-1 mr-2">
            <Text className="text-l font-psemibold">Start Date</Text>
            <TextInput
              placeholder="Start"
              value={form.classStartDate}
              onChangeText={(value) =>
                handleInputChange("classStartDate", value)
              }
              className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
            />
          </View>

          <View className="flex-1 ml-2">
            <Text className="text-l font-psemibold">End Date</Text>
            <TextInput
              placeholder="End"
              value={form.classEndDate}
              onChangeText={(value) => handleInputChange("classEndDate", value)}
              className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
            />
          </View>
        </View>
      </>
    )}

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

export default ClassActivity;
