# Bitcamp App 2017
### Set up
1. Install Node, NPM
2. Install the React Native CLI: `npm install -g react-native-cli`
3. Clone this repository
4. Install our dependencies: run `npm install` in the directory `package.json` is in
5. For Android: install Android Studio, start an emulator, and run `react-native run-android`
6. For iOS: install Xcode and run `react-native run-ios`
7. Try editing `index.android.js` or `index.ios.js` and reloading the app

Most of this comes from the [React Native Docs](https://facebook.github.io/react-native/docs/getting-started.html).

### Generating Signed APK for Android

Follow the docs at [Generating Signed APK](http://facebook.github.io/react-native/releases/0.32/docs/signed-apk-android.html).

In `node_modules/react-native/react.gradle`, add:
  ```gradle
  doLast {
      def moveFunc = { resSuffix ->
          File originalDir = file("${resourcesDir}/drawable-${resSuffix}")
          if (originalDir.exists()) {
              File destDir = file("${resourcesDir}/drawable-${resSuffix}-v4")
              ant.move(file: originalDir, tofile: destDir)
          }
      }
      moveFunc.curry("ldpi").call()
      moveFunc.curry("mdpi").call()
      moveFunc.curry("hdpi").call()
      moveFunc.curry("xhdpi").call()
      moveFunc.curry("xxhdpi").call()
      moveFunc.curry("xxxhdpi").call()
  }
  ```
in the `currentBundleTask`'s creation block before generating the release APK.
Solution found from this issue: https://github.com/facebook/react-native/issues/5787
