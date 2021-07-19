import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { Image, Button, Icon } from 'react-native-elements';



const Pictures = ({pictures, togglePictures, pictureBool, setPicture}) => {
  return pictures.map(picture => {
      return (
          <Image
            source={{ uri: picture.largeImageURL }}
            style={{ width: 500, height: 250 }}
            PlaceholderContent={<ActivityIndicator />}
            onPress={() => {
              setPicture(picture)
              togglePictures(!pictureBool)
            }}
            key={picture.id}
          />
        )
    })
}

const DetailsScreen = picture => {
  return (
    <View>
      <Text> comments: {picture.picture.comments} </Text>
      <Text> id: {picture.picture.id} </Text>
      <Text> user: {picture.picture.user} </Text>
    </View>
  )
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [pictures, setPictures] = useState([])
  const [showPictures, setShowPictures] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [picture, setPicture] = useState({})
  const search = term => {
    setSearchTerm(term)
    fetch(`https://pixabay.com/api/?key=22567552-c31b0370ef2ebc35abeaf2c7f&q=${term}&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then(results => setPictures(results.hits))

  }
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='Search for an image'
        onChangeText={(term) => search(term) }
        containerStyle={styles.searchBar}
        value={searchTerm}
        searchIcon
      />
      {showPictures ? <Pictures 
          pictures={pictures} 
          togglePictures={setShowPictures} 
          pictureBool={showPictures}
          setPicture={setPicture}
          /> : <DetailsScreen picture={picture} />}
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
});
