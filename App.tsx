/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useContext, useState } from 'react';
import {
  AppRegistry,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

import codePush from 'react-native-code-push';

const isProduction = false;

const deploymentKey_stagging =
  Platform.OS === 'ios'
    ? 'HSS6U3d_kU1_LnJzWZ7y0zbPYeNIrvDuZun_S'
    : '6TJW0uoxkEEgbsZNazZfYbdtQR_i31MggXiXd';

const deploymentKey_production =
  Platform.OS === 'ios'
    ? 'm8SRoZPxGp4xYAgcAXR7V7euSUfwtFvhW13ZE'
    : 'XVaJYGRZP_rFzdiT2XdeuBLBgtqIKbwS4NogX';

let codePushOptions = {
  deploymentKey: isProduction
   ? deploymentKey_production
   : deploymentKey_stagging,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {

  
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {  

  const [status, setStatus] = useState("");

  function codePushStatusDidChange(syncStatus: any) {
    useContext
    switch(syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        // AlertIOS.alert({ syncMessage: "Checking for update." });
        setStatus("Checking for update.")
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        // console.log({ syncMessage: "Downloading package." });
        setStatus("Downloading package.")
        break;
        case codePush.SyncStatus.AWAITING_USER_ACTION:
          console.log({ syncMessage: "Awaiting user action." });
          setStatus("Awaiting user action.")
          break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log({ syncMessage: "Installing update." });
        setStatus("Installing update.")
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log({ syncMessage: "App up to date.", progress: false });
        setStatus("App up to date.")
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        console.log({ syncMessage: "Update cancelled by user.", progress: false });
        setStatus("Update cancelled by user.")
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log({ syncMessage: "Update installed and will be applied on restart.", progress: false });
        codePush.restartApp()
        setStatus("Update installed and will be applied on restart.")
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log({ syncMessage: "An unknown error occurred.", progress: false });
        setStatus("An unknown error occurred.")
        break;
    }
  }

  function codePushDownloadDidProgress(progress: any) {
    console.log({ progress });
  }

    codePush.sync(
      codePushOptions,
      codePushStatusDidChange.bind(this),
      codePushDownloadDidProgress.bind(this)
    );
  const isDarkMode = useColorScheme() === 'dark';
  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Codepush Status">
            {status}
          </Section>
          <Section title="Changes">
            <Text style={styles.highlight}>My name is Reza Achmad</Text>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

AppRegistry.registerComponent('reactcodepush', () => App);
