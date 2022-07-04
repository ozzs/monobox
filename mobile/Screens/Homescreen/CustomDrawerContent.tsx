import React, { useState, useContext } from 'react'
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'
import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../../../assets/styles/themeContext'
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const theme = useContext(themeContext)
  const [mode, setMode] = useState(true)
  return (
    <DrawerContentScrollView
      {...props}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Feather name='x' size={24} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMode(!mode)
            EventRegister.emit('changeTheme', mode)
          }}
        >
          <Feather name='moon' size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>
      <DrawerItem
        label={'Profile'}
        labelStyle={[styles.drawerRow, { color: theme.primary }]}
        icon={() => <AntDesign name='user' size={20} color={theme.icon} />}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
      <DrawerItem
        label={'Liked Songs'}
        labelStyle={[styles.drawerRow, { color: theme.primary }]}
        icon={() => <AntDesign name='hearto' size={20} color={theme.icon} />}
        onPress={() => props.navigation.navigate('LikedSongs')}
      />
      <DrawerItem
        label={'Contact Us'}
        labelStyle={[styles.drawerRow, { color: theme.primary }]}
        icon={() => (
          <MaterialCommunityIcons
            name='message-text-outline'
            size={20}
            color={theme.icon}
          />
        )}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
      <DrawerItem
        label={'FAQs'}
        labelStyle={[styles.drawerRow, { color: theme.primary }]}
        icon={() => (
          <MaterialCommunityIcons
            name='lightbulb-on-outline'
            size={20}
            color={theme.icon}
          />
        )}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
      <DrawerItem
        label={'Settings'}
        labelStyle={[styles.drawerRow, { color: theme.primary }]}
        icon={() => (
          <MaterialCommunityIcons
            name='cog-outline'
            size={20}
            color={theme.icon}
          />
        )}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
      <DrawerItem
        label={'Song Carousel'}
        labelStyle={[styles.drawerRow, { color: theme.primary }]}
        onPress={() => props.navigation.navigate('SongsCarousel')}
      />
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 40,
  },
  drawerRow: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
  },
})

export default CustomDrawerContent
