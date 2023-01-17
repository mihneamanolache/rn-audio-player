import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import TextTicker from 'react-native-text-ticker'
import { colors } from '../constants/colors'

export default function AppHeader(props) {
  return (
    <View
        style={styles.title}>
          <TextTicker
            duration={3000}
            loop
            bounce={false}
            style={styles.titleText}>
              { props.title }
          </TextTicker>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        height: 120,
        width: Dimensions.get('screen').width,
        backgroundColor: colors.green,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        top: 0
      },
      titleText:{
        marginTop: 40,
        textAlign: 'center',
        fontSize: 21,
        color: colors.white,
        fontWeight: 'bold',
      },
})