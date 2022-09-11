import React, { useEffect, useState, useCallback } from 'react'
import { View, RefreshControl } from 'react-native'
import {
  Text,
  Input,
  Box,
  FormControl,
  Stack,
  WarningOutlineIcon,
  Button,
  AspectRatio,
  Center,
  Image,
  Heading,
  HStack,
  VStack,
  Spinner,
  ScrollView,
  FlatList,
  Pressable,
} from 'native-base'
import StaggeredList from '@mindinventory/react-native-stagger-view';

//Store
import { useDispatch, useSelector } from 'react-redux'
import { getDataNews, searchNewsStore } from '../../../store/actions/news'
//Controller
import { NewsCategory, timeSince } from '../controller/dashborad_controller'
import { TagsNews } from '../components/tagsNews';
import { SearchInput } from '../components/inputSearch';

export default function dashboard({ navigation }) {
  const navigate = navigation.navigate;
  const dispatch = useDispatch()
  //Store
  const { newsFeed, searchResults } = useSelector(state => state.news)
  //State
  const [isLoading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    NewsCategory.business,
  );
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getDataNews(setLoading, selectedCategory));
  }, [dispatch, selectedCategory]);

  const handleRefresh = useCallback(() => {
    dispatch(getDataNews(setLoading, selectedCategory));
  }, [dispatch, selectedCategory]);

  const cardNews = (item) => {
    const timeAgo = timeSince(new Date(item.publishedAt))
    return (
      <Box key={item.publishedAt} m={2}>
        <Pressable onPress={() => navigate("Detail", { item: item })}>
          <Box maxW="40" rounded="lg" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
          }} _web={{
            shadow: 2,
            borderWidth: 0
          }} _light={{
            backgroundColor: "gray.50"
          }}>
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image source={{
                  uri: item.urlToImage
                }} alt="image" />
              </AspectRatio>
              <Center bg="violet.500" _dark={{
                bg: "violet.400"
              }} _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs"
              }} position="absolute" bottom="0" px="3" py="1.5">
                {item.source.name}
              </Center>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="sm" ml="-1">
                  {item.title}
                </Heading>
                {/* <Text fontSize="xs" _light={{
                  color: "violet.500"
                }} _dark={{
                  color: "violet.400"
                }} fontWeight="500" ml="-0.5" mt="-1">
                  {item.title}
                </Text> */}
              </Stack>
              <Text fontWeight="400">
                {item.description}
              </Text>
              <HStack alignItems="center" space={4} justifyContent="space-between">
                <HStack alignItems="center">
                  <Text color="coolGray.600" _dark={{
                    color: "warmGray.200"
                  }} fontWeight="400">
                    {timeAgo}
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        </Pressable>
      </Box>
    )
  }

  return (
    <Box flex={1}>
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        setLoading={setLoading}
      />
      {!searchText?.trim() && (<TagsNews
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />)}
      {isLoading ?
        <Box flex={1} justifyContent='center'>
          <Spinner size="lg" />
        </Box>
        :
        < StaggeredList
          data={searchText?.trim() ? searchResults : newsFeed}
          numColumns={2}
          animationType={'EFFECTIVE'}
          renderItem={(item) => cardNews(item.item)}
          onRefresh={handleRefresh}
        />
      }
    </Box>
  )
}
