import React, {memo, useEffect, useState, createRef} from 'react'
import {View} from 'react-native'
import {Icon, Overlay, Button, Input} from '@rneui/themed'
import styles from './style'
import PropTypes from 'prop-types'

const Add = ({visible, onButtonPress, onBackdropPress}) => {
  const [text, setText] = useState('')
  const inputRef = createRef()

  useEffect(() => {
    if (inputRef?.current) {
      inputRef?.current.focus()
    }
  }, [inputRef])

  return (
    <Overlay
      testID="modal"
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      overlayStyle={styles.overlay}>
      <View style={styles.container}>
        <Input
          testID="add_input"
          ref={inputRef}
          onChangeText={setText}
          label="Add todo"
          leftIcon={
            <Icon
              name="badge"
              size={20}
              color="grey"
              containerStyle={styles.icon}
            />
          }
        />
        <Button
          testID="new_button"
          icon={
            <Icon
              name="save"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={styles.buttonIcon}
            />
          }
          title="Save"
          radius="md"
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          onPress={() => onButtonPress(text)}
        />
      </View>
    </Overlay>
  )
}

Add.propTypes = {
  visible: PropTypes.bool,
  onButtonPress: PropTypes.func,
  onBackdropPress: PropTypes.func,
}

export default memo(Add)
