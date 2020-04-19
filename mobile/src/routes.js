import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import ConfirmDelivery from '~/pages/ConfirmDelivery';
import DeliveryDetails from '~/pages/DeliveryDetails';
import Problems from '~/pages/Problems';
import RegisterProblem from '~/pages/RegisterProblem';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function ordersStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        headerLeftContainerStyle: {
          marginLeft: 10,
          alignItems: 'center',
        },
        headerStyle: {
          backgroundColor: '#7D40E7',
          elevation: 0,
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DeliveryDetails}
        options={{
          title: 'Detalhes da encomenda',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <Icon name="keyboard-arrow-left" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="RegisterProblem"
        component={RegisterProblem}
        options={{
          title: 'Informar problema',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Details')}>
              <Icon name="keyboard-arrow-left" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Problems"
        component={Problems}
        options={{
          title: 'Visualizar problemas',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Details')}>
              <Icon name="keyboard-arrow-left" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ConfirmDelivery"
        component={ConfirmDelivery}
        options={{
          title: 'Confirmar entrega',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Details')}>
              <Icon name="keyboard-arrow-left" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

ordersStack.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

function tabBarIcon(color, iconName) {
  return <Icon name={iconName} color={color} size={26} />;
}

function tabNavigator() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: '#7D40E7',
        inactiveTintColor: '#999999',
        labelStyle: {
          fontSize: 14,
        },
        tabStyle: {
          paddingVertical: 6,
        },
        style: {
          backgroundColor: '#fff',
          height: 60,
        },
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="Deliveries"
        component={ordersStack}
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ color }) => tabBarIcon(color, 'reorder'),
        }}
      />
      <Tabs.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => tabBarIcon(color, 'account-circle'),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function createRouter(isSigned = false) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        initialRouteName={isSigned ? 'App' : 'Login'}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="App" component={tabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
