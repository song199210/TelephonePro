import React from "react";
import {View,Text,TextInput,StyleSheet,Switch,Button,TouchableOpacity,Dimensions,Image,ToastAndroid} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import SYImagePicker from 'react-native-syan-image-picker';
// import SQLite from "../assets/sqlite";
import {DecorateM} from "../assets/common";

const UserIcon = (<Icon name='user' size={20} color="#999" />);
const PhoneIcon = (<Icon name="phone" size={20} color="#999" />);
const UploadIcon = (<Icon name="upload" size={60} color="#999" />);
const pickerOptions={
    isCamera:false,
    imageCount: 1, 
    isRecordSelected: true,
    CropH:160,
    isCrop:true,
    enableBase64:true
};

// const sqliteObj=new SQLite();
class AddPhoneCom extends React.PureComponent {
    constructor(props){
        super(props);
        this.state={
            // istrue:true, //是否开启图文展示
            istype:"add", //默认是新增
            id:"",//联系人ID
            name:"", //联系人姓名
            phone:"",  //联系人手机
            imgstr:"" //联系人头像
        }
        this.selectPicker=this.selectPicker.bind(this);
        this.saveDataJson=this.saveDataJson.bind(this);
        this.delPhoeData=this.delPhoeData.bind(this);
        this.getPhoneId=this.getPhoneId.bind(this);
    }
    componentDidMount() {
        const name=this.props.navigation.getParam("name");
        if(name == undefined && !name){//判断是否是新增还是编辑进入页面
            return false;
        }
        Object.assign(this.props.navigation.state.params,{delPhoeFuns:this.delPhoeData});
        const idStr=this.props.navigation.getParam("id");
        const phone=this.props.navigation.getParam("phone");
        const imgbasestr=this.props.navigation.getParam("imgbasestr");
        const type=this.props.navigation.getParam("type");
        this.setState({
            id:idStr,
            name:name,
            phone:phone,
            imgstr:imgbasestr,
            istype:type
        });
    }
    static navigationOptions = (props)=>{
        let obj=props.navigation.state.params;
        if(!obj && obj == undefined){
            obj={};
            obj['type']="add";
        }
        return {
            headerTitle:(<Text style={{ flex: 1,color:"#fff",fontSize:18,textAlign: 'center' }}>添加联系人</Text>),
            headerBackImage:(<Icon name='angle-left' size={32} color="#fff" />),
            headerStyle:{
                backgroundColor:"#43b07d"
            },
            headerTitleStyle:{
                color:"#fff"
            },
            headerBackTitleStyle:{
                color:"#fff"
            },
            headerRight:(obj['type'] == "add"?<View/>:<Icon name='trash' size={30} color="#fff" onLongPress={()=>obj.delPhoeFuns(obj.id)} />),
            headerRightContainerStyle:{
                paddingRight:10
            }
        }
    };
    selectPicker(){
        SYImagePicker.asyncShowImagePicker(pickerOptions)
        .then(photos => {
          // 选择成功
          this.setState({
            imgstr:photos[0]['base64']
          })
        })
        .catch(err => {
          // 取消选择，err.message为"取消"
        });  
    }
    getPhoneId(){//获取手机ID
        var arr=['a','b','c','d','e','f','g','h','m','n'];
        return (new Date().getTime().toString()+(arr.slice(0,parseInt(Math.random()*10)).join("")));
    }
    delPhoeData(idStr){
        const _that=this;
        async function delPhoneUserList(){//删除数据
            let result=await global.storage.load({key:"phoneUserList"});
            let i=0,len=result.length;
            for(;i<len;i++){
                if(idStr == result[i].id){
                    result.splice(i,1);
                    break;
                }
            }
            await global.storage.save({key:"phoneUserList",data:result});
            ToastAndroid.show("删除成功",ToastAndroid.SHORT);
            DecorateM.publish("changeRNStorage");
            _that.props.navigation.navigate("FlatList");
            
        }
        delPhoneUserList();
    }
    saveDataJson(){
        const _that=this;
        var obj={
            name:this.state.name,
            phone:this.state.phone,
            imgstr:this.state.imgstr
        }
        if(obj['name'] == ""){
            ToastAndroid.show("联系人姓名不能为空!",ToastAndroid.SHORT);
            return false;
        }
        if(obj['phone'] == ""){
            ToastAndroid.show("电话号码不能为空!",ToastAndroid.SHORT);
            return false;
        }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(obj['phone']))){ 
            ToastAndroid.show("手机号码有误，请重填!",ToastAndroid.SHORT);
            return false; 
        } 
        async function addPhoneUserList(){//新增数据
            const id=_that.getPhoneId();
            obj['id']=id;
            try{
                let result=await global.storage.load({key:"phoneUserList"});
                result.push(obj)
                await global.storage.save({key:"phoneUserList",data:result});
            }catch(err){
                await global.storage.save({key:"phoneUserList",data:[obj]});
            }
            ToastAndroid.show("新增成功",ToastAndroid.SHORT);
            DecorateM.publish("changeRNStorage");
            _that.props.navigation.navigate("FlatList");
        }
        async function updatePhoneUserList(){//更新数据
            let result=await global.storage.load({key:"phoneUserList"});
            let i=0,len=result.length;
            const idStr=_that.state.id;
            for(;i<len;i++){
                if(idStr == result[i].id){
                    obj['id']=idStr;
                    result.splice(i,1,obj);
                    break;
                }
            }
            await global.storage.save({key:"phoneUserList",data:result});
            ToastAndroid.show("修改成功",ToastAndroid.SHORT);
            DecorateM.publish("changeRNStorage");
            _that.props.navigation.navigate("FlatList");
        }
        if(this.state.istype == "add"){
            addPhoneUserList();
        }else{
            updatePhoneUserList();
        }
        // if(obj['imgstr'] == ""){
        //     ToastAndroid.show("联系人姓名不能为空!",ToastAndroid.SHORT);
        //     return false;
        // }
    }
    render(){
        let pickerImgCom=null;
        const baseObj={uri:this.state.imgstr};
        if(this.state.imgstr == ""){
            pickerImgCom=(
                <TouchableOpacity onPress={this.selectPicker}>
                    <View style={styles.uIcon}>{UploadIcon}</View>
                    <Text style={styles.uploadText}>图片上传</Text>
                </TouchableOpacity>
            );
        }else{
            pickerImgCom=(
                <TouchableOpacity style={styles.ImageItemStyles} onPress={this.selectPicker}>
                    <Image
                    style={styles.showPickerImg}
                    source={baseObj}/>
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.addPhoneBox}>
                <View style={[styles.InputGroup,{marginTop:12}]}>
                    <View style={styles.icons}>{UserIcon}</View>
                    <TextInput
                    style={styles.FormControl}
                    defaultValue={this.state.name}
                    onChangeText={(text)=>{this.setState({name:text})}}
                    placeholder="联系人"/>
                </View>
                <View style={styles.InputGroup}>
                    <View style={styles.icons}>{PhoneIcon}</View>
                    <TextInput
                    style={styles.FormControl}
                    defaultValue={this.state.phone}
                    keyboardType='numeric'
                    onChangeText={(text)=>{this.setState({phone:text})}}
                    placeholder="手机号码"/>
                </View>
                {/* <View style={[styles.InputGroup,styles.SwitchGroup]}>
                    <Switch
                    onValueChange={(value) => this.setState({istrue: value})}
                    trackColor="#586dfd"
                    value={this.state.istrue} />
                    <Text>是否开启图文展示</Text>
                </View> */}
                <View style={styles.ImagePicker}>
                    {pickerImgCom}
                </View>
                <View style={styles.BtnGroup}>
                    <Button
                    onPress={this.saveDataJson}
                    title="保存"
                    color="#43b07d"
                    />
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    addPhoneBox:{
        padding:6
    },
    InputGroup:{
        borderWidth:1,
        borderColor:"#ddd",
        display:"flex",
        flexDirection:"row",
        marginBottom:8
    },
    SwitchGroup:{
        borderWidth:0
    },
    ImagePicker:{
        display:"flex",
        height:180,
        borderWidth:1,
        borderColor:"#ddd",
        justifyContent: 'center',
        textAlignVertical:"center",
        alignItems: 'center',
        marginBottom:10
    },
    ImageItemStyles:{
        width:Dimensions.get('window').width-12,
        flex:1
    },
    showPickerImg:{
        resizeMode:'cover',
        width:Dimensions.get('window').width-12,
        height:180
    },
    icons:{
        width:40,
        height:40,
        justifyContent: 'center',
        textAlignVertical:"center",
        alignItems: 'center'
    },
    FormControl:{
        flex:1,
        justifyContent: 'center',
        textAlignVertical:"center",
        alignItems: 'center',
        padding:0,
        paddingLeft:8
    }
});

export default AddPhoneCom;