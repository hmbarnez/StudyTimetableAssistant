import {View,SafeAreaView,StyleSheet,Text,TouchableOpacity,Image, Pressable, ScrollView} from 'react-native';
import { Calendar, Timeline } from 'react-native-calendars';
import React, { useState } from 'react';
import { icons } from '../../constants';
import ScheduleButton from '../../components/ScheduleButton';
import DayView from '../../components/DayView';

const Schedule = () => {
  
  const [isActive, setIsActive] = useState(false);
  const [items, setItems] = useState({
    '2024-09-26': [{ name: 'Meeting 1', data: 'Lorem ipsum...' }],
    '2024-09-28': [{ name: 'Meeting 2', data: 'Lorem ipsum...' }],
    '2024-09-29': [{ name: 'Meeting 3', data: 'Lorem ipsum...' }],
    '2024-09-30': [{ name: 'Meeting 4', data: 'Lorem ipsum...' }],
    '2024-09-31': [{ name: 'Meeting 5', data: 'Lorem ipsum...' }],
    '2024-09-25': [{ name: 'Meeting 6', data: 'Lorem ipsum...' }],
    // Ensure empty dates are represented
    '2024-09-27': [],
  });
  


  return (
    <View className="bg-white px-4 pt-20 h-full w-full justify-center" >
      <View className="flex flex-row justify-evenly items-center pt-10  bg-white">
        <ScheduleButton 
          title="Months" 
          isActive={!isActive}
          handlesPress={() => setIsActive(false)}
        />
        <ScheduleButton 
          title="Days" 
          isActive={isActive}
          handlesPress={() => setIsActive(true)}
        />
      </View>
      {/* view for calendar and timeline */}
      <View className="w-full flex-1 mt-6 pb-2 mb-80">
        {!isActive ? (
        <Calendar
          markedDates={Object.keys(items).reduce((acc, date) => {
            acc[date] = { marked: items[date].length > 0 };
            return acc;
          }, {})}
          theme={{
            backgroundColor: '#F2F2F7',
            calendarBackground: "#F2F2F7",
            todayTextColor: '#4DC591',
            textDayHeaderFontSize: 15,
            textMonthFontSize: 25,
            textMonthFontWeight: 'bold',
            monthTextColor: '#4DC591',
            textDayFontSize: 20,
            dotColor: '#4DC591',
          }}
          className="rounded-3xl p-5 py-10 w-full"
          onDayPress={(day) => {
            console.log('selected day', day);
          }}
          hideArrows={false}
          renderArrow={(direction) => {
            return(
              <View>
                {direction === 'left' ? (
                  <Image source={icons.lefticon} 
                    className="w-6 h-6"
                    resizeMode='contain'
                    tintColor={'#4DC591'}
                  />
                ) : (
                  <Image 
                    source={icons.righticon} 
                    className="w-6 h-6"
                    resizeMode='contain'
                    tintColor={'#4DC591'}
                  />
                )}
              </View>
            )
          }}
        />) : (
        <View className="rounded-3xl p-2 bg-[#F2F2F7] h-[540px] pb-8">
          <DayView />
        </View>
        )}
      </View>
    </View>
  );
}



export default Schedule