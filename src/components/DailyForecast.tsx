interface IDailyForecast {}
const list = [1, 2, 3, 4, 5];

const DailyForecast = ({}: IDailyForecast) => {
  return (
    <div className="rounded bg-violet-500 text-white p-4 px-6 w-1/3 flex min-w-fit flex-col">
      <div className="mb-2">Daily Forecast</div>
      <div className="flex justify-evenly gap-2 ">
        {list.map((item) => (
          <div className="flex flex-1 h-28 flex-col justify-evenly w-20  items-center border rounded">
            <div>Today</div>
            <div className="font-bold text-2xl">89°</div>
            <div>Rain</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
