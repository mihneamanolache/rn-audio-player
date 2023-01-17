import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function Button(props) {
  return (
    <TouchableOpacity style={props.btnStyle} title={props.title} onPress={props.onPress}>
        <Text style={props.textStyle}>{ props.title }</Text>
    </TouchableOpacity>
  )
}