import { Text, View, Image } from 'react-native';
import React from 'react';
import logo from '../../assets/images/logo1.png';
import { Class } from './event/Class';
import { Task } from './event/Task';
import { Exam } from './event/Exam';

export const Content = ({ data, activeTab }) => {
    const renderContent = () => {
        if (data.length === 0) {
            return (
                <View className="flex-1 items-center justify-center">
                    <Image source={logo} className="resize w-44 h-36" />
                    <Text className="text-3xl font-pregular">No {activeTab} today!</Text>
                </View>
            );
        }

        return data.map((event) => {
            switch (activeTab) {
                case 'Classes':
                    return <Class key={event.id} event={event} />;
                case 'Tasks':
                    return <Task key={event.id} event={event} />;
                case 'Exams':
                    return <Exam key={event.id} event={event} />;
                default:
                    return null;
            }
        });
    };

    return <View className="flex-1 items-center mt-4">{renderContent()}</View>;
};