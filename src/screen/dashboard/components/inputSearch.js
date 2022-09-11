import React, { useCallback } from 'react';
import { TextInput, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { Input, Box, Button } from 'native-base';
import { getSearchNews, resetSearchStore } from '../../../store/actions/news';

export const SearchInput = ({ searchText, setSearchText, setLoading }) => {
  const dispatch = useDispatch();
  //Store
  const { searchResults } = useSelector(state => state.news)
  //Search News
  const searchForText = useCallback(
    debounce((text) => {
      if (text?.trim().length > 0) {
        dispatch(getSearchNews(text, setLoading));
      } else {
        dispatch(resetSearchStore());
      }
    }, 1000),
    [setSearchText, dispatch, setLoading],
  );
  return (
    <Box alignItems="center" mx={5} my={3} >
      <Input type="text" w="100%" py="0" rounded="full"
        value={searchText}
        InputRightElement={
          <Button size="xs" rounded="full" w="1/6" h="full"
            onPress={() => setSearchText("")}
          >
            Reset
          </Button>
        }
        maxLength={20}
        placeholder="Search News" onChangeText={(text) => [
          setSearchText(text),
          searchForText(text),
        ]} />
    </Box>
  );
};