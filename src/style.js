import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  avatar: {
    marginVertical: 24,
    marginHorizontal: 24,
    backgroundColor: 'grey',
  },
  add: {
    flexDirection: 'row-reverse',
  },
  taskContainer: {
    height: '60%',
  },
  scrollView: {
    flexGrow: 0,
  },
  center: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  emptyContainer: {
    flex: 1,
    marginTop: 80,
    marginHorizontal: 24,
  },
  penContainer: {alignItems: 'center', marginTop: 16},
  penImage: {
    height: 100,
    width: 100,
    opacity: 0.4,
  },
  penText: {marginTop: 32, marginRight: 'auto', marginLeft: 'auto'},
  boaredText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 16,
  },
})

export default styles
