import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, deleteAccount } from '../services/authAPI';
import { logout, setError } from '../redux/reducers/userReducer';
import PasswordPrompt from '../../components/PasswordPrompt';
import { setSchedule } from '../redux/reducers/scheduleReducer';
import { fetchEvents } from '../services/eventAPI';
import { fetchUser } from '../services/userAPI';
import { router, useLocalSearchParams } from 'expo-router';
import { setUser } from '../redux/reducers/userReducer';

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isPromptVisible, setPromptVisible] = useState(false);

  const handleDeleteAccount = async (inputPassword) => {
    if (!inputPassword) return; // Handle empty input

    try {
      // Call your delete account function
      await deleteAccount(user.id, inputPassword); // Assume this function verifies the password
      setPromptVisible(false);
      dispatch(logout()); // Update Redux state
      router.push('/starting'); // Redirect to starting screen
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('Error', error.message || 'Failed to delete account.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the API to log out
      dispatch(logout()); // Dispatch the logout action to update the Redux store
      router.push('/(auth)/sign-in'); // Redirect to sign-in page after logout
    } catch (err) {
      dispatch(setError(err.message));
    }
  };


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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>Profile</Text>

        {/* Profile Picture and Information */}
        <View style={styles.profileSection}>
          <Image source={logo} style={styles.profileImage} />
          {user ? (
            <>
              <Text style={styles.profileName}>
                {`${user.firstName} ${user.lastName}`}
              </Text>
              <Text style={styles.profileEmail}>
                {user.email}
              </Text>
            </>
          ) : (
            <Text style={styles.profileName}>Loading...</Text>
          )}
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsHeading}>Settings</Text>
          <TouchableOpacity style={styles.settingOption} onPress={() => router.push('/account-settings')}>
            <Text>Account Settings</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption} onPress={() => router.push('/notification-settings')}>
            <Text>Notification Settings</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption} onPress={() => router.push('/about')}>
            <Text>About App</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.deleteButton} onPress={() => setPromptVisible(true)}>
            <Text style={styles.deleteButtonText}>Delete my account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <PasswordPrompt
        visible={isPromptVisible}
        onConfirm={handleDeleteAccount}
        onCancel={() => setPromptVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileEmail: {
    fontSize: 16,
    color: 'gray',
  },
  settingsSection: {
    marginBottom: 40,
  },
  settingsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  arrow: {
    fontSize: 18,
    color: 'gray',
  },
  bottomButtons: {
    paddingBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Profile;
