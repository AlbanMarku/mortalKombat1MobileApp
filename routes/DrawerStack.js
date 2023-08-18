import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState } from 'react';
import Home from '../views/Home';
import About from '../views/About';
import HeaderComp from '../components/HeaderComp';
import { client, urlFor } from '../components/SanityClient';
import { setupDb } from '../myDb';

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  const [loading, setLoading] = useState(false);

  const fetchRoster = async () => {
    console.log('fetching...');
    setLoading(true);
    //Fetch all karacters. Get their name, avatar, profile image. Send the fetched roster to the database for offline access.
    try {
      const queryData = await client.fetch(
        " *[_type == 'kharacter']{ _id,name, avatar, profile, basicAttacks[]{..., attackType->{name}},stringAttacks[]{..., attackType->{name}},basicAttacks[]{..., attackType->{name}},specialAttacks[]{...,attackType->{name}}, guide}"
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
    } catch (err) {
      console.log(err);
      setLoading(false);
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
