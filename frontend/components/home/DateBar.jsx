import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { format } from 'date-fns';

export const DateBar = ({ selectedDate, setDate, onPress }) => {
  const formattedDate = new Date(selectedDate);
  const day = format(formattedDate, 'd');
  const weekday = format(formattedDate, 'EEE');
  const monthYear = format(formattedDate, 'MMM yyyy');

  const currentDate = new Date();

  const isToday = formattedDate.toDateString() === currentDate.toDateString();

  const goToPreviousDay = () => {
    const previousDate = new Date(formattedDate);
    previousDate.setDate(formattedDate.getDate() - 1);
    setDate(previousDate.toISOString().split('T')[0]);
  };

  const goToNextDay = () => {
    const nextDate = new Date(formattedDate);
    nextDate.setDate(formattedDate.getDate() + 1);
    setDate(nextDate.toISOString().split('T')[0]);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <View className="flex-row h-16 mt-20 mx-12">
          <Text className="text-5xl">{day}</Text>
          <View className="ml-2">
            <Text className="text-teal-600 font-pregular">{weekday}</Text>
            <Text className="text-teal-600 font-pregular">{monthYear}</Text>
          </View>
          {isToday && (
            <View className="ml-auto bg-lime-50 w-20 h-10 rounded-lg border-solid items-center justify-center">
              <Text className="font-psemibold text-lime-500">Today</Text>
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
    </TouchableOpacity>

  );
};
