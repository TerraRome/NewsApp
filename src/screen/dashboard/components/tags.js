import React, { useCallback } from 'react';
import { Box, Button } from 'native-base';

export const Tags = ({ category, selectedCategory, setSelectedCategory }) => {
  const categoryItem = category.item;

  const handlePress = useCallback(() => {
    setSelectedCategory(categoryItem);
  }, [category, setSelectedCategory]);

  return (
    <Box alignItems="center" mx={1}>
      <Button rounded="full" colorScheme={selectedCategory === categoryItem ? "purple" : "amber"} onPress={() => handlePress()}>
        {categoryItem}
      </Button>
    </Box>
  );
};