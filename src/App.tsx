import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import { LatLng } from "./util/types";

function App() {
  // const [city, setCity] = useState("");
  const [geoStatus, setGeoStatus] = useState<string | undefined>(undefined);
  const [latLng, setLatLng] = useState<LatLng | undefined>(undefined);

  const errorCallback = () => {
    setGeoStatus("Unable to retrieve your location");
  };

  const successCallback = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setGeoStatus(undefined);
    setLatLng({ lat: latitude, lon: longitude });
  };

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 27000,
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus("Geolocation is not supported by your browser");
    } else {
      setGeoStatus("Locating…");
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <Header setLatLng={setLatLng} />
      {geoStatus && !latLng && <p>{geoStatus}</p>}
      {!latLng && !geoStatus && (
        <div className="flex-1 flex justify-center items-center">
          <button
            className="bg-violet-500 p-4 rounded text-white text-2xl"
            onClick={getLocation}
          >
            Get Location
          </button>
        </div>
      )}
      {latLng && <Home latLng={latLng} />}
    </div>
  );
}

export default App;
