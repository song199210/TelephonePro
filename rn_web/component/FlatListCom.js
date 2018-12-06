import React, { Component } from 'react';
import {ScrollView,FlatList,Text,Button,View,StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemList from "./ItemList";
import {dataJson} from "../assets/data";
import {DecorateM} from "../assets/common";
import SplashScreen from 'react-native-splash-screen';

class FlatListCom extends React.PureComponent {
    constructor(props){
        super(props);
        this.state={
            phoneUserList:[]
        }
        this._keyExtractor=this._keyExtractor.bind(this);
        this._renderItem=this._renderItem.bind(this);
    }
    componentDidMount(){
        const _that=this;
        async function getPhoneListInfo(){
            let result=await global.storage.load({key:"phoneUserList"});
            _that.setState({
                phoneUserList:result
            })
        }
        getPhoneListInfo();
        SplashScreen.hide();
        DecorateM.subscribe("changeRNStorage",function(){
            getPhoneListInfo();
        });
    }
    static navigationOptions = (props)=>{
        return {
            headerTitle:(<Text style={{ flex: 1,color:"#fff",marginLeft:45,fontSize:18,textAlign: 'center' }}>联系人列表</Text>),
            headerStyle:{
                backgroundColor:"#43b07d"
            },
            headerTitleStyle:{
                color:"#fff",
                textAlign:"center",
                justifyContent: 'center',
                textAlignVertical:"center",
                alignItems: 'center'
            },
            headerRight:<Icon name='plus-circle' size={35} color="#fff" onPress={()=>props.navigation.navigate("AddPhone")} />,
            headerRightContainerStyle:{
                paddingRight:10
            }
        }
    };
    _keyExtractor(){//点击触发事件

    }
    _renderItem({item}){//渲染列表
        return (
            <ItemList
            key={item.id}
            id={item.id}
            imgbasestr={item.imgstr}
            name={item.name}
            phone={item.phone}
            navigation={this.props.navigation}
            />
        );
    }
    render(){
        const phoneUserList=this.state.phoneUserList;
        let wrapCom=null;
        if(!phoneUserList || phoneUserList == undefined || phoneUserList.length == 0){
            wrapCom=(
                <View style={styles.wrapComStyle}>
                    <Text style={{color:"#666",fontSize:20}}>暂无联系人</Text>
                    <View style={styles.wrapComBtnStyle}>
                        <Button
                        onPress={()=>this.props.navigation.navigate("AddPhone")}
                        title="立即添加"
                        style={{flex:1}}
                        color="#43b07d"
                        />
                    </View>
                </View>
            );
        }else{
            wrapCom=(
                <ScrollView>
                    <FlatList
                    data={phoneUserList}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    />
                </ScrollView>
            );
        }
        return wrapCom;
    }
}
const styles=StyleSheet.create({
    wrapComStyle:{
        flex:1,
        justifyContent: 'center',
        textAlignVertical:"center",
        alignItems: 'center'
    },
    wrapComBtnStyle:{
        display:"flex",
        width:110,
        marginTop:14,
        textAlignVertical:"center"
    }
})
export default FlatListCom;