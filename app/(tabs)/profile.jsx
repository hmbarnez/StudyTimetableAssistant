import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { router } from 'expo-router';

const Profile = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [userDetails, setUserDetails] = useState(null); // State to store user details from Firestore

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser; // Fetch the current user
    if (currentUser) {
      setUser(currentUser);  // Set the user data if logged in
      
      const fetchUserDetails = async () => {
        const db = getFirestore();
        const userDoc = doc(db, 'Users', currentUser.uid); // Reference to user document
        const docSnap = await getDoc(userDoc); // Fetch document
        
        if (docSnap.exists()) {
          setUserDetails(docSnap.data()); // Set user details from Firestore
        } else {
          console.error('No such document!');
        }
      };
      
      fetchUserDetails(); // Call the function to fetch user details
    } else {
      console.error('No user is signed in');
    }
  }, []);

  // Navigate to the Account Settings page when the button is clicked
  const goToAccountSettings = () => {
    router.push('/account-settings'); //
  };

  const goToNotificationSettings = () => {
    router.push('/notification-settings'); //
  };
  const goTofeedback = () => {
    router.push('/feedback'); //
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>Profile</Text>

        {/* Profile Picture and Information */}
        <View style={styles.profileSection}>
          <Image source={logo} style={styles.profileImage} />
          <Text style={styles.profileName}>
            {userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : 'Loading...'}
          </Text>
          <Text style={styles.profileEmail}>
            {user ? user.email : 'Loading...'}
          </Text>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsHeading}>Settings</Text>
          <TouchableOpacity style={styles.settingOption} onPress={goToAccountSettings}>
            <Text>Account Settings</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption} onPress={goToNotificationSettings}>
            <Text>Notification Settings</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption} onPress={goTofeedback}>
            <Text>Feedback</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete my account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    width: 100,
    height: 100,
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
})

export default Profile;