import { View, Text, Pressable, Modal, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { icons } from "../../constants";
import CustomCalendar from "./CustomCalendar";
import { TouchableOpacity } from "react-native";

const CustomDatePicker = ({date, setDate, handleInputChange, fieldName}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="pr-5">

      <TouchableOpacity 
      onPress={() => {
        setModalVisible(true)
      }}
      className="bg-[#4DC591] rounded py-1 px-4 items-center justify-center"
      >
        <View>
          <Image
            source={icons.monthview}
            className="w-8 h-8"
            resizeMode="contain"
            tintColor={"#00664F"}
          />
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
              fieldName={fieldName}
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
