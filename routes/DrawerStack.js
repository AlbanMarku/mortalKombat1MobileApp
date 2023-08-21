import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import Home from '../views/Home';
import About from '../views/About';
import HeaderComp from '../components/HeaderComp';
import { client, urlFor } from '../components/SanityClient';
import { setupDb } from '../myDb';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DrawerStack() {
  const Drawer = createDrawerNavigator();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if the app has been opened before
    const checkOpened = async () => {
      try {
        AsyncStorage.getItem('appOpened').then((value) => {
          if (!value) {
            // This is the first time the app is opened
            AsyncStorage.setItem('appOpened', 'true'); // Set the flag
            fetchroster();
            ToastAndroid.showWithGravity(
              'this was the first launch',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
            console.log('changed to opened');
          } else {
            ToastAndroid.showWithGravity(
              'this was the SECOND launch',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    checkOpened();
  }, []);

  const fetchRoster = async () => {
    console.log('fetching...');
    setLoading(true);

    try {
      const queryData = await client.fetch(
        "*[_type == 'kharacter']{ _id,name, avatar, profile, basicAttacks[]{..., attackType->{name}},stringAttacks[]{..., attackType->{name}},basicAttacks[]{..., attackType->{name}},specialAttacks[]{...,attackType->{name}}, guide}"
      );

      const mainData = queryData.map((item) => {
        const parsedAvatarImg = urlFor(item.avatar.asset._ref);
        const parsedProfileImg = urlFor(item.profile.asset._ref);
        const basicAttacks = item.basicAttacks ? item.basicAttacks : [];
        const stringAttacks = item.stringAttacks ? item.stringAttacks : [];
        const specialAttacks = item.specialAttacks ? item.specialAttacks : [];
        const guide = item.guide;
        return {
          name: item.name,
          avatar: parsedAvatarImg.url(),
          profile: parsedProfileImg.url(),
          basicAttacks: basicAttacks,
          stringAttacks: stringAttacks,
          specialAttacks: specialAttacks,
          guide: guide,
        };
      });

      const kameoQuery = await client.fetch(
        "*[_type == 'kameo']{_id, name, avatar, profile, moves, guide}"
      );
      const kameoExtracted = kameoQuery.map((item) => {
        const parsedKameoAvatar = urlFor(item.avatar.asset._ref);
        const parsedKameoImg = urlFor(item.profile.asset._ref);
        const moves = item.moves ? item.moves : [];
        const guide = item.guide;
        return {
          name: item.name,
          avatar: parsedKameoAvatar.url(),
          profile: parsedKameoImg.url(),
          moves: moves,
          guide: guide,
        };
      });

      setupDb(mainData, kameoExtracted);
      setLoading(false);
      ToastAndroid.showWithGravity('Roster data updated!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    } catch (err) {
      console.log(err);
      setLoading(false);

      if (err.message.includes('Network request failed')) {
        ToastAndroid.showWithGravity(
          'Something went wrong. Are you online?',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      } else {
        ToastAndroid.showWithGravity(
          'Something went wrong with the fetch',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
          shadowColor: 'white',
        },
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'mk11',
        },
        drawerItemStyle: {
          backgroundColor: 'red',
        },
        drawerContentStyle: {
          backgroundColor: 'red',
        },
      }}
    >
      <Drawer.Screen
        name="Main"
        options={{
          headerRight: () => <HeaderComp option={'download'} fetchRoster={fetchRoster} />,
        }}
      >
        {() => <Home loading={loading} />}
      </Drawer.Screen>
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}
