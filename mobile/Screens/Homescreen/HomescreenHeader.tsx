/* React / React-Native imports */
import { View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { FC, useContext } from 'react'

/* Navigation imports */
import { DrawerActions, useNavigation } from '@react-navigation/native'

/* utils imports */
import themeContext from '../../../assets/styles/themeContext'

/* Icons imports */
import { Feather, FontAwesome } from '@expo/vector-icons'

interface HomescreenHeaderProps {
  setModalOpen: (bool: boolean) => void
}

const HomescreenHeader: FC<HomescreenHeaderProps> = ({ setModalOpen }) => {
  const theme = useContext(themeContext)
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <View style={styles.headerIcons}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <FontAwesome name='bars' size={24} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <Feather name='plus-square' size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 35,
  },
})
export default HomescreenHeader
