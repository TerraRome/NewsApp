import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import {
  Text,
  Input,
  Box,
  FormControl,
  Stack,
  WarningOutlineIcon,
  Button,
  Pressable,
  Center,
} from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { loginFirebase, regisFirebase } from '../../../store/actions/auth'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function login() {
  const dispatch = useDispatch()
  const [isRegis, setRegis] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
  })

  const validation = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email) || form.email == "") {
      setError({ ...error, email: true, name: false })
    } else if (form.password.length < 6 || form.password == "") {
      setError({ ...error, password: true, email: false })
    } else {
      setError({ ...error, password: false })
      if (isRegis) {
        dispatch(regisFirebase(form, setLoading))
      } else {
        dispatch(loginFirebase(form, setLoading))
      }
    }
  }

  return (
    <Box flex={1} alignItems={"center"}>
      <Box flex={1} justifyContent={"center"}>
        <Text fontSize="2xl">NewSantara</Text>
      </Box>
      <Box flex={3} w="100%" maxWidth="80%" alignItems={"center"}>
        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>Email</FormControl.Label>
            <Input type="text" onChangeText={(text) => setForm({ ...form, email: text })} placeholder="Email" />
            {error.email && <FormControl.ErrorMessage isInvalid>
              Invalid Email Format or Email cannot be null.
            </FormControl.ErrorMessage>}
            <FormControl.Label>Password</FormControl.Label>
            <Input type={show ? "text" : "password"} onChangeText={(text) => setForm({ ...form, password: text })} placeholder="password"
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Box mr={2}>
                    <Icon name={show ? "visibility" : "visibility-off"} size={20} color="grey" />
                  </Box>
                </Pressable>}
            />
            {error.password && <FormControl.ErrorMessage isInvalid>
              Must be atleast 6 characters.
            </FormControl.ErrorMessage>}
          </Stack>
        </FormControl>
      </Box>
      <Box flex={1} width="80%">
        <Button
          onPress={() => validation()}>
          {isLoading ?
            <ActivityIndicator />
            :
            isRegis ? "REGIS" : "LOGIN"
          }
        </Button>
        {isLoading ?
          null
          :
          !isRegis ?
            <Center mt={4}>
              <Pressable onPress={() => {
                setRegis(!isRegis)
                setError({ name: false, email: false, password: false })
              }}>
                <Text color="blue.400">
                  Register...
                </Text>
              </Pressable>
            </Center>
            :
            <Center mt={4}>
              <Pressable onPress={() => {
                setRegis(!isRegis)
                setError({ name: false, email: false, password: false })
              }}
              >
                <Text color="blue.400">
                  Login...
                </Text>
              </Pressable>
            </Center>
        }
      </Box>
    </Box>
  )
}
