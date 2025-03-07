import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getTicket, updateTicket } from "./slice/thunk";
import { toast } from "react-toastify";

type Props = {
  id: string;
  onClose: () => void;
};

function TicketDetail({ id, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
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
        onClose();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const { ticket } = useSelector((state: RootState) => state.ticketReducer);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="font-semibold text-sm text-black/80">Title</label>
        <div className="text-xl font-semibold">{ticket.title}</div>
      </div>
      <div>
        <label className="font-semibold text-sm text-black/80">
          Description
        </label>

        <div className="w-full text-gray-500 max-w-sm">
          {ticket.description}
        </div>
      </div>
      <div className=" flex justify-end">
        <select
          className="border border-gray-500 p-2 rounded-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>
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
