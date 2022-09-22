// React and React Native Imports
import { useContext } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';

// Import contexts
import { QueueStateContext } from '../contexts/QueueState';

//Map
import Map from '../components/Map';

// 3rd Party Imports
import { useTranslation } from 'react-i18next';

export default function QueueInfoScreen( { route, navigation } ) {
    const {item, otherParams} = route.params;
    const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{item.name}</Text>

        <View style={styles.textContainer}>
            <View style={styles.textContainerLeft}><Text>{t("ExpectedWaitingTime")}:</Text></View>
            <View style={styles.textContainerRight}><Text style={styles.text}>{item.waitingTime} mins</Text></View>
        </View>
            
        <View style={styles.textContainer}>
            <View style={styles.textContainerLeft}><Text>{t("EstimatedQueueNumber")}:</Text></View>
            <View style={styles.textContainerRight}><Text style={styles.text}>{item.number}</Text></View>
        </View>  
        <View>
            <Map />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },

  title: {
    fontSize: 28,
    marginVertical: 20,
    fontWeight: "bold",
  },

  text: {
    fontSize: 15,
  },

  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    
  },

  textContainerLeft: {
    flex: 5,
    padding: 10,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "#FFF0F5",
    
  },

  textContainerRight: {
    flex: 2,
    padding: 10,
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "#FFF0F5",
  },
})
