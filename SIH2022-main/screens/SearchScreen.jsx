// React and React Native Imports
import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList, Button } from 'react-native';

// React Navigation Imports
import { useNavigation } from '@react-navigation/native';

// Expo Imports
import { Entypo } from '@expo/vector-icons';

// Custom Components
import SearchBar from '../components/SearchBar';

// 3rd Party Imports
import { useTranslation } from 'react-i18next';

// Source
import { spoofQueueItem } from '../src/spoof';

function NoSearchItems() {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.searchItemsEmpty}>
      <Entypo name="cross" size={50} color="black" />
      <Text style={{fontSize: 18}}>{t("NoResultFound")}.</Text>
    </View>
  );
};

function SearchItem ({ item }) {
  const navigation = useNavigation();

    return (
    <Pressable 
      style={styles.searchItem}
      onPress={() => navigation.navigate("QueueInfo", {"item": item})}
    >
    <Text style={styles.searchItemText}>{item.name}</Text>
    </Pressable>
  );
}

export default function SearchScreen( {navigation} ) {
  const [_searchPhrase, _setSearchPhrase] = useState("");
  const [_clicked, _setClicked] = useState(false);
  const [searchItems, setSearchItems] = useState([
    spoofQueueItem(),
    spoofQueueItem(),
  ]);
  const { t, i18n } = useTranslation();

  const renderItem = (item) => <SearchItem item={item.item}/> 

    return (
        
        <SafeAreaView style={styles.container}>
          
          <View style={styles.searchBarContainer}>
            <SearchBar
              searchPhrase={_searchPhrase}
              setSearchPhrase={_setSearchPhrase}
              clicked={_clicked}
              setClicked={_setClicked}
              placeholder={t("FindQueue")}
            />
          </View>

          <View style={styles.searchItemsContainer}>
            <FlatList
              data={searchItems}
              renderItem={renderItem}
              ListEmptyComponent={NoSearchItems}
            /> 
          </View>

          <Button 
            title="temp add"
            color="#841584"
            onPress={
              () => {
                setSearchItems([...searchItems, spoofQueueItem()])
              }
            }
          />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    searchBarContainer: {
      flex: 0.5,
      alignItems: "center",
    },

    searchItemsContainer: {
      flex: 4,
    },

    searchItemsEmpty: {
      flex: 1,
      alignItems: "center",
    },

    searchItem: {
      borderWidth: 1,
      borderRadius: 8,
      padding: 15,
      marginVertical: 5,
      marginHorizontal: 10,
      borderColor: "#EEE9E9"
    },

    searchItemText: {
      fontSize: 20,
    },
  })