import { createContext, useState } from 'react';

export const InputContext = createContext();

const MyProvider = ({ children }) => {
  const [input, setInput] = useState(0);

  return <InputContext.Provider value={[input, setInput]}>{children}</InputContext.Provider>;
};

export default MyProvider;
