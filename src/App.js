import React, { useCallback, useEffect, useState } from "react"
import {
   createTheme,
   ThemeProvider,
   Avatar,
   Icon,
   Text,
   Image,
} from "@rneui/themed"
import { SafeAreaView, ScrollView, View } from "react-native"
import styles from "./style"
import Task from "./components/task"
import { launchImageLibrary } from "react-native-image-picker"
import Add from "./components/add"
import {
   getImage,
   getTasks,
   saveImage,
   saveTasks,
} from "./repository/storageRepository"
import images from "./assets"

const theme = createTheme({
   components: {
      Button: {
         raised: true,
      },
   },
})

/**
 *
 * @returns
 */
const App = () => {
   const [imagePath, setImagePath] = useState({})
   const [tasks, setTasks] = useState(new Map())
   const [overlay, setOverlay] = useState(false)
   const [error, setError] = useState("")

   useEffect(() => {
      const fetchProfilePic = async () => {
         const profilePic = await getImage()
         if (profilePic) {
            setImagePath({
               isImageAvailable: true,
               profilePic: JSON.parse(profilePic),
            })
         }
      }

      const fetchTasks = async () => {
         const result = await getTasks()
         setTasks(new Map(JSON.parse(result)))
      }

      fetchProfilePic().catch((profileError) => {
         setError("an error has occured: ", profileError)
      })
      fetchTasks().catch((tasksError) => {
         setError("an error has occured: ", tasksError)
      })
   }, [])

   const onAvatarPress = useCallback(async () => {
      var options = {
         storageOptions: {
            skipBackup: true,
            path: "images",
         },
      }

      await launchImageLibrary(options, (response) => {
         if (response.didCancel || response.error || response.customButton) {
            console.log("User cancelled image picker")
            return
         }

         const source = response.assets[0].uri
         saveImage(source)
         setImagePath({
            isImageAvailable: true,
            profilePic: source,
         })
      })
   }, [])

   const onTaskCompleted = useCallback(
      (item) => {
         tasks.set(item.key, item.task)
         saveTasks(new Map(tasks))
      },
      [tasks]
   )

   const onNewPress = useCallback(() => {
      setOverlay(true)
   }, [])

   const onOverlayButtonPress = useCallback(() => {
      setOverlay(false)
   }, [])

   const onDelete = useCallback(
      (item) => {
         tasks.delete(item.key)
         setTasks(new Map(tasks))
         saveTasks(new Map(tasks))
      },
      [tasks]
   )

   const onModalButtonPress = useCallback(
      (text) => {
         setOverlay(false)
         if (!text) {
            return
         }

         tasks.set(new Date().getMilliseconds(), {
            text,
            status: false,
         })
         setTasks(new Map(tasks))
         saveTasks(new Map(tasks))
      },
      [tasks]
   )

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <ThemeProvider theme={theme}>
            <Avatar
               size="xlarge"
               rounded
               title="Hi"
               source={
                  imagePath.isImageAvailable
                     ? { uri: imagePath.profilePic }
                     : { uri: undefined }
               }
               containerStyle={styles.avatar}
            >
               <Avatar.Accessory onPress={onAvatarPress} size={30} />
            </Avatar>
            <View style={styles.add}>
               <Icon name="add" raised onPress={onNewPress} />
            </View>
            <Add
               visible={overlay}
               onButtonPress={onModalButtonPress}
               onBackdropPress={onOverlayButtonPress}
            />
            {tasks.size === 0 && (
               <View style={styles.emptyContainer}>
                  <Text style={styles.boaredText}>
                     Let's do it!. I was really bored when I wrote this app.
                     Good test for M2 chip
                  </Text>
                  <View style={styles.penContainer}>
                     <Image source={images.pen} style={styles.penImage} />
                  </View>
                  <Text style={[styles.penText]}>
                     Add new tasks via clicking the plus sign (+)
                  </Text>
               </View>
            )}
            {tasks.size > 0 && (
               <View style={styles.taskContainer}>
                  <ScrollView contentContainerStyle={styles.scrollView}>
                     {tasks &&
                        Array.from(tasks).map((task, index) => (
                           <Task
                              key={index}
                              item={{ key: task[0], task: task[1] }}
                              onTaskCompleted={onTaskCompleted}
                              onDelete={onDelete}
                           />
                        ))}
                  </ScrollView>
               </View>
            )}
         </ThemeProvider>
      </SafeAreaView>
   )
}

export default App
