// CustomCalendar.jsx
import React from "react";
import { View, Image } from "react-native";
import { Calendar } from "react-native-calendars";
import { icons } from "../../constants";


const CustomCalendar = ({ date, setDate, onClose, handleInputChange}) => {

  return (
    <View>
      <View className="p-5 bg-white rounded-lg w-full">
        <Calendar
          initialDate={date}
          markedDates={{
            [date]: { selected: true, selectedColor: "#4DC591" },
          }}
          theme={{
            backgroundColor: "#F2F2F7",
            calendarBackground: "#F2F2F7",
            todayTextColor: "#4DC591",
            textDayHeaderFontSize: 15,
            textMonthFontSize: 22,
            textMonthFontWeight: "bold",
            monthTextColor: "#4DC591",
            textDayFontSize: 20,
            dotColor: "#4DC591",
          }}
          onDayPress={(day) => {
            console.log("selected day", day);
            setDate(day.dateString); // Update the date in the parent component
            handleInputChange("examDate", day.dateString);
            setTimeout(() => {
              onClose(); // Close the modal after selection
            }, 100);
          }}
          hideArrows={false}
          enableSwipeMonths={true}
          renderArrow={(direction) => (
            <View>
              {direction === "left" ? (
                <Image
                  source={icons.lefticon}
                  className="w-5 h-5"
                  resizeMode="contain"
                  tintColor={"#4DC591"}
                />
              ) : (
                <Image
                  source={icons.righticon}
                  className="w-5 h-5"
                  resizeMode="contain"
                  tintColor={"#4DC591"}
                />
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CustomCalendar;
