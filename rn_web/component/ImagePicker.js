import React from "react";
import {View,Text,StyleSheet,TouchableOpacity,Dimensions,Image} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import SYImagePicker from 'react-native-syan-image-picker';

const UploadIcon = (<Icon name="upload" size={60} color="#999" />);
const pickerOptions={
    isCamera:false,
    imageCount: 1, 
    isRecordSelected: true,
    CropH:160,
    isCrop:true,
    enableBase64:true
};
const styles=StyleSheet.create({
    ImageItemStyles:{
        width:Dimensions.get('window').width-12,
        flex:1
    },
    showPickerImg:{
        resizeMode:'cover',
        width:Dimensions.get('window').width-12,
        height:180
    }
});
export default class ImagePickerCom extends React.PureComponent {
    constructor(props){
        super(props);
        this.selectPicker=this.selectPicker.bind(this);
    }
    selectPicker(){
        SYImagePicker.asyncShowImagePicker(pickerOptions)
        .then(photos => {
          this.props.onSuccess(photos[0]['base64'])
        })
        .catch(err => {
          // 取消选择，err.message为"取消"
        });  
    }
    render(){
        let pickerImgCom=null;
        const imgstr=this.props.imgstr;
        if(imgstr == ""){
            pickerImgCom=(
                <TouchableOpacity onPress={this.selectPicker}>
                    <View>{UploadIcon}</View>
                    <Text>图片上传</Text>
                </TouchableOpacity>
            );
        }else{
            const baseObj={uri:imgstr};
            pickerImgCom=(
                <TouchableOpacity style={styles.ImageItemStyles} onPress={this.selectPicker}>
                    <Image
                    style={styles.showPickerImg}
                    source={baseObj}/>
                </TouchableOpacity>
            );
        }
        return pickerImgCom;
    }
}