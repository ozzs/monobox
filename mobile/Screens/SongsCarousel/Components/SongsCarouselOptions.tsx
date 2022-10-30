/* React / React-Native imports */
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useContext } from 'react'

/* Theme imports*/
import themeContext from '../../../../assets/styles/themeContext'

/* Icons imports */
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons'

/* Music Player imports */
import {
  changeRepeatMode,
  getIndex,
  likeSong,
  repeatIcon,
} from '../SongsCarouselFunctions'
import { useCurrentTrack } from '../../../MusicPlayerServices/MusicPlayerHooks'

interface SongsCarouselOptionsProps {
  repeatMode: string
  setRepeatMode: (str: string) => void
  trackRating: number | boolean | undefined
  setTrackRating: (value: number | boolean) => void
  songIndex: number
}

const SongsCarouselOptions: FC<SongsCarouselOptionsProps> = ({
  repeatMode,
  setRepeatMode,
  trackRating,
  setTrackRating,
  songIndex,
}) => {
  const theme = useContext(themeContext)
  const currentTrack = useCurrentTrack()

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
              likeSong(currentTrack?.id, trackRating, setTrackRating)
            }}
          >
            <AntDesign name={'heart'} size={20} color={'red'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              likeSong(currentTrack?.id, trackRating, setTrackRating)
            }}
          >
            <AntDesign name={'hearto'} size={20} color={theme.icon} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.optionsRightContainer}>
        <TouchableOpacity
          onPress={() => {
            getIndex(songIndex)
          }}
        >
          <Feather
            name='shuffle'
            size={20}
            color={theme.icon}
            style={styles.shuffleIcon}
          />
        </TouchableOpacity>
      </View>
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
    paddingRight: 30,
  },
  shuffleIcon: {
    marginLeft: 15,
  },
})

export default SongsCarouselOptions
