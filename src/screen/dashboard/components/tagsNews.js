import React from 'react';
import { FlatList, Box } from 'native-base';
import { NewsCategory } from '../controller/dashborad_controller';
import { Tags } from './tags';

export const TagsNews = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <Box my={3}>
      <FlatList
        horizontal
        data={Object.keys(NewsCategory)}
        keyExtractor={(item) => item}
        renderItem={(item) =>
          <Tags
            category={item}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        }
      />
    </Box>
  )
}