import {Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    marginVertical: 16,
  },
  overlay: {
    borderRadius: 10,
  },
  icon: {
    marginRight: 8,
  },
  buttonIcon: {marginRight: 10},
  buttonStyle: {
    width: 150,
  },
  buttonContainer: {
    width: 150,
    alignSelf: 'center',
  },
})

export default styles
