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
          <Text style={styles.modalTitle}>Post Song</Text>

          <TextInput
            placeholder="Title"
            placeholderTextColor="grey"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Artist"
            placeholderTextColor="grey"
            value={artist}
            onChangeText={(text) => setArtist(text)}
            style={styles.input}
          />

          <TouchableOpacity onPress={handlePost} style={styles.postButton}>
            <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>

          <Pressable onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
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
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 25,
  },
  input: {
    fontFamily: 'Inter-SemiBold',
    paddingBottom: 3,
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    marginBottom: 25,
  },
  postButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  postText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  cancelText: {
    fontFamily: 'Inter-SemiBold',
    color: 'black',
  },
});
