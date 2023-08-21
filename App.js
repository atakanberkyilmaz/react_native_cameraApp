import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let camera;
export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [zoomLevel, setZoomLevel] = useState(0);

  const handleCapture = async () => {
    if(camera){
      const options = { quality: 0.7};
      const data = await camera.takePictureAsync(options);

      await MediaLibrary.saveToLibraryAsync()

      console.log("data", data);
    }
  }
  
  const handleZoom = (type) => {
    setZoomLevel(prev => type === '+' ? prev === 100 ? 100 : prev + 10: prev === 0 ? 0 : prev - 10) 
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <Camera 
      style={styles.camera} 
      type={type} 
      zoom = {zoomLevel / 100}
      ref={(ref) => {
        camera =ref;
      }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCapture}>
           

           <Text>{zoomLevel / 100}</Text>
           

            <Text style = {styles.text}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.zoom} 
          onPress = {() => handleZoom("-")}>
            <Text style = {styles.zoomText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoom} 
          onPress = {() => handleZoom("+")}
          disabled = {zoomLevel / 100 === 1}
          >
            <Text style = {styles.zoomText}>+</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "#999",
    flexDirection: 'row',
    marginVertical: 300,
    alignItems: "center",
    justifyContent: "space-around"
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: "#000",
    
  },
  zoom: {
    width: 40,
    height: 40,
    backgroundColor: "#DDD",
    borderRadius: 50,
    justifyContent: "center"
  }
});
