import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, signOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { router } from 'expo-router';

const Profile = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [userDetails, setUserDetails] = useState(null); // State to store user details from Firestore

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      const fetchUserDetails = async () => {
        const db = getFirestore();
        const userDoc = doc(db, 'Users', currentUser.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.error('No such document!');
        }
      };
      fetchUserDetails();
    } else {
      console.error('No user is signed in');
    }
  }, []);

  const handleDeleteAccount = async () => {
    console.log("Delete account button pressed");

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (Platform.OS === 'web') {
      // Use window.prompt for web to request password
      const password = window.prompt('Please enter your password to confirm the deletion of your account.');

      if (password) {
        try {
          // Reauthenticate the user using Email and Password
          const credential = EmailAuthProvider.credential(currentUser.email, password);
          await reauthenticateWithCredential(currentUser, credential);

          // Proceed with account deletion
          const db = getFirestore();
          const userDoc = doc(db, 'Users', currentUser.uid);
          await deleteDoc(userDoc); // Remove user data from Firestore
          await deleteUser(currentUser); // Delete user from Firebase Auth
          console.log('User account deleted');
          router.push('/starting'); // Redirect to starting screen
        } catch (error) {
          console.error('Error during reauthentication or account deletion:', error);
          alert('Reauthentication Failed: The password entered is incorrect. Please try again.');
        }
      }
    } else {
      // Mobile Reauthentication using Alert.prompt
      Alert.prompt(
        'Reauthenticate',
        'Please enter your password to confirm the deletion of your account.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            style: 'destructive',
            onPress: async (inputPassword) => {
              try {
                // Reauthenticate the user using Email and Password
                const credential = EmailAuthProvider.credential(currentUser.email, inputPassword); 
                await reauthenticateWithCredential(currentUser, credential);

                // Proceed with account deletion
                const db = getFirestore();
                const userDoc = doc(db, 'Users', currentUser.uid);
                await deleteDoc(userDoc); // Remove user data from Firestore
                await deleteUser(currentUser); // Delete user from Firebase Auth
                console.log('User account deleted');
                router.push('/starting'); // Redirect to starting screen
              } catch (error) {
                console.error('Error during reauthentication or account deletion:', error);
                Alert.alert('Reauthentication Failed', 'The password entered is incorrect. Please try again.');
              }
            }
          }
        ],
        'secure-text'
      );
    }
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
          <TouchableOpacity style={styles.settingOption} onPress={() => router.push('/account-settings')}>
            <Text>Account Settings</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption} onPress={() => router.push('/notification-settings')}>
            <Text>Notification Settings</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption} onPress={() => router.push('/feedback')}>
            <Text>Feedback</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>Delete my account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={() => signOut(getAuth()).then(() => router.push('/starting'))}>
            <Text style={styles.logoutButtonText}>Log out</Text>
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
});

export default Profile;
