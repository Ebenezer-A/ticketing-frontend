import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { createTicket, getTickets } from "./slice/thunk";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

function UserDashboard() {
  const { tickets } = useSelector((state: RootState) => state.ticketReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTickets());
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Open",
  });

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await dispatch(createTicket(formData))
      .unwrap()
      .then((response) => {
        response ? handleModalClose() : "";
        setFormData({ title: "", description: "", status: "Open" });
        dispatch(getTickets());
      })
      .catch((err: any) => {
        toast.error(err.message);
      });
  };

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
        <div className="flex gap-4 flex-col items-stretch">
          <div className="flex gap-2 flex-col">
            <label className="text-black/80">Title</label>
            <input
              className="border-2 placeholder:text-sm placeholder:text-black/30 focus:border-accent/70 focus:outline-none border-gray-200 p-2 rounded-lg"
              name="title"
              type="text"
              placeholder="Enter your title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-col">
            <label className="text-black/80">Description</label>
            <textarea
              className="border-2 placeholder:text-sm placeholder:text-black/30 focus:border-accent/70 focus:outline-none border-gray-200 p-2 rounded-lg"
              name="description"
              placeholder="Enter your description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="bg-[#1570EF] text-white font-semibold w-full p-2 rounded-md"
            >
              Create
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserDashboard;
