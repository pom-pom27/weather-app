interface IHeader {}

const Header = ({}: IHeader) => {
  return (
    <div className="flex py-10  bg-violet-600 relative justify-center  ">
      <div className="text-3xl font-bold text-white absolute left-4">
        Weather
      </div>
      <form action="#" className="bg-white">
        <input type="text" className="border-none" />
        <button className="p-1">Search</button>
      </form>
    </div>
  );
};

export default Header;
