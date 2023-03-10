import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Context
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

// Components
import ProfileUpdate from "./ProfileUpdate";

// MUI
import {
  Grid,
  AppBar,
  Typography,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CircularProgress,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  formContainer: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "4rem",
    border: "5px solid black",
    padding: "3rem",
  },
  loginBtn: {
    backgroundColor: "green",
    color: "white",
    fontSize: "1.1rem",
    marginLeft: "1rem",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  picturesBtn: {
    backgroundColor: "blue",
    color: "white",
    fontSize: "0.8rem",
    border: "1px solid black",
    marginLeft: "1rem",
  },
});

function Profile() {
  const classes = useStyle();
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  const initialState = {
    userProfile: {
      agencyName: "",
      phoneNumber: "",
      profilePic: "",
      bio: "",
      sellerId: "",
      sellerListings: [],
    },
    dataIsLoading: true,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.agencyName = action.profileObject.agency_name;
        draft.userProfile.phoneNumber = action.profileObject.phone_number;
        draft.userProfile.profilePic = action.profileObject.profile_picture;
        draft.userProfile.bio = action.profileObject.bio;
        draft.userProfile.sellerListings = action.profileObject.seller_listings;
        draft.userProfile.sellerId = action.profileObject.seller;
        break;

      case "loadingDone":
        draft.dataIsLoading = false;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  // request to get profile info
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://localhost:8000/api/profiles/${GlobalState.userId}/`
        );
        console.log(response.data);
        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data,
        });
        dispatch({ type: "loadingDone" });
      } catch (e) {
        console.log(e.response);
      }
    }
    GetProfileInfo();
  }, []);

  function PropertiesDisplay() {
    if (state.userProfile.sellerListings.length === 0) {
      return (
        <Button disabled size="small" onClick={()=>navigate(`/agencies/${state.userProfile.sellerId}`)}>
          No Property
        </Button>
      );
    } else if (state.userProfile.sellerListings.length === 1) {
      return <Button size="small" onClick={()=>navigate(`/agencies/${state.userProfile.sellerId}`)}>One Property listed</Button>;
    } else {
      return (
        <Button size="small" onClick={()=>navigate(`/agencies/${state.userProfile.sellerId}`)}>
          {state.userProfile.sellerListings.length} properties
        </Button>
      );
    }
  }

  function WelcomeDisplay() {
    if (
      state.userProfile.agencyName === null ||
      state.userProfile.agencyName === "" ||
      state.userProfile.phoneNumber === null ||
      state.userProfile.phoneNumber === ""
    ) {
      return (
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          Welcome{" "}
          <span style={{ color: "green", fontWeight: "bolder" }}>
            {" "}
            {GlobalState.userUsername}{" "}
          </span>{" "}
          , please submit this form below to update your profile{" "}
        </Typography>
      );
    } else {
      return (
        <Grid
          container
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            border: "5px solid",
            marginTop: "1rem",
            padding: "5px",
          }}
        >
          <Grid item xs={6}>
            <img
              style={{ height: "10rem", width: "15 rem" }}
              src={
                state.userProfile.profilePic !== null
                  ? state.userProfilePic
                  : defaultProfilePicture
              }
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            xs={6}
          >
            <Grid item>
              <Typography
                variant="h5"
                style={{ textAlign: "center", marginTop: "1rem" }}
              >
                Welcome{" "}
                <span style={{ color: "green", fontWeight: "bolder" }}>
                  {" "}
                  {GlobalState.userUsername}{" "}
                </span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                style={{ textAlign: "center", marginTop: "1rem" }}
              >
                You have {PropertiesDisplay()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }

  if (state.dataIsLoading === true) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="justify"
        style={{ height: "100vh" }}
      >
        <CircularProgress color="success" />
      </Grid>
    );
  }

  return (
    <>
      <div>{WelcomeDisplay()}</div>

      <ProfileUpdate userProfile={state.userProfile} />
    </>
  );
}

export default Profile;
