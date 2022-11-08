/* React / React-Native imports */
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useContext } from 'react'

/* Icons imports */
import { AntDesign, Feather } from '@expo/vector-icons'

/* utils imports */
import themeContext from '../../../../assets/styles/themeContext'

/* Music Player imports */
import { State, usePlaybackState } from 'react-native-track-player'
import { useOnTogglePlayback } from '../../../MusicPlayerServices/MusicPlayerHooks'

interface SongsCarouselControllersProps {
  skipToPrevious: () => void
  skipToNext: () => void
}

const SongsCarouselControllers: FC<SongsCarouselControllersProps> = ({
  skipToPrevious,
  skipToNext,
}) => {
  const theme = useContext(themeContext)
  const isPlaying = usePlaybackState() === State.Playing
  const onTogglePlayback = useOnTogglePlayback()

  return (
    <View style={styles.controllersWrapper}>
      <TouchableOpacity onPress={skipToPrevious}>
        <Feather name='skip-back' size={30} color={theme.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onTogglePlayback}>
        <AntDesign
          name={isPlaying ? 'pause' : 'playcircleo'}
          style={{ marginLeft: 40 }}
          size={35}
          color={theme.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={skipToNext}>
        <Feather
          name='skip-forward'
          style={{ marginLeft: 40 }}
          size={30}
          color={theme.primary}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  controllersWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 50,
  },
})

export default SongsCarouselControllers
