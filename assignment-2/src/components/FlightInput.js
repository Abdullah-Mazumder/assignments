import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFlight } from "../redux/actionCreator/flightAction";
import Frame from "../img/icons/Frame.svg";
import VectorOne from "../img/icons/Vector (1).svg";
import VectorThree from "../img/icons/Vector (3).svg";
import SelectBox from "./shared/SelectBox";

const FlightInput = () => {
  const { allFlights } = useSelector((state) => state);
  const dispatch = useDispatch();
  const destinationData = [
    {
      value: "Dhaka",
      label: "Dhaka",
    },
    {
      value: "Sylhet",
      label: "Sylhet",
    },
    {
      value: "Saidpur",
      label: "Saidpur",
    },
    {
      value: "Cox's Bazar",
      label: "Cox's Bazar",
    },
  ];
  const [state, setState] = useState({
    from: "",
    to: "",
    date: "",
    guests: "",
    ticketclassName: "",
  });
  const inputHandler = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addFlight = (e) => {
    e.preventDefault();
    const { from, to, date, guests, ticketclassName } = state;

    if (Object.keys(allFlights).length === 3) {
      alert("You can add maximum 3 flights at a time");
      return;
    }
    if (!from || !to || !date || !guests || !ticketclassName || from === to) {
      alert("Please Provide Valid Information");
      return;
    }
    if (Date.parse(date) < Date.now()) {
      alert("Date must be greater than today");
      return;
    }
    dispatch(createFlight(state));
    setState({ from: "", to: "", date: "", guests: "", ticketclassName: "" });
  };

  return (
    <div className="mt-[160px] mx-4 md:mt-[160px] relative">
      <div className="bg-white rounded-md max-w-6xl w-full mx-auto">
        <form className="first-hero lws-inputform">
          <SelectBox
            label="Destination From"
            icon={Frame}
            id="lws-from"
            name="from"
            data={destinationData}
            value={state.from}
            onChange={inputHandler}
          />
          <SelectBox
            label="Destination To"
            icon={Frame}
            id="lws-to"
            name="to"
            data={destinationData}
            value={state.to}
            onChange={inputHandler}
          />

          <div className="des-from">
            <p>Journey Date</p>
            <input
              type="date"
              className="outline-none px-2 py-2 w-full date"
              name="date"
              id="lws-date"
              required
              value={state.date}
              onChange={inputHandler}
            />
          </div>

          <SelectBox
            icon={VectorOne}
            name="guests"
            id="lws-guests"
            label="Guests"
            data={[
              {
                value: "1",
                label: "1 Person",
              },
              {
                value: "2",
                label: "2 Persons",
              },
              {
                value: "3",
                label: "3 Persons",
              },
              {
                value: "4",
                label: "4 Persons",
              },
            ]}
            value={state.guests}
            onChange={inputHandler}
          />

          <SelectBox
            label={"ClassName"}
            icon={VectorThree}
            name="ticketclassName"
            id="lws-ticketclassName"
            isNotBorderRight
            data={[
              {
                value: "Business",
                label: "Business",
              },
              {
                value: "Economy",
                label: "Economy",
              },
            ]}
            value={state.ticketclassName}
            onChange={inputHandler}
          />

          <button
            className="addCity"
            type="submit"
            id="lws-addCity"
            onClick={addFlight}
          >
            <svg
              width="15px"
              height="15px"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="text-sm">Book</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlightInput;
