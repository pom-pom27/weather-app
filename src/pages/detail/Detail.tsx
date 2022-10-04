import { useParams } from "react-router-dom";

interface IDetail {}

const Detail = ({}: IDetail) => {
  let { city } = useParams();

  return <div className="flex-1">{city}</div>;
};

export default Detail;
