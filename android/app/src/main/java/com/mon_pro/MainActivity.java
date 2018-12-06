package com.mon_pro;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // 显示首屏
        super.onCreate(savedInstanceState);
    }

    @Override
    protected String getMainComponentName() {
        return "mon_pro";
    }

    @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
