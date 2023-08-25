import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

export const db = SQLite.openDatabase('main.db');

export const setupDb = async (mainData, kameoData, lessonExtracted) => {
  console.log('Setting up db:');
  db.transaction((tx) => {
    tx.executeSql('DROP TABLE IF EXISTS kharacters');
    tx.executeSql('DROP TABLE IF EXISTS kameos');
    tx.executeSql('DROP TABLE IF EXISTS lessons');
  });

  db.transaction((tx) => {
    //Create table. Name is unique.
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS kharacters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, avatar TEXT, profile TEXT, basicAttacks TEXT, stringAttacks TEXT, specialAttacks TEXT, guide TEXT)'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS kameos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, avatar TEXT, profile TEXT, moves TEXT, guide TEXT)'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS lessons (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, beginner TEXT, intermediate TEXT, advance TEXT)'
    );
  });

  db.transaction(async (tx) => {
    //KAMEO
    const kameoInsertQuery =
      'INSERT OR REPLACE INTO kameos (name, avatar, profile, moves, guide) VALUES (?,?,?,?,?)';

    kameoData.forEach((kameo) => {
      const { name, avatar, profile, moves, guide } = kameo;

      const movesJSON = JSON.stringify(moves);
      const guideJSON = JSON.stringify(guide);

      tx.executeSql('SELECT * FROM kameos WHERE name = ?', [name], async (txObj, resultSet) => {
        if (resultSet.rows.length > 0) {
          console.log('Already exists', name);
        } else {
          const cacheAvatar = await Asset.fromURI(avatar).downloadAsync();
          const cacheProfile = await Asset.fromURI(profile).downloadAsync();
          tx.executeSql(
            kameoInsertQuery,
            [name, cacheAvatar.localUri, cacheProfile.localUri, movesJSON, guideJSON],
            (txObj, resultSet) => {
              console.log('Insert success kameo:', resultSet);
            },
            (txObj, error) => {
              console.log('Insert failed kameo:', error);
            }
          );
        }
      });
    });

    const lessonQuery = `INSERT OR REPLACE INTO lessons (name, beginner, intermediate, advance) 
    VALUES (?, ?, ?, ?)`;
    const { name, beginner, intermediate, advance } = lessonExtracted;

    const newBeg = await Promise.all(
      beginner.map(async (item) => {
        const cacheThumb = await Asset.fromURI(item.adviceThumbnail).downloadAsync();
        return { ...item, adviceThumbnail: cacheThumb };
      })
    );
    const newInt = await Promise.all(
      intermediate.map(async (item) => {
        const cacheThumb = await Asset.fromURI(item.adviceThumbnail).downloadAsync();
        return { ...item, adviceThumbnail: cacheThumb };
      })
    );
    const newAdv = await Promise.all(
      advance.map(async (item) => {
        const cacheThumb = await Asset.fromURI(item.adviceThumbnail).downloadAsync();
        return { ...item, adviceThumbnail: cacheThumb };
      })
    );

    const beginnerJSON = JSON.stringify(newBeg);
    const intermediateJSON = JSON.stringify(newInt);
    const advanceJSON = JSON.stringify(newAdv);

    tx.executeSql(
      'SELECT * FROM lessons WHERE name = ?',
      [name],
      (txObj, resultSet) => {
        if (resultSet.rows.length > 0) {
          console.log('Already exists', name);
        } else {
          tx.executeSql(
            lessonQuery,
            [name, beginnerJSON, intermediateJSON, advanceJSON],
            (txObj, resultSet) => {
              console.log('Insert success lessons:', resultSet);
            },
            (txObj, error) => {
              console.log('Insert failed lessons:', error);
            }
          );
        }
      },
      (txObj, err) => console.log('Insert failed:', err)
    );

    //Insert all the data into the table. For each kharacter, get the properties and stringify. If doesn't exist, insert data.
    const insertQuery = `INSERT OR REPLACE INTO kharacters (name, avatar, profile, basicAttacks, stringAttacks, specialAttacks, guide) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    mainData.forEach((kharacter) => {
      const { name, avatar, profile, basicAttacks, stringAttacks, specialAttacks, guide } =
        kharacter;

      const basicAttacksJSON = JSON.stringify(basicAttacks);
      const stringAttacksJSON = JSON.stringify(stringAttacks);
      const specialAttacksJSON = JSON.stringify(specialAttacks);
      const guideJSON = JSON.stringify(guide);

      tx.executeSql(
        'SELECT * FROM kharacters WHERE name = ?',
        [name],
        async (txObj, resultSet) => {
          if (resultSet.rows.length > 0) {
            console.log('Already exists', name);
          } else {
            const cacheAvatar = await Asset.fromURI(avatar).downloadAsync();
            const cacheProfile = await Asset.fromURI(profile).downloadAsync();
            tx.executeSql(
              insertQuery,
              [
                name,
                cacheAvatar.localUri,
                cacheProfile.localUri,
                basicAttacksJSON,
                stringAttacksJSON,
                specialAttacksJSON,
                guideJSON,
              ],
              (txObj, resultSet) => {
                console.log('Insert success:', resultSet);
              },
              (txObj, error) => {
                console.log('Insert failed kharacter:', error);
              }
            );
          }
        },
        (txObj, err) => console.log('Insert failed:', err)
      );
    });
  });
};
