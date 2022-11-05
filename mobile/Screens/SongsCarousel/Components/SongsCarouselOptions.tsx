/* React / React-Native imports */
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useContext } from 'react'

/* Theme imports*/
import themeContext from '../../../../assets/styles/themeContext'

/* Icons imports */
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

/* Music Player imports */
import { changeRepeatMode, repeatIcon } from '../SongsCarouselFunctions'
import { useCurrentTrack } from '../../../MusicPlayerServices/MusicPlayerHooks'
import { useRateSong } from '../../../hooks/HooksAPI'

interface SongsCarouselOptionsProps {
  repeatMode: string
  setRepeatMode: (str: string) => void
  trackRating: number | boolean | undefined
  setTrackRating: (value: number | boolean) => void
}

const SongsCarouselOptions: FC<SongsCarouselOptionsProps> = ({
  repeatMode,
  setRepeatMode,
  trackRating,
  setTrackRating,
}) => {
  const theme = useContext(themeContext)
  const currentTrack = useCurrentTrack()

  const { mutate: rateSong } = useRateSong(trackRating, setTrackRating)

  return (
    <View style={styles.optionsWrapper}>
      <View style={styles.optionsLeftContainer}>
        <TouchableOpacity
          onPress={() => changeRepeatMode(repeatMode, setRepeatMode)}
        >
          <MaterialCommunityIcons
            name={repeatIcon(repeatMode)}
            size={20}
            color={repeatMode !== 'off' ? theme.primary : theme.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.optionsCenterContainer}>
        {trackRating ? (
          <TouchableOpacity
            onPress={() => {
              rateSong(currentTrack?.id)
            }}
          >
            <AntDesign name={'heart'} size={20} color={'red'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              rateSong(currentTrack?.id)
            }}
          >
            <AntDesign name={'hearto'} size={20} color={theme.icon} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.optionsRightContainer}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  optionsWrapper: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionsLeftContainer: {
    flex: 1,
    paddingLeft: 30,
  },
  optionsCenterContainer: {
    flex: 1,
    alignItems: 'center',
  },
  optionsRightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 30,
  },
  shuffleIcon: {
    marginLeft: 15,
  },
})

export default SongsCarouselOptions
