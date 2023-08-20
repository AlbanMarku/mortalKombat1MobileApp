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
    try {
      AsyncStorage.getItem('appOpened').then((value) => {
        if (!value) {
          // This is the first time the app is opened
          AsyncStorage.setItem('appOpened', 'true'); // Set the flag
          fetchroster();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchRoster = async () => {
    console.log('fetching...');
    setLoading(true);
    //Fetch all karacters. Get their name, avatar, profile image. Send the fetched roster to the database for offline access.
    try {
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Fetch timeout'));
        }, 10000);
      });

      const queryDataPromise = new Promise(async (resolve, reject) => {
        try {
          const queryData = await client.fetch(
            "*[_type == 'kharacter']{ _id,name, avatar, profile, basicAttacks[]{..., attackType->{name}},stringAttacks[]{..., attackType->{name}},basicAttacks[]{..., attackType->{name}},specialAttacks[]{...,attackType->{name}}, guide}"
          );
          resolve(queryData);
        } catch (error) {
          reject(error);
        }
      });

      await Promise.race([queryDataPromise, timeoutPromise]);
      const queryData = await queryDataPromise;

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

      //kameo
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
      if (err.message === 'Fetch timeout') {
        ToastAndroid.showWithGravity(
          'Something went wrong. Internet is too slow.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      } else {
        ToastAndroid.showWithGravity(
          'Something went wrong. Are you online?',
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
