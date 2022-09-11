
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Pressable } from 'native-base'

//Importing Screen
import Login from '../screen/login/page/login'
import Dashboard from '../screen/dashboard/page/dasboard'
import Detail from '../screen/dashboard/page/detail'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { logout } from '../store/actions/auth'

export default function routes() {
  const AuthStack = createStackNavigator()
  const MainStack = createStackNavigator()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  if (!user) {
    return (
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </AuthStack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="NewSantara"
          component={Dashboard}
          options={{
            headerTitleAlign: 'center',
            headerRight: () => (
              <Pressable
                onPress={() => dispatch(logout())}
                mr={3}
              >
                <Icon
                  name="logout"
                  color="red"
                  size={25}
                />
              </Pressable>

            ),
          }}
        />
        <MainStack.Screen
          name="Detail"
          component={Detail}
          options={({ route: { params } }) => ({
            headerTitle: params.item.source.name,
            headerTitleAlign: 'center'
          })}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  )
}