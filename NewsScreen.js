import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Linking, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import xml2js from 'xml2js';

const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the RSS feed and parse the XML
  const fetchNews = async () => {
    try {
      // const rssUrl = 'https://cors-anywhere.herokuapp.com/https://sportstar.thehindu.com/cricket/feeder/default.rss';
      const rssUrl = 'http://192.168.1.38:5000/proxy-rss';
      const response = await axios.get(rssUrl);
      const data = response.data;

      // Convert XML to JSON
      const parser = new xml2js.Parser();
      parser.parseString(data, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
          setLoading(false);
          return;
        }
        const newsItems = result.rss.channel[0].item;

        // Map news items to a usable format
        const formattedNews = newsItems.map(item => ({
          title: item.title[0],
          description: item.description[0],
          link: item.link[0],
          image: item['media:content'] ? item['media:content'][0].$.url : null,
          pubDate: item.pubDate[0],
        }));

        setNews(formattedNews);
        setLoading(false);
      });
    } catch (error) {
      console.error('Error fetching or parsing RSS feed:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {news.map((article, index) => (
        <View key={index} style={styles.article}>
          <Text style={styles.title}>{article.title}</Text>
          {article.image && (
            <Image
              source={{ uri: article.image }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          <Text style={styles.description}>{article.description}</Text>
          <Text style={styles.link} onPress={() => Linking.openURL(article.link)}>
            Read more
          </Text>
          <Text style={styles.date}>Published on: {new Date(article.pubDate).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#002b36',
    color: '#fff',
  },
  article: {
    margin: 10,
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    color: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  link: {
    color: '#007bff',
    fontSize: 14,
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsScreen;
