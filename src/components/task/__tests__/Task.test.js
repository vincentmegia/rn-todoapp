import {render} from '@testing-library/react-native'
import Task from '..'
import React from 'react'
import {act} from 'react-test-renderer'

describe('Add components tests', () => {
  const item = {
    key: new Date().getMilliseconds(),
    task: {text: 'write unit test', status: true},
  }

  it('it matches snapshot', () => {
    const {toJSON} = render(
      <Task item={item} onTaskCompleted={jest.fn()} onDelete={jest.fn()} />,
    )
    expect(toJSON()).toMatchSnapshot()
  })

  it('user ticks a task complete', () => {
    const {getByTestId} = render(
      <Task item={item} onTaskCompleted={jest.fn()} onDelete={jest.fn()} />,
    )

    act(() => {
      getByTestId('task').props.onClick()
    })

    expect(item.status).toBeFalsy()
  })

  it('user ticks delete', () => {
    const mockedDelete = jest.fn()
    const {getByTestId} = render(
      <Task item={item} onTaskCompleted={jest.fn()} onDelete={mockedDelete} />,
    )

    act(() => {
      getByTestId('delete').props.onClick()
    })

    expect(mockedDelete).toHaveBeenCalledTimes(1)
  })
})
