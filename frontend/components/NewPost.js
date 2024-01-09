import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';

export default function NewPost({ visible, onClose, onPost }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  function handlePost() {
    if (!title || !artist) {
      alert('Please fill in all fields');
      return;
    }

    const newSong = {
      id: String(Date.now()),
      title,
      artist,
      time: new Date(),
    };

    onPost(newSong);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Post a new song</Text>

          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Artist"
            value={artist}
            onChangeText={(text) => setArtist(text)}
            style={styles.input}
          />

          <TouchableOpacity onPress={handlePost} style={styles.postButton}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>

          <Pressable onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    marginBottom: 22,
  },
  postButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
