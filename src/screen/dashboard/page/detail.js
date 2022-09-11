import React, { useEffect } from 'react'
import { View } from 'react-native'
import {
  Box,
  ScrollView,
  Text,
  AspectRatio,
  Center,
  Image,
  Stack,
  Heading,
  HStack
} from 'native-base'

import { timeSince } from '../controller/dashborad_controller';
import { getFullContent } from '../../../services/news_service';


export default function detail({ route }) {
  const { item } = route.params;
  const timeAgo = timeSince(new Date(item.publishedAt))

  return (
    <Box>
      <ScrollView>
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
            <Heading size="lg" ml="-1">
              {item.title}
            </Heading>
            {/* <Text fontSize="sm" _light={{
              color: "violet.500"
            }} _dark={{
              color: "violet.400"
            }} fontWeight="500" ml="-0.5" mt="-1">
              The Silicon Valley of India.
            </Text> */}
          </Stack>
          <Text fontWeight="400">
            {item.content}
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
      </ScrollView>
    </Box>
  )
}