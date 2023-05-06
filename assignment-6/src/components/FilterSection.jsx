import { useDispatch, useSelector } from "react-redux";

import {
  setFilterBySaveStatus,
  setFilterByLikeOrNewest,
} from "../features/filters/filterSlice";

const FilterSection = () => {
  const dispatch = useDispatch();
  const { filterByLikeOrNewest, filterBySaveStatus } = useSelector(
    (state) => state.filter
  );
  const handleRadioChange = (e) => {
    dispatch(setFilterBySaveStatus(e.target.id === "lws-saved"));
  };
  return (
    <aside>
      <div className="sidebar-items">
        <div className="sidebar-content">
          <h4>Sort</h4>
          <select
            name="sort"
            id="lws-sort"
            className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
            value={filterByLikeOrNewest}
            onChange={(e) => dispatch(setFilterByLikeOrNewest(e.target.value))}
          >
            <option value="">Default</option>
            <option value="newest">Newest</option>
            <option value="most_liked">Most Liked</option>
          </select>
        </div>
        <div className="sidebar-content">
          <h4>Filter</h4>
          <div className="radio-group">
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-all"
                checked={!filterBySaveStatus}
                onChange={handleRadioChange}
                className="radio"
              />
              <label htmlFor="lws-all">All</label>
            </div>
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-saved"
                className="radio"
                checked={filterBySaveStatus}
                onChange={handleRadioChange}
              />
              <label htmlFor="lws-saved">Saved</label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSection;
