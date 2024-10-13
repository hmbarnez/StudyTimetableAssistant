import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { router } from 'expo-router'; 
import logo from '../../assets/images/logo.png'; 
import { ScrollView } from 'react-native';
import AuthFormField from '../../components/AuthFormField';

const AccountSettings = () => {
  const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '', email: '' });
  const [updatedDetails, setUpdatedDetails] = useState({ firstName: '', lastName: '', email: '' });
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const fetchUserDetails = async () => {
        setLoading(true);
        try {
          const db = getFirestore();
          const userDoc = doc(db, 'Users', currentUser.uid);
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserDetails(data);
            setUpdatedDetails(data);
            if (data.profilePic) {
              setProfilePic(data.profilePic);
            }
          } else {
            console.error('No such document!');
          }
        } catch (err) {
          setError('Failed to fetch user details.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, []);

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const db = getFirestore();
      const userDoc = doc(db, 'Users', currentUser.uid);

      await updateDoc(userDoc, {
        firstName: updatedDetails.firstName,
        lastName: updatedDetails.lastName,
      });

      if (updatedDetails.email !== currentUser.email) {
        await currentUser.updateEmail(updatedDetails.email);
      }

      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error updating details:', error);
      alert('Error updating details.');
    } finally {
      setLoading(false);
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
            value={updatedDetails.firstName}
            handleChangeText={(text) => setUpdatedDetails({ ...updatedDetails, firstName: text })}
          />

          {/* Last Name Field */}
          <Text>Last Name: </Text>
          <AuthFormField
            title="Last Name"
            placeholder="Last Name"
            value={updatedDetails.lastName}
            handleChangeText={(text) => setUpdatedDetails({ ...updatedDetails, lastName: text })}
          />

          {/* Email Field */}
          <Text>Email: </Text>
          <AuthFormField
            title="Email"
            placeholder="Email"
            value={updatedDetails.email}
            handleChangeText={(text) => setUpdatedDetails({ ...updatedDetails, email: text })}
            editable = {false}
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
    borderRadius: 45,
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
