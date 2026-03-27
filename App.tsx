import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Image} from 'react-native';

import { fetchNewsService, NewsData } from './src/utils/handle-api';
import NewsList from "./src/components/NewsList";

export default function App() {
  const [newsList, setNewsList] = useState<NewsData[]>([]);
  const [newsAmount, setNewsAmount] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await fetchNewsService();
      setNewsList(data);
      setNewsAmount(data.length);
    } catch (err: any) {
      setError(err.message || "Erro ao obter notícias");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Image source={require("./assets/newspaper-banner.png")} style={{width: 40, height: 40}} />
        <Text style={styles.headerTitle}>Últimas notícias</Text>
        <Text>Atualmente temos {newsAmount} notícias!</Text>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Carregando notícias...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Erro: {error}</Text>
        </View>
      ) : (
        <NewsList newsList={newsList} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 6,
    paddingTop: 40, // Ensure header is spaced from exact top
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
  },
});
