import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,Image,Button  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import React, { useState } from 'react';



export default function App() {
  const [images, setImage] = useState([]);

  getPermissionAsync = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
      });
  
      
  
      if (!result.canceled) {
        //set image to state
        setImage(result.assets.map((image) => image.uri));

        
      }
      console.log("images: ", images  )
    };
    

  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {
        images.map((image, index) => {
          return (
            <Image
              key={index}
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )
        } )
      }

      {/* {images && <Image source={{ uri: images }} style={{ width: 200, height: 200 }} />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


});
