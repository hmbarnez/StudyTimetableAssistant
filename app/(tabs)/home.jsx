import { View, Text } from 'react-native'
import React, { useState } from 'react';
import { DateBar } from '../../components/home/DateBar'
import { TabBar } from '../../components/home/TabBar'
import { Content } from '../../components/home/HomeContent'

const Home = () => {
  const [activeTab, setActiveTab] = useState('Classes');
  const [classes, setClasses] = useState([
    {
      subjectName: 'Introduction to Networking',
      subject: 'ITEC 2000',
      classRoom: 'Room 2210, Building A',
      startingTime: '9:30',
      endingTime: '10:30'
    },
    {
      subjectName: 'Introduction to Networking',
      subject: 'ITEC 2000',
      classRoom: 'Room 2210, Building A',
      startingTime: '9:30',
      endingTime: '10:30'
    }
  ])
  const [tasks, setTasks] = useState([
    {
      subjectName: 'Introduction to Networking',
      subject: 'ITEC 4000',
      classRoom: 'Room 2210, Building A',
      startingTime: '9:30',
      endingTime: '10:30'
    },
    {
      subjectName: 'Introduction to Networking',
      subject: 'ITEC 2000',
      classRoom: 'Room 2210, Building A',
      startingTime: '9:30',
      endingTime: '10:30'
    }
  ])
  const [exams, setExams] = useState([
    {
      subjectName: 'Introduction to Networking',
      subject: 'ITEC 3000',
      classRoom: 'Room 2210, Building A',
      startingTime: '9:30',
      endingTime: '10:30'
    },
    {
      subjectName: 'Introduction to Networking',
      subject: 'ITEC 2000',
      classRoom: 'Room 2210, Building A',
      startingTime: '9:30',
      endingTime: '10:30'
    }
  ])

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
      {/* <DataBar></DataBar> */}
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