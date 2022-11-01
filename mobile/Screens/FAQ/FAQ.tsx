import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
  Linking,
} from 'react-native'
import React, { useContext, useState } from 'react'
import Accordion from 'react-native-collapsible/Accordion'
import themeContext from '../../../assets/styles/themeContext'
import { FontAwesome } from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native'

const SECTIONS = [
  {
    title: 'What is this music player?',
    content:
      'A lightweight, self-hosted, ad-free player to play music from your local library on your computer, in a friendly and simple UI. \n' +
      'Within this music player, you can categorize your songs by playlists and mark your most favorite songs, which will appear on the "Liked Songs" page.',
  },
  {
    title: 'Where can I find the open-source code?',
    content: (
      <>
        It is available at
        <Text
          onPress={() => Linking.openURL('https://github.com/ozzs/musicPlayer')}
          style={{ fontWeight: 'bold', color: '#5252f2' }}
        >
          {' '}
          this page
        </Text>
      </>
    ),
  },
  {
    title: 'Can I track music from online sources?',
    content: 'Unfortunately no, this music player is for local library only.',
  },
  {
    title: "Can I customise the app's theme to my taste?",
    content:
      'Of course! The default theme is Dark but you can easily change it to Light theme by clicking on the moon icon that appears on the top right corner of the Drawer.',
  },
  {
    title: 'What audio files can I play?',
    content:
      "Make sure all the files in your music folder have an MP3 extension, otherwise you won't be able to play them.",
  },
]

const FAQ = () => {
  const theme = useContext(themeContext)
  const navigation = useNavigation()
  const [activeSections, setActiveSections] = useState<number[] | string[]>([])

  const renderHeader = (section: { title: string; content: string }) => {
    return (
      <View style={[styles.accordionHeader, { backgroundColor: theme.author }]}>
        <Text style={styles.accordionHeaderText}>{section.title}</Text>
      </View>
    )
  }

  const renderContent = (section: { title: string; content: string }) => {
    return (
      <View
        style={[styles.accordionContent, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.accordionContentText, { color: theme.white }]}>
          {section.content}
        </Text>
      </View>
    )
  }

  const updateSections = (activeSections: number[] | string[]) => {
    setActiveSections(activeSections)
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <FontAwesome name='bars' size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.FAQTitle, { color: theme.primary }]}>FAQ</Text>
      <ScrollView>
        <Accordion
          align='bottom'
          sections={SECTIONS}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSections}
          expandMultiple={true}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    paddingVertical: 35,
    paddingLeft: 30,
  },
  FAQTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  accordionHeader: {
    padding: 20,
    marginHorizontal: 30,
    marginBottom: 5,
  },
  accordionHeaderText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  accordionContent: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: '#F5FCFF',
  },
  accordionContentText: {
    textAlign: 'justify',
  },
})

export default FAQ
