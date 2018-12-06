import React,{AsyncStorage} from "react-native";

export class Storage {
    static get(key){
        return AsyncStorage.getItem(key).then((value)=>{
            const jsonVal=JSON.parse(value);
            return jsonVal;
        })
    }
    static save(key,val){
        return AsyncStorage.setItem(key,JSON.stringify(val))
    }
    static update(key,val){
        return Storage.get(key).then((item)=>{
            const value=typeof val=="string"?val:Object.assign({},item,val);
            return AsyncStorage.getItem(key,JSON.stringify(value))
        })
    }
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }
}
const Decorate=function(){
    this.subscribelist={};
    this.subscribe=function(etype,efuns){//订阅事件
        if(etype && typeof etype == "string"){
            if(efuns && efuns instanceof Object){
                this.subscribelist[etype]=efuns;    
            }else{
                console.warn("回调函数不存在");
            }
        }else{
            console.log("请定义事件类型");
        }
    }
    this.publish=function(etype){//发布事件
        if(etype && typeof etype == "string"){
            if(this.subscribelist[etype] != undefined && this.subscribelist[etype]){
                this.subscribelist[etype]();
            }else{
                console.warn("没有注册"+etype+"该事件");
            }
        }else{
            console.warn("没有注册"+etype+"该事件");
        }
    }
}
export const DecorateM=new Decorate();