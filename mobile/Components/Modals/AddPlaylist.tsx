import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useContext, useState } from 'react'
import { windowWidth } from '../../utils/Dimensions'
import themeContext from '../../../assets/styles/themeContext'
import theme from '../../../assets/styles/theme'
import { TextInput } from 'react-native-gesture-handler'

interface addPlaylistProps {
  setModalOpen: (bool: boolean) => void
}

const AddPlaylist: FC<addPlaylistProps> = ({ setModalOpen }) => {
  const theme = useContext(themeContext)
  const [playlistName, setPlaylistName] = useState<string>()
  return (
    <View style={styles.container}>
      <View style={{ ...styles.modal, backgroundColor: theme.background }}>
        <View style={styles.textView}>
          <Text style={{ ...styles.modalTitle, color: theme.primary }}>
            Give your playlist a name
          </Text>
          <TextInput
            style={{ ...styles.input, borderBottomColor: theme.primary }}
            value={playlistName}
            onChangeText={setPlaylistName}
          />
          <View style={styles.buttonsView}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalOpen(false)}
            >
              <Text style={{ color: theme.icon }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => {}}>
              <Text style={{ color: theme.author }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
  modal: {
    height: 200,
    width: windowWidth - 80,
    borderRadius: 10,
  },
  textView: {
    flex: 1,
    alignItems: 'center',
  },
  modalTitle: {
    margin: 30,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    width: windowWidth - 150,
    color: 'white',
    fontSize: 18,
  },
  buttonsView: {
    flex: 1,
    flexDirection: 'row',
    width: '80%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 30,
    alignItems: 'center',
  },
})

export default AddPlaylist
