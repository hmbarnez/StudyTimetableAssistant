import { View, Text } from 'react-native'
import React, { useState } from 'react';
import { DateBar } from '../../components/home/DateBar'
import { TabBar } from '../../components/home/TabBar'
import { Content } from '../../components/home/HomeContent'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSchedule } from '../redux/reducers/scheduleReducer';

const Home = () => {
  const [activeTab, setActiveTab] = useState('Classes');
  const [classes, setClasses] = useState([])
  const [tasks, setTasks] = useState([])
  const [exams, setExams] = useState([])
  const dispatch = useDispatch();

  const fetchSchedule = async () => {
    const scheduleData = await fetchUserSchedule();
    dispatch(setSchedule(scheduleData)); // Store the schedule in Redux
  };

  const getContentForTab = () => {
    switch (activeTab) {
      case 'Classes':
        return classes;
      case 'Tasks':
        return tasks;
      case 'Exams':
        return exams;
      default:
        return [];
    }
  };

  return (
    <View className="bg-white flex-1 ">
      <DateBar></DateBar>
      <TabBar tabs={[
        { name: 'Classes', count: classes.length },
        { name: 'Tasks', count: tasks.length },
        { name: 'Exams', count: exams.length }
      ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab} >
      </TabBar>
      <Content data={getContentForTab()} activeTab={activeTab}></Content>
    </View>
  )
}

export default Home