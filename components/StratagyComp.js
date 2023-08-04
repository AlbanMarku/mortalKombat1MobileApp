import { Text, View, Pressable, Animated, StyleSheet } from 'react-native';
import VideoPlayer from './VideoPlayer';
import { useEffect, useState, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';
import { useContext } from 'react';
import { MyContext } from '../Context';

export default function StrategyComp({ info, videoUrl, title }) {
  const [input, setInput, rosterData, setRosterData, getIcon] = useContext(MyContext);
  const iconSet = getIcon(input);

  const [isVisible, setIsVisible] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current; //learn how the animation library works.

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isVisible ? 200 : 0,
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: false,
    }).start();
  }, [isVisible]);

  const ReplaceDir = (direction) => {
    switch (direction.number) {
      case 4:
        return <Entypo name="arrow-bold-left" size={20} color="white" />;

      case 6:
        return <Entypo name="arrow-bold-right" size={20} color="white" />;

      case 2:
        return <Entypo name="arrow-bold-down" size={20} color="white" />;

      default:
        return null;
    }
  };

  const ReplaceBut = (button) => {
    //Attack use NRS notation. Return icon depending on number.
    switch (button.number) {
      case 1:
        return iconSet.fp;
      case 2:
        return iconSet.bp;
      case 3:
        return iconSet.fk;
      case 4:
        return iconSet.bk;
      default:
        null;
    }
  };

  const AttackConverter = ({ para }) => {
    const parsedParaArray = para.split(/(\d{2})/g).filter(Boolean);
    //learn fully this.
    return (
      <Text style={styles.infoText}>
        {parsedParaArray.map((substring, index) => {
          if (/^\d{2}$/.test(substring)) {
            const directionNumber = parseInt(substring.charAt(0), 10);
            const buttonNumber = parseInt(substring.charAt(1), 10);
            return (
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'red',
                }}
                key={index}
              >
                <ReplaceDir number={directionNumber} />
                <ReplaceBut number={buttonNumber} />
              </View>
            );
          } else {
            return <Text key={index}>{substring}</Text>;
          }
        })}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.stratTitle}>{title}</Text>
        <AttackConverter para={info} />
      </View>
      {videoUrl && (
        <View style={styles.videoDiv}>
          <Pressable style={styles.pressableDiv} onPress={() => setIsVisible(!isVisible)}>
            <Text style={styles.pressableText}>{isVisible ? 'Hide video' : 'Show video'}</Text>
            {isVisible ? (
              <AntDesign style={styles.arrow} name="up" size={24} color="white" />
            ) : (
              <AntDesign style={styles.arrow} name="down" size={24} color="white" />
            )}
          </Pressable>
          <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
            {isVisible && <VideoPlayer source={videoUrl} />}
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
  },
  videoDiv: {
    // alignItems: 'center',
  },
  pressableDiv: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#292929',
    marginTop: 20,
  },
  pressableText: {
    fontSize: 20,
    color: 'white',
  },
  stratTitle: {
    color: 'white',
    fontFamily: 'mk11',
    fontSize: 24,
    paddingBottom: 10,
  },
  arrow: {
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
});
