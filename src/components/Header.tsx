import { useRef } from "react";

import cities from "../assests/city.list.min.json";
import { LatLng } from "../util/types";

interface IHeader {
  setLatLng: (latLng: LatLng) => void;
}

export interface Cities {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: LatLng;
}

const Header = ({ setLatLng }: IHeader) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="flex py-10  bg-violet-600 relative justify-center  ">
      <div className="text-3xl font-bold text-white cursor-pointer absolute left-4">
        Weather
      </div>
      <form action="#" className="bg-white">
        <input
          ref={inputRef}
          type="text"
          className="border-none"
          placeholder="Search City"
        />
        <button
          onClick={(e) => {
            e.preventDefault();

            if (inputRef.current) {
              const cityName = inputRef.current?.value.toLowerCase();
              const arrCity = (cities as Cities[]).filter(
                (city) => city.name.toLowerCase() == cityName
              );

              if (arrCity.length > 0 && cityName != "") {
                setLatLng(arrCity[0].coord);
              }
            }
          }}
          className="p-1"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Header;
