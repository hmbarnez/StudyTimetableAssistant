import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchUser, updateUser } from '../services/userAPI'; // Import setUser action
import { setUser } from '../redux/reducers/userReducer';


const NotificationSettings = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState(user?.type || '');

  useEffect(() => {
    // Fetch the user data on component mount
    const fetchData = async () => {
      try {
        const userData = await fetchUser(user.id);  // Make sure to use a valid userId
        dispatch(setUser(userData));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (user?.id) fetchData(); // Fetch data if user id is available
  }, [dispatch, user]);

  const handleSave = async () => {
    try {
      // Call updateUser service to update the account type in the backend
      const updatedUser = await updateUser(user.id, { type: accountType });
      // Dispatch the updated user data to Redux
      dispatch(setUser(updatedUser));
      console.log("Account type updated successfully.");
    } catch (error) {
      console.error("Error updating account type: ", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Notification Settings</Text>

        {/* Account Type */}
        <View style={styles.group}>
          <Text style={styles.label}>Account Type:</Text>

          {/* Options */}
          <View style={styles.optionGroup}>
            {['Focused Learner', 'Balanced Student', 'Distracted Student', 'Procrastinator'].map((type) => (
              <TouchableOpacity 
                key={type} 
                style={[styles.option, accountType === type && styles.selectedOption]} 
                onPress={() => setAccountType(type)}
              >
                <View style={styles.circle}>
                  {accountType === type && <View style={styles.checkedCircle} />}
                </View>
                <Text style={styles.optionText}>{type}: {getDescription(type)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save and Cancel Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getDescription = (type) => {
  switch (type) {
    case 'Focused Learner':
      return 'disciplined, rarely needs reminders';
    case 'Balanced Student':
      return 'manages time, needs reminders regularly';
    case 'Distracted Student':
      return 'often distracted, needs frequent reminders';
    case 'Procrastinator':
      return 'delays until the last minute, very frequent reminders';
    default:
      return '';
  }
};

export default NotificationSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // borderRadius: 45,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  group: {
    marginBottom: 30,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 10,
  },
  optionGroup: {
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#e0f7f4',
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 2,
    borderColor: '#C0C0C0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkedCircle: {
    width: 7.5,
    height: 7.5,
    borderRadius: 3.75,
    backgroundColor: '#00CB87',
  },
  optionText: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: '#474747',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#4DC591',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  saveButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#00664F',
    padding: 15,
    borderRadius: 5,
    flex: 1,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});