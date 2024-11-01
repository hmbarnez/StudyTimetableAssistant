import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { icons } from '../../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/reducers/userReducer';
import { updateUser } from '../services/userAPI';

const questions = [
  {
    question: "What’s your strategy for long-term projects?",
    options: [
      "Break it down, and conquer bit by bit, like a true hero.",
      "Work steadily but with a healthy dose of 'I’ll finish this tomorrow.'",
      "Start strong, then realize Netflix just dropped a new series.",
      "It’s called a last-minute miracle—my secret superpower."
    ]
  },
  {
    question: "How do you approach your study schedule?",
    options: [
      "My schedule is my best friend; we’re inseparable.",
      "We hang out regularly, but I’m cool with spontaneity.",
      "My schedule and I have a love-hate relationship—it’s mostly on 'read.'",
      "Schedule? I prefer the thrill of last-minute panic."
    ]
  },

  {
    question: "How often do you get distracted while studying?",
    options: [
      "Distracted? Never! My focus is laser sharp.",
      "Occasionally, but I’m back on track faster than you can say “Oops.”",
      "Frequently—I think my cat/dog/lamp needs my attention more than my books.",
      "Is “studying” code for watching funny cat videos? Because then, all the time."
    ]
  },
  {
    question: "How do you handle unexpected interruptions while studying?",
    options: [
      "I handle it like a ninja—swift and back to business.",
      "I adapt, but sometimes the “pause” button gets a little too comfy.",
      "Interruptions? More like invitations to my procrastination party.",
      "Thank you, interruption! You just saved me from studying… again."
    ]
  },
  {
    question: "How do you prioritize your study tasks?",
    options: [
      "I’m basically a project manager—tasks, timelines, the whole shebang.",
      "I prioritize, but sometimes Netflix sneaks into the top spot.",
      "I try, but somehow reorganizing my sock drawer feels urgent.",
      "Prioritize? That sounds like future-me’s problem."
    ]
  },
  {
    question: "How do you react to study reminders?",
    options: [
      "I nod in agreement and get to work. Thanks, friendly reminder!",
      "I appreciate the reminder—right after this quick snack break.",
      "I hit snooze like it’s my morning alarm.",
      "I run and hide, pretending the reminder never existed."
    ]
  }

];

const AccountForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state => state.user.user))
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({ A: 0, B: 0, C: 0, D: 0 });

  const handleAnswer = (optionIndex) => {
    const scoreMap = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };
    setAnswers(prev => ({ ...prev, [scoreMap[optionIndex]]: prev[scoreMap[optionIndex]] + 1 }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigateToResult();
    }
  };

  const navigateToResult = async () => {
    const maxScore = Math.max(...Object.values(answers));
    const maxType = Object.keys(answers).find(key => answers[key] === maxScore);
    const typeMap = { A: 'Focused Learner', B: 'Balanced Student', C: 'Distracted Student', D: 'Procrastinator' };
    const accountType = typeMap[maxType];


    try {
      // Update user with the new account type
      const updatedUser = await updateUser(user.id, { type: accountType });
      console.log(updatedUser)
      dispatch(setUser(updatedUser)); // Update Redux with the user type
      navigation.navigate('account-created');
    } catch (error) {
      console.error('Failed to update user:', error.message);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <SafeAreaView className="bg-[#4DC591] h-full">
      <View>
        <TouchableOpacity onPress={handleBack}>
          <Image source={icons.lefticon} className="w-6 h-6 mt-10 ml-5" />
        </TouchableOpacity>
      </View>
      <View className="w-full justify-center min-h-[88vh] mt-[80px] px-4 bg-white rounded-t-3xl">
        <Text className="text-xl text-center font-psemibold mt-5">{questions[currentQuestionIndex].question}</Text>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <TouchableOpacity key={index} className="bg-[#00664F] rounded-md p-2 mt-10" onPress={() => handleAnswer(index)}>
            <Text className="text-white font-pregular text-center">{option}</Text>
          </TouchableOpacity>
        ))}

        <ProgressBar
          progress={(currentQuestionIndex + 1) / questions.length}
          width={null}
          color="#4DC591"
          borderWidth={0}
          borderRadius={0}
          height={5}
          style={{ marginTop: 40 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountForm;