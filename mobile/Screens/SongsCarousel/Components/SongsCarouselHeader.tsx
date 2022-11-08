/* React / React-Native imports */
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'

/* Navigation imports */
import { useNavigation } from '@react-navigation/native'

/* utils imports */
import themeContext from '../../../../assets/styles/themeContext'

/* Icons imports*/
import { AntDesign } from '@expo/vector-icons'

const SongsCarouselHeader = () => {
  const theme = useContext(themeContext)
  const navigation = useNavigation()

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.headerLeftContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='arrowleft' size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={[styles.playingNowTitle, { color: theme.primary }]}>
          Playing Now
        </Text>
      </View>
      <View style={styles.headerRightContainer} />
    </View>
  )
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 35,
  },
  headerLeftContainer: {
    flex: 1,
    paddingLeft: 30,
  },
  playingNowTitle: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
    textAlign: 'center',
  },
  headerRightContainer: {
    flex: 1,
    paddingRight: 30,
  },
})

export default SongsCarouselHeader
