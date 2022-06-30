import React from 'react'
import { StyleSheet, View, Platform, StatusBar } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'
import colors from '../../../assets/colors/colors'
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Feather name='x' size={24} color={colors.secondary} />
        </TouchableOpacity>
        <Feather name='moon' size={24} color={colors.secondary} />
      </View>
      <DrawerItem
        label={'Profile'}
        labelStyle={styles.drawerRow}
        icon={() => (
          <AntDesign name='user' size={20} color={colors.drawerIcon} />
        )}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
      <DrawerItem
        label={'Liked Songs'}
        labelStyle={styles.drawerRow}
        icon={() => (
          <AntDesign name='hearto' size={20} color={colors.drawerIcon} />
        )}
        onPress={() => props.navigation.navigate('LikedSongs')}
      />
      <DrawerItem
        label={'Contact Us'}
        labelStyle={styles.drawerRow}
        icon={() => (
          <MaterialCommunityIcons
            name='message-text-outline'
            size={20}
            color={colors.drawerIcon}
          />
        )}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
      <DrawerItem
        label={'FAQs'}
        labelStyle={styles.drawerRow}
        icon={() => (
          <MaterialCommunityIcons
            name='lightbulb-on-outline'
            size={20}
            color={colors.drawerIcon}
          />
        )}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
      <DrawerItem
        label={'Settings'}
        labelStyle={styles.drawerRow}
        icon={() => (
          <MaterialCommunityIcons
            name='cog-outline'
            size={20}
            color={colors.drawerIcon}
          />
        )}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
      <DrawerItem
        label={'Song Carousel'}
        labelStyle={styles.drawerRow}
        onPress={() => props.navigation.navigate('SongsCarousel')}
      />
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
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
    color: colors.drawerTitle,
  },
})

export default CustomDrawerContent
