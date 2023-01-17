import { Dimensions, StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors } from '../constants/colors'

export default function LoadSongButton(props) {
  return (
    <TouchableOpacity
        onPress={props.onPress}
        style={styles.loadBtn}>
          <Text
            style={styles.loadBtnText}>
            Load Audio
          </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    loadBtn: {
        height: 100,
        width: Dimensions.get('screen').width,
        backgroundColor: colors.green,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        bottom: 0
      },
      loadBtnText: {
        textAlign: 'center',
        fontSize: 21,
        color: colors.white,
        fontWeight: 'bold',
      }
})