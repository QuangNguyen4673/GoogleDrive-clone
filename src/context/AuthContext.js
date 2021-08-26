import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false); // Để current user không bị null
    });
    return unsubscribe;
  }, []);

  const signUp = (username, email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: username });
        console.log("updated user", result.user);
      })
      .catch((error) => {
        let errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const logIn = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        let errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const resetPassword = (email) => {
    return auth
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("send email successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const logOut = () => {
    return auth
      .signOut()
      .then(() => {
        console.log("sign out successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateUserEmail = (email) => {
    return currentUser.updateEmail(email);
  };
  const updateUserPassword = (password) => {
    return currentUser.updatePassword(password);
  };

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
