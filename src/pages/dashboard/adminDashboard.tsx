import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { getTickets } from "./slice/thunk";
import Modal from "../../components/Modal";
import TicketDetail from "./ticketDetail";

function AdminDashboard() {
  const { tickets } = useSelector((state: RootState) => state.ticketReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getTickets());
  }, [isOpen]);

  const [id, setId] = useState("");

  return (
    <div>
      <Navbar
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <div className="grid grid-cols-4 gap-3 px-12 mt-8">
        {tickets.map((ticket, index) => (
          <div
            onClick={() => {
              console.log("========iddd", ticket.id);
              setId(ticket.id);
              setIsOpen(true);
            }}
            key={index}
            className="w-full max-w-md transition-all duration-300 hover:shadow-md px-5 py-7 border border-gray-300 rounded-2xl"
          >
            <div className="pb-2">
              <div className="flex items-start justify-between">
                <div className="text-xl font-semibold">{ticket.title}</div>
                <div
                  className={`px-3 py-1 rounded-3xl text-sm font-semibold ${
                    ticket.status === "Open"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : ticket.status === "In Progress"
                      ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {ticket.status}
                </div>
              </div>
              <div className="mt-2 line-clamp-2 text-gray-500">
                {ticket.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <TicketDetail
          id={id}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}

export default AdminDashboard;
