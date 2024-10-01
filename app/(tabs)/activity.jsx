import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';


const Activity = () => {
  const [form, setForm] = useState({
    subjectExams: '',
    subjectNameExams: '',
    roomExams: '',
    buildingExams: '',
    dateExams: '',
    startTimeExams: '',
    endTimeExams: '',
    subjectClass: '',
    subjectNameClass: '',
    roomClass: '',
    buildingClass: '',
    dateClass: '',
    daysClass: '', // State to store days for repeating events
    startTimeClass: '',
    endTimeClass: '',
    title: '',
    description: '',
    dueDateTask: '',
    daysTask: '',
    dueTimeTask: '',
    occursClass: 'Once', // State for "Occurs" in Classes
    occursTask: 'Once', // Separate state for "Occurs" in Tasks
    
  });

  const [activityType, setActivityType] = useState('Exams'); // Default to "Exams"

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const toggleOccurs = (occursType, type) => {
    if (type === 'class') {
      setForm({ ...form, occursClass: occursType });
    } else if (type === 'task') {
      setForm({ ...form, occursTask: occursType });
    }
  };
  
  const saveActivity = () => {
    console.log(form);
  };

  const cancelActivity = () => {
    console.log('Activity canceled');
  };

  return (
    <SafeAreaView className="bg-[#FFFFFF] h-full">
      <ScrollView className="px-4 mt-10 bg-[#F2F2F7] rounded-t-3xl pt-4">
        <View className="flex-row justify-between items-center mt-0 mb-2">
          <Text className="text-2xl font-pbold p-4">New Activity</Text>
          <View className="bg-[#4DC59120] rounded-md p-2 px-3 flex-row space-x-4">
            <TouchableOpacity onPress={() => setActivityType('Exams')}>
              <Text className={`text-[#4DC591] font-semibold ${activityType === 'Exams' && 'underline'}`}>Exams</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivityType('Classes')}>
              <Text className={`text-[#4DC591] font-semibold ${activityType === 'Classes' && 'underline'}`}>Classes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivityType('Tasks')}>
              <Text className={`text-[#4DC591] font-semibold ${activityType === 'Tasks' && 'underline'}`}>Tasks</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-full p-4 pt-0 space-y-4">
          {/* Conditional Rendering for "Exams" */}
          {activityType === 'Exams' && (
            <>
              
              <View>
                <Text className="text-l font-psemibold">Subject</Text>
                <TextInput
                  placeholder="Name"
                  value={form.subjectExams}
                  onChangeText={(value) => handleInputChange('subjectExams', value)}
                  className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
                />
              </View>

              <View>
                <Text className="text-l font-psemibold">Subject Name</Text>
                <TextInput
                  placeholder="Subject Name"
                  value={form.subjectNameExams}
                  onChangeText={(value) => handleInputChange('subjectNameExams', value)}
                  className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
                />
              </View>

              <View className="flex-row justify-between mt-2">
                <View className="flex-1 mr-2">
                  <Text className="text-l font-psemibold">Room</Text>
                  <TextInput
                    placeholder="Room"
                    value={form.roomExams}
                    onChangeText={(value) => handleInputChange('roomExams', value)}
                    className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
                  />
                </View>

                <View className="flex-1 ml-2">
                  <Text className="text-l font-psemibold">Building</Text>
                  <TextInput
                    placeholder="Building"
                    value={form.buildingExams}
                    onChangeText={(value) => handleInputChange('buildingExams', value)}
                    className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
                  />
                </View>
              </View>

              <View>
                <Text className="text-l font-psemibold">Date</Text>
                <TextInput
                  placeholder="Date"
                  value={form.dateExams}
                  onChangeText={(value) => handleInputChange('dateExams', value)}
                  className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
                />
              </View>

              <View className="flex-row justify-between mt-2">
                <View className="flex-1 mr-2">
                  <Text className="text-l font-psemibold">Start Time</Text>
                  <TextInput
                    placeholder="Start"
                    value={form.startTimeExams}
                    onChangeText={(value) => handleInputChange('startTimeExams', value)}
                    className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
                  />
                </View>

                <View className="flex-1 ml-2">
                  <Text className="text-l font-psemibold">End Time</Text>
                  <TextInput
                    placeholder="End"
                    value={form.endTimeExams}
                    onChangeText={(value) => handleInputChange('endTimeExams', value)}
                    className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
                  />
                </View>
              </View>
            </>
          )}

          {/* Placeholder for "Classes" */}
          {activityType === 'Classes' && (
            <>
              <View>
                <Text className="text-l font-psemibold">Subject</Text>
                <TextInput
                  placeholder="Name"
                  value={form.subjectClass}
                  onChangeText={(value) => handleInputChange('subjectClass', value)}
                  className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
                />
              </View>

              <View>
                <Text className="text-l font-psemibold">Subject Name</Text>
                <TextInput
                  placeholder="Subject Name"
                  value={form.subjectNameClass}
                  onChangeText={(value) => handleInputChange('subjectNameClass', value)}
                  className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
                />
              </View>

              <View className="flex-row justify-between mt-2">
                <View className="flex-1 mr-2">
                  <Text className="text-l font-psemibold">Room</Text>
                  <TextInput
                    placeholder="Room"
                    value={form.roomClass}
                    onChangeText={(value) => handleInputChange('roomClass', value)}
                    className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
                  />
                </View>

                <View className="flex-1 ml-2">
                  <Text className="text-l font-psemibold">Building</Text>
                  <TextInput
                    placeholder="Building"
                    value={form.buildingClass}
                    onChangeText={(value) => handleInputChange('buildingClass', value)}
                    className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
                  />
                </View>
              </View>

              
              <View>
                <Text className="text-l font-psemibold mt-2">Occurs</Text>
                <View className="flex-row gap-5 my-1">
                  <TouchableOpacity
                    onPress={() => toggleOccurs('Once', 'class')}
                    className={`bg-[${form.occursClass === 'Once' ? '#4DC591' : '#FFFFFF'}] rounded-md p-2 w-24 flex items-center justify-center`}
                  >
                    <Text className={`${form.occursClass === 'Once' ? 'text-[#00664F]' : 'text-[#00664F]'} font-psemibold`}>Once</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => toggleOccurs('Repeating', 'class')}
                    className={`bg-[${form.occursClass === 'Repeating' ? '#4DC591' : '#FFFFFF'}] rounded-md p-2 w-24 flex items-center justify-center`}
                  >
                    <Text className={`${form.occursClass === 'Repeating' ? 'text-[#00664F]' : 'text-[#00664F]'} font-psemibold`}>Repeating</Text>
                  </TouchableOpacity>
                </View>
              </View>


                  {form.occursClass === 'Once' ? (
                    <View>
                      <Text className="text-l font-psemibold">Date</Text>
                      <TextInput
                        placeholder="Date"
                        value={form.dateClass}
                        onChangeText={(value) => handleInputChange('dateClass', value)}
                        className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
                      />
                    </View>
                  ) : (
                    <View>
                      <Text className="text-l font-psemibold">Days</Text>
                      <TextInput
                        placeholder="e.g., Mon, Wed, Fri"
                        value={form.daysClass}
                        onChangeText={(value) => handleInputChange('daysClass', value)}
                        className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
                      />
                    </View>
                  )} 

              <View className="flex-row justify-between mt-2">
                <View className="flex-1 mr-2">
                  <Text className="text-l font-psemibold">Start Time</Text>
                  <TextInput
                    placeholder="Start"
                    value={form.startTimeClass}
                    onChangeText={(value) => handleInputChange('startTimeClass', value)}
                    className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
                  />
                </View>

                <View className="flex-1 ml-2">
                  <Text className="text-l font-psemibold">End Time</Text>
                  <TextInput
                    placeholder="End"
                    value={form.endTimeClass}
                    onChangeText={(value) => handleInputChange('endTimeClass', value)}
                    className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
                  />
                </View>
              </View>
            </>
          )}

          {/* Placeholder for "Tasks" */}
          {activityType === 'Tasks' && (
            <>
              <View>
                <Text className="text-l font-psemibold">Title</Text>
                <TextInput
                  placeholder="Task Title"
                  value={form.title}
                  onChangeText={(value) => handleInputChange('title', value)}
                  className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-2"
                />
              </View>

              <View>
                <Text className="text-l font-psemibold">Details</Text>
                <TextInput
                  placeholder="Task description"
                  value={form.description}
                  onChangeText={(value) => handleInputChange('description', value)}
                  className="text-[#61677D] font-pregular border border-gray-300 rounded p-32 mt-2"
                />
              </View>

              <View>
                <Text className="text-l font-psemibold">Occurs</Text>
                <View className="flex-row gap-5 my-1">
                  <TouchableOpacity
                    onPress={() => toggleOccurs('Once', 'task')}
                    className={`bg-[${form.occursTask === 'Once' ? '#4DC591' : '#FFFFFF'}] rounded-md p-2 w-24 flex items-center justify-center`}
                  > <Text className={`${form.occursTask === 'Once' ? 'text-[#00664F]' : 'text-[#00664F]'} font-psemibold`}>Once</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => toggleOccurs('Repeating', 'task')}
                    className={`bg-[${form.occursTask === 'Repeating' ? '#4DC591' : '#FFFFFF'}] rounded-md p-2 w-24 flex items-center justify-center`}
                  >
                    <Text className={`${form.occursTask === 'Repeating' ? 'text-[#00664F]' : 'text-[#00664F]'} font-psemibold`}>Repeating</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {form.occursTask === 'Once' ? (
                <View className="flex-row justify-between mt-2">
                  <View className="flex-1 mr-2">
                    <Text className="text-l font-psemibold">Due Date</Text>
                    <TextInput
                      placeholder="Date"
                      value={form.dueDateTask}
                      onChangeText={(value) => handleInputChange('dueDateTask', value)}
                      className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
                    />
                  </View>

                  <View className="flex-1 ml-2">
                    <Text className="text-l font-psemibold">Time</Text>
                    <TextInput
                      placeholder="Time"
                      value={form.dueTimeTask}
                      onChangeText={(value) => handleInputChange('dueTimeTask', value)}
                      className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
                    />
                  </View>
                </View>
              ) : (
                  
                  <View className="flex-row justify-between mt-2">
                  <View className="flex-1 mr-2">
                    <Text className="text-l font-psemibold">Days</Text>
                    <TextInput
                      placeholder="Days"
                      value={form.daysTask}
                      onChangeText={(value) => handleInputChange('daysTask', value)}
                      className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
                    />
                  </View>

                  <View className="flex-1 ml-2">
                    <Text className="text-l font-psemibold">Time</Text>
                    <TextInput
                      placeholder="Time"
                      value={form.dueTimeTask}
                      onChangeText={(value) => handleInputChange('dueTimeTask', value)}
                      className="text-[#61677D] font-pregular border border-gray-300 rounded p-2 mt-1"
                    />
                  </View>
                </View>
                  
              )}
            </>
          )}

          {/* Save and Cancel Buttons */}
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
