import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Modal, TextInput, StyleSheet, Image} from 'react-native';
import { icons } from '../../constants';

const CustomTimePicker = ({title, handleInputChange, fieldName, startTime, endTime}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [period, setPeriod] = useState('AM'); // Default to AM

  const handleConfirm = () => {
    const hoursValue = hours === '' ? 0 : parseInt(hours);
    const minutesValue = minutes === '' ? 0 : parseInt(minutes);
    
    // Check if hours and minutes are valid
    if (hoursValue > 12 || minutesValue > 59) {
      return alert('Invalid Time, Please enter valid hours (1-12) and minutes (0-59).'); 
    }
  
    // Set default values if empty
    const formattedMinutes = minutes === '' || minutes === '0' ? '00' : minutes.length === 1 ? `0${minutes}` : minutes;
    const formattedHours = hours === '' ? '00' : hours.length === 1 ? `0${hours}` : hours;

    // Format time to 24 hours and checks if valid compared to start/end time
    const formattedTime = formatTo24(formattedHours, formattedMinutes, period);
    if (!validateTime(title, startTime, endTime, formattedTime)) {return;}
    
    setModalVisible(false);
    handleInputChange(fieldName, formattedTime); // sends time to parent component in 24 hour format
  };



  //check if start time is less than end time
  //checks both if user enters end time first
  //returns boolean so handleConfirm can stop execution if false
  const validateTime = (title, startTime, endTime, formattedTime) => {
    if(title === "start" && endTime){
      if(!compareTime(formattedTime, endTime)){
        alert("Start time cannot be greater than or equal to end time");
        return false;
      }
    }
    if(title === "end" && startTime){
      if(!compareTime(startTime, formattedTime)){
        alert("End time cannot be less than or equal to start time");
        return false;
      }
    }
    return true;
  }

  //helper method for comparing start and end time
  const compareTime = (start, end) => {
    const startHour = parseInt(start.split(":")[0]);
    const startMin = parseInt(start.split(":")[1]);
    const endHour = parseInt(end.split(":")[0]);
    const endMin = parseInt(end.split(":")[1]);
    if(startHour > endHour){
      return false;
    }
    if(startHour === endHour && startMin >= endMin){
      return false;
    }
    return true;
  }
  
  const formatTo24 = (hour, min, period) => {
    // Function to format time to 24 hours
    let hours = parseInt(hour);
    if (period === 'PM' && hours < 12) {
      hours += 12; // Handle PM case
    } else if (period === 'AM' && hours === 12) {
      hours = 0; // Handle midnight case
    }
    return `${hours}:${min}`;
  };

  const handleHoursChange = (text) => {
    // Only allow numbers and manage the input logic
    const numericText = text.replace(/[^0-9]/g, '');
    const length = numericText.length;

    if (length === 0) {
      setHours('');
    } else if (length === 1) {
      setHours(numericText);
    } else if (length >= 2) {
      setHours(numericText.slice(-2));
    }
  };

  const handleMinutesChange = (text) => {
    // Only allow numbers and manage the input logic
    const numericText = text.replace(/[^0-9]/g, '');
    const length = numericText.length;

    if (length === 0) {
      setMinutes('');
    } else if (length === 1) {
      setMinutes(numericText);
    } else if (length >= 2) {
      setMinutes(numericText.slice(-2)); // Keep only the last two characters
    }
  };

  return (
    <View className="flex-row mr-3 items-center">      
      <TouchableOpacity 
      onPress={() => {
        setModalVisible(true)
      }}
      className="bg-[#4DC591] rounded py-1 px-4 items-center justify-center"
      >
        <View>
          <Image
            source={icons.clock}
            className="w-8 h-8"
            resizeMode="contain"
            tintColor={"#00664F"}
          />
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer} className="flex-1 justify-center items-center">
          <View className="w-2/3 bg-white px-5 py-10 rounded-lg items-center">
            <View className="flex-row items-center">
              <TextInput
                id='hours'
                name="hours"
                className="h-14 w-14 bg-white border border-gray-300 rounded p-2 text-center font-pregular text-2xl"
                keyboardType="numeric"
                placeholder={hours || '12'}
                maxLength={3}
                value={hours}
                onChangeText={handleHoursChange}
                placeholderTextColor="#A9A9A9" // Placeholder color
              />
              <Text className="text-lg font-pbold mx-1">:</Text>
              <TextInput
                id='minutes'
                name="minutes"
                className="h-14 w-14 bg-white border border-gray-300 rounded p-2 text-center font-pregular text-2xl"
                keyboardType="numeric"
                placeholder={minutes || '00'}
                maxLength={3}
                value={minutes}
                onChangeText={handleMinutesChange}
                placeholderTextColor="#A9A9A9" // Placeholder color
              />
            </View>

            <View className="flex-row my-2">
              <TouchableOpacity
                className={`rounded py-2 px-5 mr-[1px] items-center justify-center ${period === 'AM' ? 'bg-[#4DC591]' : 'bg-gray-300'}`}
                onPress={() => setPeriod('AM')}
              >
                <Text className={`text-lg font-pbold text-[#00664F]`}>AM</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                className={`rounded py-2 px-5 ml-[1px] items-center justify-center ${period === 'PM' ? 'bg-[#4DC591]' : 'bg-gray-300'}`}
                onPress={() => setPeriod('PM')}
              >
                <Text className={`text-lg font-pbold text-[#00664F]`}>PM</Text>
              </TouchableOpacity>
            </View>
            {/* change to TouchableOpacity */}

            <View className="flex-row mt-2">
              <TouchableOpacity
                onPress={handleConfirm}
                className="bg-[#4DC591] rounded p-3 w-1/2 mr-[1px] items-center"
              >
                <Text className="text-[#00664F] text-m font-semibold">Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-[#00664F] rounded p-3 w-1/2 ml-[1px] items-center"
              >
                <Text className="text-[#4DC591] text-m font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {backgroundColor: 'rgba(0,0,0,0.5)'},
});

export default CustomTimePicker;
