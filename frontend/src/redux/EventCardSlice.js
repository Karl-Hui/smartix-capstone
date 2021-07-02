import { createSlice } from "@reduxjs/toolkit";
import axios from "redaxios";

const initialState = {
  eventHost: [],
  eventCount: [],
  loading: false,
  error: "",
};

export const eventCardSlice = createSlice({
  name: "eventCard",
  initialState: initialState,
  reducers: {
    getEventHostSuccess(state, action) {
      let allEvent = action.payload;
      allEvent.map((event) => {
        // if (state.eventHost.indexOf(event.username)) {
        // }
        state.eventHost.push(event.username);
      });
      let countEvent = state.eventHost;
      let counted = countEvent.reduce((allEvent, event) => {
        if (event in allEvent) {
          allEvent[event]++;
        } else {
          allEvent[event] = 1;
        }
        return allEvent;
      }, {});
      state.eventCount = counted;
      state.loading = false;
    },
    getEventHostRequest(state, action) {
      state.loading = true;
    },
    getEventHostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getEventHostThunk = () => async (dispatch) => {
  dispatch(eventActions.getEventHostRequest());
  const getHost = () => {
    return axios.get("http://localhost:8080/api/eventHost");
  };
  try {
    let response = await getHost();
    dispatch(eventActions.getEventHostSuccess(response.data));
  } catch (err) {
    console.log("err", err);
    dispatch(eventActions.getEventHostFailure(err.message));
  }
};

export const eventActions = eventCardSlice.actions;
export default eventCardSlice.reducer;
