import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import logo from '../../assets/images/logo.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const AboutApp = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>About StudyPlanner App</Text>

        {/* Logo */}
        <View style={styles.logoSection}>
          <Image source={logo} style={styles.logoImage} />
        </View>

        {/* App Description */}
        <Text style={styles.description}>
          This StudyPlanner App is designed to help students stay organized and reduce procrastination.
          This app provides reminders for upcoming exams and activities, blocks out time on your calendar for focus sessions,
          and offers personalized notifications based on your study profile to keep you on track.
        </Text>

        {/* Core Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Key Features</Text>
          <Text style={styles.feature}>• Exam & Activity Notifications</Text>
          <Text style={styles.feature}>• Calendar Blocking for Study Times</Text>
          <Text style={styles.feature}>• Tailored Reminders Based on Student Type</Text>
        </View>

        {/* Credits and Year */}
        <Text style={styles.credits}>
          Developed by: Hafiz Adams, Harisson Barnes, Khoa Tran, Muketoi Celestino
        </Text>
        <Text style={styles.year}>© 2024 StudyPlanner</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: 'gray',
  },
  featuresSection: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feature: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  credits: {
    fontSize: 12,
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
  year: {
    fontSize: 13,
    textAlign: 'center',
    color: 'gray',
    marginTop: 5,
  },
});

export default AboutApp;
