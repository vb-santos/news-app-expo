import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import NewsItem from "./NewsItem";

import { NewsData } from '../utils/handle-api';

type Props = {
  newsList: NewsData[]
};

export default function NewsList({ newsList }: Props) {
  return (
    <FlatList
      contentContainerStyle={styles.scrollContent}
      data={newsList}
      renderItem={({ item }) => (
        <NewsItem
        key={item.id.toString()}
        title={item.title}
        image={item.image}
        published={item.published}
        link={item.link}
      />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
});
