import React from 'react'
import Add from '..'
import {render} from '@testing-library/react-native'
import {act} from 'react-test-renderer'

describe('Add component tests', () => {
  it('it matches snapshot', () => {
    const {toJSON} = render(
      <Add
        visible={true}
        onButtonPress={jest.fn()}
        onBackdropPress={jest.fn()}
      />,
    )
    expect(toJSON()).toMatchSnapshot()
  })

  it('it publishes new todos to parent', () => {
    const mockedButtonPress = jest.fn()
    const mockedBackdropPress = jest.fn()
    const {getByTestId} = render(
      <Add
        visible={true}
        onButtonPress={mockedButtonPress}
        onBackdropPress={mockedBackdropPress}
      />,
    )
    act(() => {
      getByTestId('add_input').props.onChangeText('first to do')
      getByTestId('new_button').props.onClick()
    })

    expect(mockedButtonPress).toHaveBeenCalledTimes(1)
  })
})
