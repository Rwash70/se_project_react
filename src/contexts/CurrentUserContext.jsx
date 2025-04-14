import React, { createContext, useContext, useState } from 'react';

// Create the context
export const CurrentUserContext = createContext();

// Custom hook to use the context
export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};

// Context provider component
// export const CurrentUserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <CurrentUserContext.Provider
//       value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
//     >
//       {children}
//     </CurrentUserContext.Provider>
//   );
// };
