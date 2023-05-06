import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import shortid from "shortid";
import SingleFlight from "./shared/SingleFlight";

const AllFlightsContainer = () => {
  const { allFlights } = useSelector((state) => state);
  const [allFlightsKeys, setAllFlightsKeys] = useState(null);

  useEffect(() => {
    const sortedKeys = Object.keys(allFlights).sort((a, b) => +a - +b);
    setAllFlightsKeys(sortedKeys);
  }, [allFlights]);
  return (
    <>
      {Object.keys(allFlights).length > 0 && (
        <div className="table-container">
          <table className="booking-table">
            <thead className="bg-gray-100/50">
              <tr className="text-black text-left">
                <th>Destination From</th>
                <th>Destination To</th>
                <th className="text-center">Journey Date</th>
                <th className="text-center">Guests</th>
                <th className="text-center">className</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody
              className="divide-y divide-gray-300/20"
              id="lws-previewBooked"
            >
              {allFlightsKeys.map((item) => (
                <SingleFlight
                  key={shortid.generate()}
                  flight={allFlights[item]}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AllFlightsContainer;
