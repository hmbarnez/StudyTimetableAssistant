import { Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import logo from '../../assets/images/logo1.png'
import { Class } from './event/Class';
import { Task } from './event/Task';
import { Exam } from './event/Exam';

export const Content = ({ data, activeTab }) => {
    return (
        <View className="flex-1 items-center mt-4">
            {data.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                    <Image source={logo} className="resize w-44 h-36" />
                    <Text className="text-3xl font-pregular">No {activeTab} today!</Text>
                </View>
            ) : (
                activeTab === "Classes" ? 
                <Class data = {data} ></Class> 
                : 
                activeTab === "Tasks" ?
                <Task data = {data} ></Task>
                :
                <Exam data = {data} ></Exam>
            )}

        </View>
    );
};