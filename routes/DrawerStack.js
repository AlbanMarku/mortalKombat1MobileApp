import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import Home from '../views/Home';
import About from '../views/About';
import HeaderComp from '../components/HeaderComp';
import { client, urlFor } from '../components/SanityClient';
import { setupDb } from '../myDb';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Asset } from 'expo-asset';

export default function DrawerStack() {
  const Drawer = createDrawerNavigator();
  const [loading, setLoading] = useState(false);

  const checkOpened = async () => {
    try {
      const value = await AsyncStorage.getItem('appOpened');

      if (value === null || value === 'false') {
        // This is the first time the app is opened
        await AsyncStorage.setItem('appOpened', 'true'); // Set the flag
        fetchRoster();
        ToastAndroid.showWithGravity(
          'This was the first launch',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        console.log('Changed to opened');
      } else {
        ToastAndroid.showWithGravity(
          'This was the SECOND launch',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        console.log('This was the SECOND launch');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const clearAppOpenedFlag = async () => {
    try {
      await AsyncStorage.removeItem('appOpened');
      console.log('Cleared appOpened flag');
    } catch (error) {
      console.log('Error clearing appOpened flag:', error);
    }
  };

  useEffect(() => {
    // Check if the app has been opened before
    checkOpened();
    // clearAppOpenedFlag();
  }, []);

  const fetchRoster = async () => {
    console.log('fetching...');
    setLoading(true);

    try {
      const queryData = await client.fetch(
        "*[_type == 'kharacter']{ _id,name, avatar, profile, basicAttacks[]{..., attackType->{name}},stringAttacks[]{..., attackType->{name}},basicAttacks[]{..., attackType->{name}},specialAttacks[]{...,attackType->{name}}, guide}"
      );

      const mainDataPromises = queryData.map(async (item) => {
        const parsedAvatarImg = urlFor(item.avatar.asset._ref);
        const parsedProfileImg = urlFor(item.profile.asset._ref);
        const cachedAvatar = await Asset.fromURI(parsedAvatarImg.url()).downloadAsync();
        const cachedImage = await Asset.fromURI(parsedProfileImg.url()).downloadAsync();
        const basicAttacks = item.basicAttacks ? item.basicAttacks : [];
        const stringAttacks = item.stringAttacks ? item.stringAttacks : [];
        const specialAttacks = item.specialAttacks ? item.specialAttacks : [];
        const guide = item.guide;
        return {
          name: item.name,
          avatar: cachedAvatar.localUri,
          profile: cachedImage.localUri,
          basicAttacks: basicAttacks,
          stringAttacks: stringAttacks,
          specialAttacks: specialAttacks,
          guide: guide,
        };
      });

      const mainData = await Promise.all(mainDataPromises);

      const kameoQuery = await client.fetch(
        "*[_type == 'kameo']{_id, name, avatar, profile, moves, guide}"
      );

      const kameoExtractedPromises = kameoQuery.map(async (item) => {
        const parsedKameoAvatar = urlFor(item.avatar.asset._ref);
        const parsedKameoImg = urlFor(item.profile.asset._ref);
        const cachedAvatar = await Asset.fromURI(parsedKameoAvatar.url()).downloadAsync();
        const cachedImage = await Asset.fromURI(parsedKameoImg.url()).downloadAsync();
        const moves = item.moves ? item.moves : [];
        const guide = item.guide;

        return {
          name: item.name,
          avatar: cachedAvatar.localUri,
          profile: cachedImage.localUri,
          moves: moves,
          guide: guide,
        };
      });

      const kameoExtracted = await Promise.all(kameoExtractedPromises);

      const lessonQuery = await client.fetch(
        "*[_type == 'lesson']{name, beginner, intermediate, advance}"
      );
      const lesson = lessonQuery[0];

      const beginnerArray = lesson.beginner;
      const intermediateArray = lesson.intermediate;
      const advanceArray = lesson.advance;

      const parsedBeginnerPromise = beginnerArray.map(async (item) => {
        try {
          const thumbnailUrl = urlFor(item.adviceThumbnail.asset._ref);
          const cachedThumbnail = await Asset.fromURI(thumbnailUrl.url()).downloadAsync();
          return {
            ...item,
            adviceThumbnail: cachedThumbnail.localUri,
          };
        } catch (error) {
          console.log(error);
          return item;
        }
      });

      const parsedIntermediatePromise = intermediateArray.map(async (item) => {
        try {
          const thumbnailUrl = urlFor(item.adviceThumbnail.asset._ref).url();
          const cachedThumbnail = await Asset.fromURI(thumbnailUrl.url()).downloadAsync();
          return {
            ...item,
            adviceThumbnail: cachedThumbnail.localUri,
          };
        } catch (error) {
          console.log(error);
          return item;
        }
      });

      const parsedAdvancePromise = advanceArray.map(async (item) => {
        try {
          const thumbnailUrl = urlFor(item.adviceThumbnail.asset._ref).url();
          const cachedThumbnail = await Asset.fromURI(thumbnailUrl.url()).downloadAsync();
          return {
            ...item,
            adviceThumbnail: cachedThumbnail.localUri,
          };
        } catch (error) {
          console.log(error);
          return item;
        }
      });

      const parsedBeginnerObj = await Promise.all(parsedBeginnerPromise);
      const parsedIntermediateObj = await Promise.all(parsedIntermediatePromise);
      const parsedAdvanceObj = await Promise.all(parsedAdvancePromise);

      const lessonObj = {
        beginner: parsedBeginnerObj,
        intermediate: parsedIntermediateObj,
        advance: parsedAdvanceObj,
        name: lesson.name,
      };

      setupDb(mainData, kameoExtracted, lessonObj);
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
