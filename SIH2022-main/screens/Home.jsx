// React and React Native Imports
import { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Button, FlatList, Image } from 'react-native';

// React Navigation
import { useNavigation } from '@react-navigation/native';

// Expo Imports
import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

// Context Hooks
import { AppStateContext } from '../contexts/AppState';
import { QueueStateContext } from '../contexts/QueueState'

// Custom Components
import { SearchBarShell } from '../components/SearchBar';

// 3rd Party
import { useTranslation } from 'react-i18next';

// Source Code
import { spoofQueueItem } from '../src/spoof';

const QueueType = {
  medical: 1,
  bus: 2,
  shops: 3
}

function HomeHeader({ navigation, queueItems }) {
  const [appState, setAppState] = useContext(AppStateContext);
  const [queueType, setQueueType] = useState(QueueType.medical);
  const { t, i18n } = useTranslation();

  const getGreeting = () => {
    var hour = new Date().getHours();
    if(hour < 12) return t('GoodMorning');
    else if(hour < 17) return t('GoodAfternoon');
    else return t('GoodEvening');
  }

  return (
    <View style={styles.HomeHeaderContainer}>
        <View style={styles.welcomeContainer}>

          <Text style={styles.welcomeText}>
            {getGreeting()}, {appState.firstName}
          </Text>
        </View>

        <View style={styles.HomeButtonsTopContainer}>
            
          {/* Join Queue Button */}  
          <Pressable 
              style={styles.HomeButton}
              onPress={() => navigation.navigate("Search")}    
          >
            <MaterialIcons name="queue" size={24} color="black" />
            <Text style={styles.HomeButtonText}>{t('JoinQueue')}</Text>
          </Pressable>
          
          {/* Queue History Button */}  
          <Pressable 
              style={styles.HomeButton}
              onPress={() => console.log("Not implemented.")}    
          >
            <FontAwesome5 name="history" size={24} color="black" />
            <Text style={styles.HomeButtonText}>{t('QueueHistory')}</Text>
          </Pressable>

        </View>

        <View style={styles.HomeButtonsBottomContainer}>

          { /* Select Medical Queue */ }
          <Pressable 
              style={ queueType == QueueType.medical ? styles.queueTypeSelected : styles.queueTypeUnselected}
              onPress={() => setQueueType(QueueType.medical)}
          >
                  <FontAwesome5 name="hand-holding-medical" size={24} color="black" />
                  <Text>{t('Medical')}</Text>
          </Pressable>

          { /* Select Bus Queue */ }
          <Pressable 
              style={ queueType == QueueType.bus ? styles.queueTypeSelected : styles.queueTypeUnselected}
              onPress={() => setQueueType(QueueType.bus)}
          >
                  <Ionicons name="bus" size={24} color="black" />
                  <Text>{t('Bus')}</Text>
          </Pressable>

          { /* Select Shop Queue */ }
          <Pressable 
              style={ queueType == QueueType.shops ? styles.queueTypeSelected : styles.queueTypeUnselected}
              onPress={() => setQueueType(QueueType.shops)}
          >
                  <Entypo name="shop" size={24} color="black" />
                  <Text>{t('Shops')}</Text>
          </Pressable>

        </View>


        <View style={styles.searchBarContainer}>
          <SearchBarShell OnPress={() => {navigation.navigate("Search")}}/>
        </View>

        {
          queueItems.length >= 1
            ?
          <Text style={styles.ActiveQueueHeader}>{t('ActiveQueues')}:</Text>
            :
          <></>
        }
    </View>
  )
}

function QueueItem({item}) {
  const navigation = useNavigation();

  return (
    <Pressable 
    style={styles.queueItem}
    onPress={() => navigation.navigate("QueueInfo", {"item": item})}
  >
    <Text style={styles.queueItemText}>{item.name}</Text>
    <Text style={styles.queueItemText}>{item.waitingTime} mins</Text>
    {/*<Text style={styles.queueItemText}>{item.number}</Text>*/}
  </Pressable>
  );
};

function EmptyQueueView() {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.emptyQueueContainer}>
      <Entypo name="cross" size={50} color="black" />
      <Text style={{fontSize: 18}}>{t('YouHaveNotJoinedAnyQueue')}</Text>
    </View>
  );
};

export default function HomeScreen( { navigation } ) {
  const [queueState, setQueueState] = useContext(QueueStateContext);
  const renderItem = (queueItem) => <QueueItem item={queueItem.item}/>

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => <HomeHeader navigation={navigation} queueItems={queueState}/>}
        renderItem={renderItem}
        data={queueState}
        ListEmptyComponent={EmptyQueueView}
        ItemSeparatorComponent={() => <View style={styles.queueItemSeperator}></View>}
        keyExtractor={item => item.id}
      />

      <Button 
          title='temp button add queue item'
          onPress={() => setQueueState([...queueState, spoofQueueItem()])}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  HomeHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  searchBarContainer: {
    flex: 1,
    marginTop: 10,
  },

  queueContainer: {
    flex: 6,
    alignItems: 'center',
    justifyContent:' center',
    alignSelf: 'stretch',
    backgroundColor: '#C1CDCD',
    margin: 20,
    marginTop: 0,
    borderRadius: 20,
  },

  emptyQueueContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  nonEmptyQueueContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  HomeButtonsTopContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
  },

  HomeButtonsBottomContainer: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "space-between",
  },

  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },

  HomeButton: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 15,
    aspectRatio: 1.6,
    borderColor: "black",
    borderWidth: 1.5,
    marginHorizontal: 5,
    backgroundColor: "#EEE9E9",
    flexDirection: "row",
    paddingHorizontal: 15,
  },

  HomeButtonText: {

  },

  scrollView: {
    flex: 1,
  },

  queueItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: "#CDCDC1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
  },

  queueItemText: {
    fontSize: 18,
    color: "black",
  },

  ActiveQueueHeader: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 15,
    },
  
  queueItemSeperator: {
    borderWidth: 0.5,
    marginHorizontal: 10,
    borderColor: "#CDC9A5"
  },

  queueTypeUnselected: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 15,
    aspectRatio: 1.3,
    borderColor: "black",
    borderWidth: 1.5,
    marginHorizontal: 5,
    backgroundColor: "#EEE9E9",
},

queueTypeSelected: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 15,
    aspectRatio: 1.3,
    borderColor: "#7CCD7C",
    borderWidth: 2.5,
    marginHorizontal: 5,
    backgroundColor: "#EEE9E9",
},

imageBackground: {
  borderWidth: 0.5,
  borderRadius: 15,
  aspectRatio: 2,
  width: "70%",
  height: "65%",
  marginBottom: 20,
},

imageStyle: {

},
})

