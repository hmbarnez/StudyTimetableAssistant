// PasswordPrompt.js
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PasswordPrompt = ({ visible, onConfirm, onCancel }) => {
    const [password, setPassword] = useState('');

    const handleConfirm = () => {
        onConfirm(password);
        setPassword(''); // Clear the password input
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Confirm Deletion</Text>
                    <Text>Please enter your password to confirm the deletion of your account.</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Cancel" onPress={onCancel} />
                        <Button title="Delete" onPress={handleConfirm} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default PasswordPrompt;
