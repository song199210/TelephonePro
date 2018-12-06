package com.mon_pro;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.lang.String;

public class CallPhoneModule extends ReactContextBaseJavaModule {
    public static final int PERMISSION_REQUESTCODE=10111;
    public ReactApplicationContext reactContext;

    public CallPhoneModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @ReactMethod
    public void callPhone(String phoneString) {
        Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + phoneString));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        if (ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            ActivityCompat.requestPermissions(reactContext.getCurrentActivity(), new String[]{Manifest.permission.CALL_PHONE}, PERMISSION_REQUESTCODE);
            return;
        }
        this.reactContext.startActivity(intent);
    }
//    @Override
//    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//        switch (requestCode) {
//            case PERMISSION_REQUESTCODE: //拨打电话
//                if (permissions.length != 0 && grantResults[0] != PackageManager.PERMISSION_GRANTED) {//失败
//                    Toast.makeText(reactContext, "请允许拨号权限后再试", Toast.LENGTH_SHORT).show();
//                }
//                break;
//        }
//    }
    @Override
    public String getName() {
        return "CallPhoneModule";
    }
}