import { StyleSheet, View, ActivityIndicator } from 'react-native';
import LessonButtons from '../components/LessonButtons';
import Avatar from '../components/Avatar';
import Title from '../components/Title';
import { globalStyles } from '../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { db } from '../myDb';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
//Some temp data to map through. Components for homescreen.

export default function Home({ navigation, loading }) {
  const [avatarInfo, setAvatarInfo] = useState([]);
  const [kameoAvatarInfo, setKameoAvatarInfo] = useState([]);
  const [myLessons, setMylessons] = useState({});
  const [adLoaded, setAdLoaded] = useState(true); // Initialize as false

  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6095333575737174/1918031069';

  const loadAvatar = async () => {
    db.transaction((tx) => {
      //Search names
      tx.executeSql(
        'SELECT name, avatar, profile FROM kharacters ORDER BY name ASC',
        null,
        async (txObj, resultSet) => {
          const avatarArray = resultSet.rows._array;
          setAvatarInfo(avatarArray); //figure out promises
        }
      );

      tx.executeSql(
        'SELECT name, avatar, profile FROM kameos ORDER BY name ASC',
        null,
        async (txObj, resultSet) => {
          const kameoArray = resultSet.rows._array;
          setKameoAvatarInfo(kameoArray);
        }
      );
    });
  };

  const loadLessons = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT beginner, intermediate, advance FROM lessons',
        null,
        async (txObj, resultSet) => {
          const extractedLesson = resultSet.rows._array[0];
          try {
            const p = {
              beginner: JSON.parse(extractedLesson.beginner),
              intermediate: JSON.parse(extractedLesson.intermediate),
              advance: JSON.parse(extractedLesson.advance),
            };
            setMylessons(p);
          } catch (error) {
            console.log(error);
          }
        }
      );
    });
  };

  const HomeScreen = () => {
    return (
      <View>
        <Title name={'Lessons'} />
        <View>
          <LessonButtons myLessons={myLessons} />
        </View>
        <Title name={'Kharacters'} />
        <View style={styles.columnContainer}>
          {avatarInfo.map((item, index) => (
            <Avatar
              key={index.toString()}
              img={item.avatar}
              name={item.name ? item.name : 'unknown name'}
              profile={item.profile}
              type={'kharacter'}
            />
          ))}
        </View>
        <Title name={'Kameos'} />
        <View style={styles.columnContainer}>
          {kameoAvatarInfo.map((item, index) => (
            <Avatar
              key={index.toString()}
              img={item.avatar}
              name={item.name ? item.name : 'unknown name'}
              profile={item.profile}
              type={'kameo'}
            />
          ))}
        </View>
      </View>
    );
  };

  useEffect(() => {
    loadAvatar();
    loadLessons();
  }, []);

  useEffect(() => {
    loadAvatar();
    loadLessons();
    console.log(adLoaded);
  }, [loading]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[globalStyles.color, { flex: 1 }]}>
        {loading ? (
          <View style={{ height: 500, justifyContent: 'center' }}>
            <ActivityIndicator color={'orange'} size={'large'} />
          </View>
        ) : (
          <HomeScreen />
        )}
      </ScrollView>
      {adLoaded && (
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={() => {
            console.log('ad loaded');
            setAdLoaded(true); // Set the state to true when the ad is loaded
          }}
          onAdFailedToLoad={(error) => {
            console.log('Ad failed to load:', error);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  columnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
