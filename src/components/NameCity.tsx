import { API_KEY } from "../util/APIKEY";
import { Geocoding } from "../util/geocodingApiType";
import { LatLng } from "../util/types";
import useFetch from "../util/useFetch";

interface INameCity {
  latLng?: LatLng;
}

const NameCity = ({ latLng }: INameCity) => {
  //fetch name city from lat long

  const { data, error } = useFetch<Geocoding[]>(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${latLng?.lat}&lon=${latLng?.lon}&limit=1&appid=${API_KEY}`
  );

  if (error) return <div className="font-bold text-lg ">{error.message}</div>;
  if (!data) return <div className="font-bold text-lg ">Loading...</div>;
  //menghilangkan koma jika provinsi kosong
  if (!data[0].state)
    return <div className="font-bold text-lg ">{`${data[0].name}`}</div>;
  return (
    <div className="font-bold text-lg ">{`${data[0].name},  ${
      data[0].state ?? ""
    } `}</div>
  );
};

export default NameCity;
