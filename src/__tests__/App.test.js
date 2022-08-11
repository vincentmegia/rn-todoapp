import React from 'react'
import App from '../App'
import {render} from '@testing-library/react-native'
import * as repository from '../repository/storageRepository'
import {act} from 'react-test-renderer'

describe('App container tests', () => {
  it('it matches snapshot', () => {
    const map = new Map()
    map.set(new Date().getMilliseconds(), {text: 'asdf', status: true})
    jest
      .spyOn(repository, 'getTasks')
      .mockReturnValue(JSON.stringify(Array.from(map)))

    jest.spyOn(repository, 'getImage').mockReturnValue('file:///fakefile.jpg')

    const {toJSON} = render(<App />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('it getImage and getTasks throws error', () => {
    jest.spyOn(repository, 'getImage').mockImplementation(() => {
      throw 'simulate error'
    })

    jest.spyOn(repository, 'getTasks').mockImplementation(() => {
      throw 'simulate error'
    })

    render(<App />)
  })
})
