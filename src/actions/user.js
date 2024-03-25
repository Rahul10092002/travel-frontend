// import fetchData from "../utils/fetchData";

import uploadFile from "../firebase/uploadFile";
// import axiosClient from "../utils/axiosClient";
import fetchData from "../utils/fetchData";
import { v4 as uuidv4 } from "uuid";
const url = process.env.REACT_APP_SERVER_URL + "/user";

// export const register = async ({ user }, dispatch) => {
//   dispatch({ type: "START_LOADING" });
//   axiosClient
//     .post("/user/register", user)
//     .then((response) => {
//       console.log("Registration successful:", response.data);
//       if (response) {
//         // Rest of your success handling code here...
//       }
//     })
//     .catch((error) => {
//       console.error("Error during registration:", error);

//       if (error.response) {
//         console.error("Response status:", error.response.status);
//         console.error("Response data:", error.response.data);
//       } else if (error.request) {
//         console.error("Request made, but no response received.");
//       } else {
//         console.error("Error setting up the request:", error.message);
//       }
//     })
//     .finally(() => {
//       dispatch({ type: "END_LOADING" });
//     });
// };
export const register = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    { url: url + "/register", body: user },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Your account has been created successfully",
      },
    });
  }

  dispatch({ type: "END_LOADING" });
};

export const login = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData({ url: url + "/login", body: user }, dispatch);

  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "CLOSE_LOGIN" });
  }

  dispatch({ type: "END_LOADING" });
};

export const updateProfileFetch = async (
  currentUser,
  updatedFields,
  dispatch
) => {
  dispatch({ type: "START_LOADING" });

  const { name, file } = updatedFields;
  let body = { name };
  try {
    if (file) {
      const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();
      const photoURL = await uploadFile(
        file,
        `profile/${currentUser?.id}/${imageName}`
      );
      body = { ...body, photoURL };
    }
    // console.log(currentUser);
    const result = await fetchData(
      {
        url: url + "/updateUser",
        method: "PATCH",
        body,
        token: currentUser.token,
      },
      dispatch
    );
    // console.log(result);
    if (result) {
      dispatch({ type: "UPDATE_USER", payload: { ...currentUser, ...result } });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Your profile has been updated successfully",
        },
      });
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { open: false, file: null, photoURL: result.photoURL },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
    console.log("user error:", error);
  }

  dispatch({ type: "END_LOADING" });
};
