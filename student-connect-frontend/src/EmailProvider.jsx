import React, { createContext, useContext, useState } from "react";

// Create a new context
const EmailContext = createContext();

// Create a custom hook for using the context
export const useEmailContext = () => {
  return useContext(EmailContext);
};

// Create a Provider component
export const EmailProvider = ({ children }) => {
  // Define the state within the provider
  const [userEmail, setUserEmail] = useState("no email");
  const [userId, setUserId] = useState("no id");
  const [userMongoId, setUserMongoId] = useState("no mongo id");

  // Provide the context value to its descendants
  return (
    <EmailContext.Provider
      value={{
        userEmail,
        setUserEmail,
        userId,
        setUserId,
        userMongoId,
        setUserMongoId,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
