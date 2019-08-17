import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, Image, FlatList, Linking} from 'react-native';

import { Card } from 'react-native-paper';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: 'true',
      articles: [],
      page: 1
    }
  }
  componentDidMount = async () => {
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=5615fb96a02b4ea4b37c268f8fd4840d&page='+this.state.page
  );
  const jsonData = await response.json();
  this.setState({loading: 'false', articles: jsonData.articles})
  
};
onPressButton = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open URL: ${url}`);
    }
  });
}
renderArticleItem = ({item}) => {
  return (
            <Card>
            <View style={{marginBottom: 25}}></View>
            <View style={{borderColor: 'gray', borderWidth: 1, marginBottom: 5}}>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 0.1}}>
            <Text style={{fontWeight: 'bold', marginLeft: 5, marginBottom: 10}}>{item.title}</Text>
            </View>
            <Image source={{uri:item.urlToImage}} style={{width: 373, height: 130}}/>
            <Text style={{marginLeft: 5, color: 'gray'}}>Source: {item.author}</Text>
            <Text style={{marginLeft: 5, marginBottom: 10, fontSize: 12}}>{item.description}</Text>
            <Text style={{marginLeft: 5, color: 'gray', marginBottom: 10}}>Published: {item.publishedAt}</Text>                                 
            <TouchableOpacity style={{backgroundColor: '#1E90FF', borderWidth: 0, height: 30, borderRadius: 2, marginLeft: 5, marginRight: 5, alignItems: 'center', justifyContent: 'center', marginBottom: 5}} onPress={() => this.onPressButton(item.url)}><Text style={{color: 'white'}}>Read more</Text></TouchableOpacity>
            </View>
            </Card>
  );}; 
getNews = async () => {
   await this.setState({page: this.state.page + 1, loading: 'true'});
    alert('page '+this.state.page)
   const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page='+       this.state.page;
   const response = await fetch(url);
   const jsonData = await response.json();
   this.setState({articles: this.state.articles.concat(jsonData.articles), loading: 'false'});
}  
  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      {this.state.loading == 'true' ? <ActivityIndicator size={30} flex={1}/> : null}
      <FlatList onEndReached={this.getNews} onEndReachedThreshold={1}
      data={this.state.articles}
      renderItem={this.renderArticleItem}
      keyExtractor={article => article.title}
      />    
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  
});
