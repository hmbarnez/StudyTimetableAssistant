import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { icons } from "../../constants";
import CustomCalendar from "./CustomCalendar";
import { TouchableOpacity } from "react-native";

const CustomDatePicker = ({date, setDate, handleInputChange}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-1 justify-center items-center">

      <TouchableOpacity 
      onPress={() => {
        setModalVisible(true)
      }}
      className="bg-[#4DC591] rounded p-2 w-1/4 items-center"
      >
        <View>
          <Text className="font-pregular">Pick Date</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Pressable className="flex-1 justify-center items-center" style={styles.modalContainer} onPress={() => setModalVisible(false)}>
          <View className="w-11/12">
            <CustomCalendar 
              date={date} 
              setDate={setDate} 
              // selectedDate={selectedDate}
              // setSelectedDate={setSelectedDate}
              onClose={() => setModalVisible(false)} 
              handleInputChange={handleInputChange}
              />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
  }
});

export default CustomDatePicker;
