import { createContext, useState } from 'react';

//If context requires more operations, make context file for each value instead of all together.

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [input, setInput] = useState(0);
  const tempImg = [
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
      name: 'scorpion',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
  ];
  const [rosterData, setRosterData] = useState([]);

  return (
    <MyContext.Provider value={[input, setInput, tempImg, rosterData, setRosterData]}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
