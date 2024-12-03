import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';
import logo from '../../assets/images/logo.png';
import { ScrollView } from 'react-native';
import AuthFormField from '../../components/AuthFormField';
import { fetchUser, updateUser } from '../services/userAPI'; // Import setUser action
import { useDispatch, useSelector } from 'react-redux'; 
import { setUser } from '../redux/reducers/userReducer';


const AccountSettings = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [updatedDetails, setUpdatedDetails] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    studyHours: user.studyHours || '', // Add studyHours with fallback
  });
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUser(user.id);
        dispatch(setUser(userData));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    if (user?.id) fetchData();
  }, [dispatch, user]);

  const handleSaveChanges = async () => {
    try {
      const updatedUser = await updateUser(user.id, {
        firstName: updatedDetails.firstName,
        lastName: updatedDetails.lastName,
        studyHours: updatedDetails.studyHours, // Include studyHours
      });
      dispatch(setUser(updatedUser));
      console.log("Account details updated successfully.");
    } catch (error) {
      console.error("Error updating account details: ", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Account Settings</Text>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.profilePicSection}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profilePic} />
          ) : (
            <Image source={logo} style={styles.profilePic} />
          )}
        </View>

        <View style={styles.form}>
          {/* First Name Field */}
          <Text>First Name: </Text>
          <AuthFormField
            title="First Name"
            placeholder="First Name"
            value={updatedDetails.firstName || user.firstName}
            handleChangeText={(text) =>
              setUpdatedDetails({ ...updatedDetails, firstName: text })
            }
          />

          {/* Last Name Field */}
          <Text>Last Name: </Text>
          <AuthFormField
            title="Last Name"
            placeholder="Last Name"
            value={updatedDetails.lastName || user.lastName}
            handleChangeText={(text) =>
              setUpdatedDetails({ ...updatedDetails, lastName: text })
            }
          />

          {/* Email Field */}
          <Text>Email: </Text>
          <AuthFormField
            title="Email"
            placeholder="Email"
            value={user.email}
          />

          {/* Study Hours Field */}
          <Text>Study Hours: </Text>
          <AuthFormField
            title="Study Hours"
            placeholder="Study Hours per Week"
            value={updatedDetails.studyHours}
            handleChangeText={(text) =>
              setUpdatedDetails({ ...updatedDetails, studyHours: text })
            }
            keyboardType="numeric" // Ensuring numeric input
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    // borderRadius: 45,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  profilePicSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  form: {
    marginBottom: 20,
  },
  buttonContainer: {
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default AccountSettings;
