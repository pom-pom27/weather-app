import dayjs from "dayjs";
import { PuffLoader } from "react-spinners";
import { API_KEY } from "../util/APIKEY";
import { LatLng } from "../util/types";
import useFetch from "../util/useFetch";
import { OpenWeatherApi } from "../util/weatherApiType";

interface IDailyForecast {
  latLng?: LatLng;
}

const DailyForecast = ({ latLng }: IDailyForecast) => {
  const { data, error } = useFetch<OpenWeatherApi>(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latLng?.lat}&lon=${latLng?.lon}&appid=${API_KEY}&exclude=hourly,minutely&units=metric`
  );

  if (error) return <p>There is an error, {error?.message}</p>;
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
    <div className="rounded bg-violet-500 text-white p-4 px-6 w-1/2 flex min-w-fit flex-col">
      <div className="mb-2">Daily Forecast</div>
      <div className="flex justify-evenly gap-2 ">
        {data.daily.slice(0, 5).map((weather, index) => {
          const day =
            index === 0 ? "Today" : dayjs(weather.dt * 1000).format("dddd");

          return (
            <div
              key={index}
              className="flex flex-1  flex-col justify-evenly w-20 p-2 items-center border rounded px-2"
            >
              <div className="">{day}</div>
              <div className="font-bold text-2xl">
                {Math.round(weather.temp.day)}°
              </div>
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="icon"
                />
              </div>
              <div>{weather.weather[0].main}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
