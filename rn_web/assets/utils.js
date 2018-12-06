import React from "react";
import {Dimensions,PixelRatio} from "react-native";

export const utils={//图片分辨率获取引入
    uiWiddth:375,
    uiHeight:667,
    pixel:1/PixelRatio.get(),
    screenWidth:Dimensions.get("window").width,
    screenHeight:Dimensions.get("windon").height,
    pixelRatio:PixelRatio.get(),
    fontScale:PixelRatio.getFontScale(),
    scale:Math.min(Dimensions.get("window").height/667,Dimensions.get("window").width/375),
    autowidth:function(val){
        return Dimensions.get("window").wioth * val / this.uiWiddth;
    },
    autoheight:function(val){
        return Dimensions.get("window").height * val / this.uiHeight;
    },
    get: function (url, successCallback, failCallback) {
        fetch(url).then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            }).catch(function (err) {
            failCallback(err);
        });
    },
    /*字体大小适配，例如我的设计稿字体大小是17pt，那么使用就是：utils.setSpText(17)*/
    setSpText: function (number) {
        number = Math.round((number * this.scale + 0.5) * this.pixelRatio / this.fontScale);
        return number / PixelRatio.get();
    },
    /*通过value删除数组元素*/
    removeByValue: function (arr, value) {
        let i = arr.length;
        while (i--) {
            if (arr[i] === value) {
                arr.splice(i, 1);
            }
        }
    },
    /*判断是否存在数组*/
    isInArray: function (arr, value) {
        let i = arr.length;
        while (i--) {
            if (arr[i] === value) {
                return true
            }
        }
    }
};