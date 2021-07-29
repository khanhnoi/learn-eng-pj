import { useState } from 'react';
import createContainer from '.';

const useCompetition = () => {
  const initialState = [];

  const [competitions, setCompetitions] = useState(initialState);

  const updateCompetitions = (data) => {
    setCompetitions(data);
  };

  return { competitions, updateCompetitions };
};

export const Competition = createContainer(useCompetition);
