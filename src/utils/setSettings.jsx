// hooks/useSettings.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateSettingsData } from "../store/actions"; // Import your action creator
import { callGetAPI } from "./service";
import { getApis } from "./api";

const useSettings = () => {
  const dispatch = useDispatch();

  // Accessing settings and loading state from Redux store
  const settings = useSelector((state) => state.settings.settings); // Adjust path as necessary
  const loading = useSelector((state) => state.settings.loading); // Optional loading state

  // Fetch settings when the component mounts
  useEffect(() => {
    console.log("mounted");
    console.log(!settings || Object.keys(settings).length === 0);
    if (!settings || Object.keys(settings).length === 0) {
      // or another condition to avoid fetching repeatedly
      fetchSettings(dispatch);
    }
  }, [dispatch, settings]);

  return { settings, loading };
};

const fetchSettings = async (dispatch) => {
  try {
    const response = await callGetAPI(getApis.GetSettings); // Replace with actual API URL
    console.log(response);
    dispatch(updateSettingsData(response.settings)); // Dispatch the updated settings to Redux
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
};

export default useSettings;
