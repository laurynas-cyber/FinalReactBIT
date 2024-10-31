import { useState } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp, FaSearch } from "react-icons/fa";

export const Search = ({ usersCopyList, setUsers, sortType }) => {
  const [sortedUp, setSortedUp] = useState(null);
  const [sortedNameUp, setSortedNameUp] = useState(null);

  const [input, setInput] = useState("");

  const RoleSort = () => {
    setUsers((u) => {
      if (sortedUp) {
        return u.toSorted((a, b) => b.role.localeCompare(a.role));
      } else {
        return u.toSorted((a, b) => a.role.localeCompare(b.role));
      }
    });
    setSortedUp((prev) => !prev);
  };

  const NameSort = () => {
    setUsers((u) => {
      if (sortedNameUp) {
        return u.toSorted((a, b) => b.name.localeCompare(a.name));
      } else {
        return u.toSorted((a, b) => a.name.localeCompare(b.name));
      }
    });

    setSortedNameUp((prev) => !prev);
  };

  const DonateSort = () => {
    setUsers((u) => {
      if (sortedUp) {
        return u.toSorted((a, b) => a.donation - b.donation);
      } else {
        return u.toSorted((a, b) => b.donation - a.donation);
      }
    });

    setSortedUp((prev) => !prev);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setInput(searchValue);

    if (searchValue === "") {
      setUsers(usersCopyList);
    } else if (sortType === "role") {
      setUsers((u) =>
        u.filter(
          (a) =>
            a.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            a.role.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setUsers((u) =>
        u.filter((a) =>
          a.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };
  return (
    <div className="FilterBlock">
      <div className="sortblock">
        <span>Filter </span>
        <input
          className="form-control searchInput"
          type="text"
          value={input}
          onChange={(e) => handleSearch(e)}
        ></input>
        <FaSearch className="searchIcon" />
      </div>
      <div className="sortblock">
        <span>Sort</span>
        <button className="btn mainActionBtn" onClick={NameSort}>
          by name{" "}
          {sortedNameUp === null ? null : sortedNameUp ? (
            <FaLongArrowAltUp className="DonateArrows" />
          ) : (
            <FaLongArrowAltDown className="DonateArrows" />
          )}
        </button>
        {sortType === "sum" ? (
          <button className="btn mainActionBtn" onClick={DonateSort}>
            by Donated sum{" "}
            {sortedUp === null ? null : sortedUp ? (
              <FaLongArrowAltUp className="DonateArrows" />
            ) : (
              <FaLongArrowAltDown className="DonateArrows" />
            )}
          </button>
        ) : (
          <button className="btn mainActionBtn" onClick={RoleSort}>
            by role{" "}
            {sortedUp === null ? null : sortedUp ? (
              <FaLongArrowAltUp className="DonateArrows" />
            ) : (
              <FaLongArrowAltDown className="DonateArrows" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
