import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { format } from 'date-fns';
import { isSameDay, startOfDay } from 'date-fns';

export const DateBar = ({ selectedDate, setDate, onPress }) => {
  const day = format(new Date(selectedDate), 'd');
  const weekday = format(new Date(selectedDate), 'EEE');
  const monthYear = format(new Date(selectedDate), 'MMM yyyy');

  const currentDate = new Date();
  const isToday = isSameDay(startOfDay(new Date(selectedDate)), startOfDay(currentDate));

  const goToPreviousDay = () => {
    const previousDate = new Date(selectedDate); // Use selectedDate directly
    previousDate.setDate(previousDate.getDate() - 1); // Move to the previous day
    setDate(previousDate.toISOString().split('T')[0]); // Update the state with the new date
  };

  const goToNextDay = () => {
    const nextDate = new Date(selectedDate); // Use selectedDate directly
    nextDate.setDate(nextDate.getDate() + 1); // Move to the next day
    setDate(nextDate.toISOString().split('T')[0]); // Update the state with the new date
  };

  return (
    <View onPress={onPress}>
      <View>
        <View className="flex-row h-16 mt-20 mx-12">
          <Text className="text-5xl">{day}</Text>
          <View className="ml-2">
            <Text className="text-teal-600 font-pregular">{weekday}</Text>
            <Text className="text-teal-600 font-pregular">{monthYear}</Text>
          </View>
          {isToday && (
            <View className="ml-auto bg-[#eaffea] w-20 h-10 rounded-lg border-solid items-center justify-center ">
              <Text className="font-psemibold text-[#4DC591]">Today</Text>
            </View>
          )}
        </View>

        <View className="flex-row h-16 mx-12">
          <Pressable onPress={goToPreviousDay}>
            <Text className="text-xl font-psemibold">{'<'}</Text>
          </Pressable>
          <Pressable onPress={goToNextDay} className="ml-auto">
            <Text className="text-xl font-psemibold">{'>'}</Text>
          </Pressable>
        </View>
      </View>
    </View>

  );
};
