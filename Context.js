import { createContext, useState } from 'react';

export const InputContext = createContext();

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

  return (
    <InputContext.Provider value={[input, setInput, tempImg]}>{children}</InputContext.Provider>
  );
};

export default MyProvider;
