import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('main.db');

export const setupDb = async (extractedData) => {
  console.log('Setting up db:');

  db.transaction((tx) => {
    tx.executeSql('DROP TABLE IF EXISTS kharacters');
  });

  db.transaction((tx) => {
    //Create table. Name is unique.
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS kharacters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, avatar TEXT, profile TEXT, basicAttacks TEXT, stringAttacks TEXT, specialAttacks TEXT, guide TEXT)'
    );
  });

  db.transaction((tx) => {
    //Insert all the data into the table. For each kharacter, get the properties and stringify. If doesn't exist, insert data.
    const insertQuery = `INSERT OR REPLACE INTO kharacters (name, avatar, profile, basicAttacks, stringAttacks, specialAttacks, guide) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    extractedData.forEach((kharacter) => {
      const { name, avatar, profile, basicAttacks, stringAttacks, specialAttacks, guide } =
        kharacter;

      const basicAttacksJSON = JSON.stringify(basicAttacks);
      const stringAttacksJSON = JSON.stringify(stringAttacks);
      const specialAttacksJSON = JSON.stringify(specialAttacks);
      const guideJSON = JSON.stringify(guide);

      tx.executeSql(
        'SELECT * FROM kharacters WHERE name = ?',
        [name],
        (txObj, resultSet) => {
          if (resultSet.rows.length > 0) {
            console.log('Already exists', name);
          } else {
            tx.executeSql(
              insertQuery,
              [
                name,
                avatar,
                profile,
                basicAttacksJSON,
                stringAttacksJSON,
                specialAttacksJSON,
                guideJSON,
              ],
              (txObj, resultSet) => {
                console.log('Insert success:', resultSet);
              },
              (txObj, error) => {
                console.log('Insert failed:', error);
              }
            );
          }
        },
        (txObj, err) => console.log('Insert failed:', err)
      );
    });
  });
};
