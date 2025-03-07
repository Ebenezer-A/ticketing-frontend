import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AdminDashboard from "./adminDashboard";
import UserDashboard from "./userDashboard";

type Props = {};

function Dashboard({}: Props) {
  const { user } = useSelector((state: RootState) => state.userReducer);

  return user.role === "Admin" ? <AdminDashboard /> : <UserDashboard />;
}

export default Dashboard;
