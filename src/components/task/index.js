import React, {memo, useCallback, useState} from 'react'
import {Card, CheckBox, Icon} from '@rneui/themed'
import styles from './styles'
import PropTypes from 'prop-types'

const Task = ({item, onTaskCompleted, onDelete}) => {
  const [check, setCheck] = useState(item.task.status)

  const onPress = () => {
    console.log('item.stask.status: ', item)
    item.task.status = !item.task.status
    setCheck(item.task.status)
    onTaskCompleted(item)
  }

  const onDeletePress = useCallback(() => {
    onDelete(item)
  }, [item, onDelete])

  return (
    <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
      <CheckBox
        testID="task"
        center
        title={item.task.text}
        checked={check}
        onPress={onPress}
        containerStyle={styles.checkbox}
      />
      <Icon
        testID="delete"
        name="delete"
        color="#00aced"
        containerStyle={styles.trash}
        onPress={onDeletePress}
      />
    </Card>
  )
}

Task.propTypes = {
  item: PropTypes.object,
  onTaskCompleted: PropTypes.func,
  onDelete: PropTypes.func,
}

export default memo(Task)
