import React from 'react'
import {Text} from 'react-native'

const Render = () => {
  return <Text>{new Date().getMilliseconds()}</Text>
}

export default Render
