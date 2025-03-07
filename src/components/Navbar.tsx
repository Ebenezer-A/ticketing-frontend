import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Plus } from "lucide-react";

type Props = {
  onClick: () => void;
};

function Navbar({ onClick }: Props) {
  const { name, role } = useSelector(
    (state: RootState) => state.userReducer.user
  );

  return (
    <div className=" flex justify-between items-center bg-background rounded-sm px-5 py-3">
      <div className="ml-3 rounded-full bg-white p-2 text-2xl ">
        {name.charAt(0).toUpperCase() + name.charAt(1).toLowerCase()}
      </div>

      <div className="text-white text-3xl font-extralight">
        Ticketing System
      </div>

      {role === "User" ? (
        <button
          onClick={onClick}
          className="flex gap-2 bg-white p-2 rounded-sm"
        >
          <Plus /> Create Ticket
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Navbar;
