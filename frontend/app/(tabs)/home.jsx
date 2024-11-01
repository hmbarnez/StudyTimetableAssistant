import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DateBar } from '../../components/home/DateBar';
import { TabBar } from '../../components/home/TabBar';
import { Content } from '../../components/home/HomeContent';
import { useSelector, useDispatch } from 'react-redux';
import { setSchedule } from '../redux/reducers/scheduleReducer';
import { fetchEvents } from '../services/eventAPI';
import { fetchUser } from '../services/userAPI';
import { router, useLocalSearchParams } from 'expo-router';
import { setUser } from '../redux/reducers/userReducer';

const Home = () => {
  const [activeTab, setActiveTab] = useState('Classes');
  const [date, setDate] = useState(new Date());
  const [classes, setClasses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [exams, setExams] = useState([]);
  const dispatch = useDispatch();
  const schedule = useSelector(state => state.schedule);

  const { userId } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data and store it in Redux
        const userData = await fetchUser(userId);
        dispatch(setUser(userData));

        // Fetch schedule data
        const scheduleData = await fetchEvents(userId);
        dispatch(setSchedule(scheduleData)); // Store schedule in Redux
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (userId) fetchData();
  }, [dispatch, userId]);

  useEffect(() => {
    // Update state based on the active date from schedule in Redux
    if (schedule && schedule[date]) {
      setClasses(schedule[date].classes || []);
      setTasks(schedule[date].tasks || []);
      setExams(schedule[date].exams || []);
    } else {
      setClasses([]);
      setTasks([]);
      setExams([]);
    }
  }, [schedule, date]);

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
    <View className="bg-white flex-1">
      <DateBar selectedDate={date} setDate={setDate} onPress={() => router.push({ pathname: '/schedule', params: { userId } })} />
      <TabBar
        tabs={[
          { name: 'Classes', count: classes.length },
          { name: 'Tasks', count: tasks.length },
          { name: 'Exams', count: exams.length },
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Content data={getContentForTab()} activeTab={activeTab} />
    </View>
  );
};

export default Home;
