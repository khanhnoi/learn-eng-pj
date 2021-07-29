import { useState } from 'react';
import createContainer from '.';

const useUser = () => {
  const initialState = {
    avatar: '',
    displayName: 'Unknown',
    totalCoin: 0,
    userId: '',
    coinsHasChanged: false
  };

  const [user, setUser] = useState(initialState);

  const updateUser = (data) => {
    // follow this: https://github.com/facebook/react/issues/14010
    setUser((curUser) => ({
      ...curUser,
      ...data
    }));
  };

  return { user, updateUser };
};

export const User = createContainer(useUser);
