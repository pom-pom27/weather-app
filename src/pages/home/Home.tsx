import { PuffLoader } from "react-spinners";
import DailyForecast from "../../components/DailyForecast";
import { IOpenWeather } from "../../util/openweather";
import useFetch from "../../util/useFetch";

interface IHome {}

const Home = ({}: IHome) => {
  const { data, error } = useFetch<IOpenWeather>(
    "https://api.openweathermap.org/data/2.5/weather?q=bekasi&appid=3285ae10e43a79379e77a60cb394174f&units=metric"
  );

  if (error) return <p>There is an error.</p>;
  if (!data)
    return (
      <div className="flex-1 flex justify-center items-center">
        <PuffLoader
          color="rgb(139 92 246)"
          loading={true}
          size={150}
          aria-label="Loading Spinner"
        />
      </div>
    );

  return (
    <div className="flex-1 flex justify-center items-center gap-3  flex-col ">
      <div
        style={{ minWidth: "480px" }}
        className="rounded bg-violet-500 text-white p-4 px-6 w-1/3 flex  min-w-fit "
      >
        <div className="flex-1 ">
          <div className="font-bold text-lg ">{data.name}</div>
          <div className="text-gray-300 text-sm">
            as of{" "}
            {new Date().toLocaleTimeString("id-ID", {
              hour12: false,
              hour: "numeric",
              minute: "numeric",
              timeZoneName: "shortGeneric",
            })}
          </div>
          <div className="text-7xl	">{Math.round(data.main.temp)}°</div>
          <div className="font-bold text-2xl">{data.weather[0].main}</div>
        </div>
        <div className="w-1/3 flex flex-col justify-evenly">
          <div className="flex justify-between ">
            <div>High / Low</div>
            <div>
              {Math.round(data.main.temp_max)}°/
              {Math.round(data.main.temp_min)}°
            </div>
          </div>
          <div className="flex justify-between">
            <div>Wind</div>
            <div>{Math.round(data.wind.speed)} m/s</div>
          </div>
          <div className="flex justify-between">
            <div>Humidity</div>
            <div>{data.main.humidity}%</div>
          </div>
          <div className="flex justify-between">
            <div>Pressure</div>
            <div>{data.main.pressure} hPa</div>
          </div>
          <div className="flex justify-between">
            <div>Visibility</div>
            <div>{data.visibility} m</div>
          </div>
        </div>
      </div>
      <DailyForecast />
    </div>
  );
};

export default Home;
