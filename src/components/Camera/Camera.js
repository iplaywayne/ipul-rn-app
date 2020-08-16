import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Slider from '@react-native-community/slider'
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { height } from '../../constants'


const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const landmarkSize = 2;

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
      normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: Dimensions.get('window').width * 0.5 - 32,
        y: Dimensions.get('window').height * 0.5 - 32,
      },
    },
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 10,
      quality: RNCamera.Constants.VideoQuality['288p'],
    },
    isRecording: false,
    canDetectFaces: false,
    canDetectText: false,
    canDetectBarcode: false,
    faces: [],
    textBlocks: [],
    barcodes: [],
  };

  componentWillUnmount() {
    this.stopVideo()
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  takePicture = async function () {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      console.log(data)
      this.props.dataUri(data.uri)
      this.props.dataType('image')
    }
  };

  takeVideo = async () => {
    const { isRecording } = this.state;
    if (this.camera && !isRecording) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          this.props.dataUri(data.uri)
          this.props.dataType('video')
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      this.stopVideo()
    }
  };

  stopVideo = async () => {
    await this.camera.stopRecording();
    this.setState({ isRecording: false });
  };


  renderCamera() {

    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    };
    return (
      <RNCamera
        ref={ref => this.camera = ref}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >

        <View>
          <TouchableOpacity
            style={{ position: 'absolute', top: 170, zIndex: 10, left: 47 }}
            onPress={this.toggleFacing.bind(this)}
          >
            <MaterialCommunityIcons name="camera" color={'white'} size={26} />
          </TouchableOpacity>
        </View>


        <View style={{ width: '100%', alignItems: 'center', marginBottom: 30 }}>

          {this.props.mode == 'camera' &&
            <TouchableOpacity
              style={[
                styles.flipButton,
              ]}
              onPress={() => this.takePicture()}
            >
              <MaterialCommunityIcons name="circle" color={'#fff'} size={75} />
              <Text style={{ color: '#fff' }}>Camera Ready</Text>
            </TouchableOpacity>}

          {this.props.mode == 'video' &&
            <TouchableOpacity
              style={[
                styles.flipButton,
              ]}
              onPress={() => this.takeVideo()}
            >
              <MaterialCommunityIcons name="circle"
                color={this.state.isRecording ? 'darkred' : 'skyblue'} size={75} />
              <Text style={{ color: '#fff' }}>
                {!this.state.isRecording ? 'Record Ready' : 'Recording'}
              </Text>
            </TouchableOpacity>}
        </View>

      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'transparent',
  },
  flipButton: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});