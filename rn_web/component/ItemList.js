import React from "react";
import {TouchableOpacity,View,Text,StyleSheet,Image,Dimensions,Platform,NativeModules} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {BoxShadow} from 'react-native-shadow';

let PhoneIcon = (<Icon name='phone' size={40} color="#fff" />);
const shadowOpt = {
    width:Dimensions.get("window").width,
    height:300,
    color:"#000",
    border:2,
    radius:0,
    opacity:0.1,
    x:2,
    y:2,
    style:{marginVertical:5}
};
let modules=null;
if(Platform.OS == "android"){
    modules =NativeModules.CallPhoneModule;
}
class ItemListCom extends React.Component {
    constructor(props){
        super(props);
        this._onPress=this._onPress.bind(this);
        this.callPhoneNum=this.callPhoneNum.bind(this);
    }
    callPhoneNum(phoneStr){
        modules.callPhone(phoneStr)
    }
    _onPress(){
        const obj={
            id:this.props.id,
            name:this.props.name,
            phone:this.props.phone,
            imgbasestr:this.props.imgbasestr,
            type:"edit"
        }
        this.props.navigation.push("AddPhone",obj);
        
    }
    componentDidMount() {
        // Image.getSize(this.props.image, (width, height) => {
        //     height = screenWidth * height / width; //按照屏幕宽度进行等比缩放
        //     this.setState({screenWidth, height});
        // });
    }
    render(){
        var ItemCom=null;
        var isType="0";//0表示图文,1表示列表
        var _that=this;
        var imgUserCom=null;
        if(this.props.imgbasestr == "" || this.props.imgbasestr == undefined){
            imgUserCom=(
                <View  style={{borderWidth:1,borderColor:"#ddd",flex:1,
                justifyContent: 'center',
                textAlignVertical:"center",
                alignItems: 'center'}}>
                    <Text style={{fontSize:24}}>暂无头像</Text>
                </View>);
        }else{
            imgUserCom=(
                <Image style={styles.imageStyle}
                source={{uri:this.props.imgbasestr}}/>
            );
        }
        if(isType == "0"){
            const phoneStr=this.props.phone;
            ItemCom=(
                    <View style={{flex:1}}>
                        <View style={styles.imageItemStyle}>{imgUserCom}</View>
                        <View style={styles.textItemStyle}>
                            <View style={styles.textGroup}>
                                <Text style={styles.textTitleStyle}>{this.props.name}</Text>
                                <Text style={styles.textConStyle}>{this.props.phone}</Text>
                            </View>
                            <TouchableOpacity style={styles.dialPhone} onPress={()=>{_that.callPhoneNum(phoneStr)}}>
                                {PhoneIcon}
                            </TouchableOpacity>
                        </View>
                    </View>
                    );
        }else{
            shadowOpt.height=124;
            ItemCom=(
                <View style={styles.textItemStyle}>
                    <View style={styles.textGroup}>
                        <Text style={styles.textTitleStyle}>{this.props.name}</Text>
                        <Text style={styles.textConStyle}>{this.props.phone}</Text>
                    </View>
                    <View style={styles.dialPhone} onPress={()=>{_that.callPhoneNum(phoneStr)}}>
                        {PhoneIcon}
                    </View>
                </View>
            );
        }
        return (
            <BoxShadow setting={shadowOpt}>
                <View style={styles.itemStyle}>
                    <TouchableOpacity style={{flex:1}} onLongPress={()=>_that._onPress()}>
                        {ItemCom}
                    </TouchableOpacity>
                </View>
            </BoxShadow>
        );
    }
}

const styles=StyleSheet.create({
    itemStyle:{
        borderWidth:1,
        borderColor:"#eee",
        flex:1,
        flexDirection:"row",
        justifyContent: 'center',
        textAlignVertical:"center",
        alignItems: 'center',
        marginLeft:8,
        marginRight:8,
        marginTop:8,
        padding:6,
        backgroundColor:"#fff",
        shadowColor:'#000',
        shadowRadius:3,
        shadowOpacity:0.8,
    },
    imageItemStyle:{
        height:147,
        flex:1,
    },
    imageStyle:{
        resizeMode:'cover',
        borderWidth:1,
        width:Dimensions.get('window').width-30,
        height:182
    },
    textItemStyle:{
        paddingTop:6,
        paddingBottom:6,
        paddingLeft:10,
        paddingRight:10,
        display:"flex",
        flexDirection:"row",
        justifyContent: 'center',
        textAlignVertical:"center",
        alignItems: 'center',
    },
    textGroup:{
        flex:1,
    },
    dialPhone:{
        width:80,
        height:80,
        backgroundColor:"#E02929",
        borderRadius:50,
        justifyContent: 'center',
        textAlignVertical:"center",
        alignItems: 'center',
    },
    textTitleStyle:{
        fontWeight:"bold",
        fontSize:26,
    },
    textConStyle:{
        fontSize:24,
    }
});

export default ItemListCom;