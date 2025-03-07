import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getTicket, updateTicket } from "./slice/thunk";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

type Props = {
  id: string;
};

function TicketDetail({ id }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  // Fetch ticket only when id is available
  useEffect(() => {
    if (id) {
      dispatch(getTicket(id));
    }
  }, [id, dispatch]);

  const handleSubmit = async () => {
    if (!status) {
      toast.error("Please select a status before submitting.");
      return;
    }

    try {
      const response = await dispatch(updateTicket({ id, status })).unwrap();
      if (response) {
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const { ticket } = useSelector((state: RootState) => state.ticketReducer);

  return (
    <div>
      <label className="font-semibold text-sm text-black/80">Title</label>
      <div className="text-xl font-semibold">{ticket.title}</div>
      <label className="font-semibold text-sm text-black/80">Description</label>

      <div className="w-full text-gray-500">{ticket.description}</div>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
        <option value="In Progress">In Progress</option>
      </select>
      <div>
        <button
          onClick={handleSubmit}
          className="bg-[#1570EF] text-white font-semibold w-full p-2 rounded-md"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default TicketDetail;
