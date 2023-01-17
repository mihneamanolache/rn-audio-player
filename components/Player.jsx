import axios from 'axios';
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

import Button from './Button'

import { colors } from '../constants/colors'
import { GOOGLE } from '../constants/google';

export default function Player(props) {
    const [sound, setSound] = useState();
    const [img, setImg] = useState(require('../assets/idk.png'))
    const [repeat, setRepeat] = useState(false)
    const [repeatBtnColor, setRepeatBtnColor] = useState(colors.disableGreen)

    const playSound = async () => {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true});
        const { sound } = await Audio.Sound.createAsync({ uri: props.uri });
        await sound.setIsLoopingAsync(repeat)
        setSound(sound);
        await sound.playAsync();
    }

    const stopSound = () => setSound(null) 
      
    const repeatSound = async () => {
        setRepeatBtnColor(repeatBtnColor === colors.disableGreen ? colors.green : colors.disableGreen)
        setRepeat(repeat === false ? true : false)
    }

    const getCoverImage = async () => {
        try{
          let r = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE.API}&cx=${GOOGLE.CX}&q=${encodeURIComponent(props.name)}&searchType=image&fileType=jpg&imgSize=large&alt=json`)
          setImg({uri: r.data.items[0].link})  
        } catch (e) {
            console.error(e)
        }    
    }
    
    useEffect(()=>{
        getCoverImage()
    }, [props.name])

    useEffect(() => {
        return sound
          ? () => {
              sound.unloadAsync();
            }
          : undefined;
    }, [sound]);

  return (
    <View style={styles.songCard}>
        <Image
            style={styles.img}
            source={img}/>
        
        <Button 
            title='Play'
            onPress={playSound}
            btnStyle={styles.playBtn}
            textStyle={styles.textPlay}/>

        <View style={styles.smallBtns}>
            <Button 
                title='Stop'
                onPress={stopSound}
                btnStyle={styles.stopBtn}
                textStyle={styles.smallBtnText}/>
            <Button 
                title='Repeat'
                onPress={repeatSound}
                btnStyle={{...styles.repeatBtn,  backgroundColor: repeatBtnColor}}
                textStyle={styles.smallBtnText}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    songCard: {
        padding: 10,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").width * 0.8,
        borderRadius: 10,
    },
    playBtn: {
        marginTop: 40,
        padding: 20,
        borderRadius: 10,
        margin: 10,
        width: Dimensions.get("window").width * 0.8,
        textAlign: 'center',
        backgroundColor: colors.green  
    },
    textPlay:{
        color: colors.white,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 20,
    },
    smallBtnText:{
      padding: 20,
      fontSize: 15,
      color: colors.white,
      textAlign: 'center',
    },
    smallBtns:{
      flexDirection: 'row', 
      flexWrap: 'wrap',
    },
    stopBtn:{
      backgroundColor: colors.red,
      margin: 10,
      width: Dimensions.get("window").width * 0.38,
      borderRadius: 10,
    },
    repeatBtn:{
      margin: 10,
      width: Dimensions.get("window").width * 0.38,
      borderRadius: 10,
    }
})