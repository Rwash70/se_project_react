import React, { createContext, useContext, useState } from 'react';

// Create the context
export const CurrentUserContext = createContext();

// Custom hook to use the context
export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};
