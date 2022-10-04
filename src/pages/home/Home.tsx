import { PuffLoader } from "react-spinners";
import DailyForecast from "../../components/DailyForecast";
import NameCity from "../../components/NameCity";
import { API_KEY } from "../../util/APIKEY";
import { LatLng } from "../../util/types";
import useFetch from "../../util/useFetch";
import { OpenWeatherApi } from "../../util/weatherApiType";

interface IHome {
  latLng?: LatLng;
}

const Home = ({ latLng }: IHome) => {
  //fetch from location
  const { data, error } = useFetch<OpenWeatherApi>(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latLng?.lat}&lon=${latLng?.lon}&appid=${API_KEY}&exclude=hourly,minutely&units=metric`
  );

  if (error) return <p>There is an error. {error?.message}</p>;
  if (!data)
    return (
      <div className="flex-1 flex justify-center items-center">
        <PuffLoader
          color="rgb(139 92 246)"
          loading
          size={150}
          aria-label="Loading Spinner"
        />
      </div>
    );

  return (
    <div className="flex-1 flex justify-center items-center gap-3  flex-col ">
      <div
        style={{ minWidth: "480px" }}
        className="rounded bg-violet-500 text-white p-4 px-6 w-1/2 flex  min-w-fit "
      >
        <div className="flex-1 ">
          <NameCity latLng={latLng} />
          <div className="text-gray-300 text-sm">
            as of{" "}
            {new Date().toLocaleTimeString("id-ID", {
              hour12: false,
              hour: "numeric",
              minute: "numeric",
              timeZoneName: "shortGeneric",
            })}
          </div>
          <div className="text-8xl font-bold	">
            {Math.round(data.current.temp)}°
          </div>
          <div className="font-bold text-2xl">
            {data.current.weather[0].main}
          </div>
        </div>

        <div className="w-1/3 flex flex-col justify-evenly">
          <div className="flex justify-between">
            <div>Wind</div>
            <div>{Math.round(data.current.wind_speed)} m/s</div>
          </div>
          <div className="flex justify-between">
            <div>Humidity</div>
            <div>{data.current.humidity}%</div>
          </div>
          <div className="flex justify-between">
            <div>Pressure</div>
            <div>{data.current.pressure} hPa</div>
          </div>
          <div className="flex justify-between">
            <div>Visibility</div>
            <div>{data.current.visibility} m</div>
          </div>
        </div>
      </div>

      <DailyForecast latLng={latLng} />
    </div>
  );
};

export default Home;
