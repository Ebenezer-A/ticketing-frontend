import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  onClick: () => void;
};

function Navbar({ onClick }: Props) {
  const { name, role } = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const [logout, setLogout] = useState(false);

  return (
    <div className=" flex justify-between items-center bg-background px-5 py-3">
      <div className="relative ml-3">
        <div
          onClick={() => setLogout(!logout)}
          className="rounded-full bg-white p-2 text-2xl"
        >
          {name.charAt(0).toUpperCase() + name.charAt(1).toLowerCase()}
        </div>
        {logout && (
          <div className="absolute mt-2 shadow-gray-200 bg-white rounded-md shadow-lg py-1">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
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
