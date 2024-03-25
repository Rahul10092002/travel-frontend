import  { useEffect } from "react";
import { useValue } from "../context/ContextProvider";
import jwtDecode from "jwt-decode";

const useCheckToken = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  useEffect(() => {
    let isMounted = true; // To avoid running the effect on unmount

    if (currentUser) {
      // console.log(currentUser);
      try {
        const decodedToken = jwtDecode(currentUser.token);
        // Continue with decoding logic
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          if (isMounted) {
            dispatch({ type: "UPDATE_USER", payload: null });
          }
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    return () => {
      // Cleanup function to run on unmount
      isMounted = false;
    };
  }, [currentUser, dispatch]); // Specify dependencies here

  // You can return any additional data or functions if needed

  return null; // You can modify this based on your use case
};

export default useCheckToken;
