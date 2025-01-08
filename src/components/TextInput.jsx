// import React, { useEffect, useState, useRef } from "react";
// import { stocksAndTickers } from "./stocksAndTickers";
// import { Search, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const TextInput = ({ inputValue, changeListener }) => {
//   const navigate = useNavigate();
//   const [isFocused, setIsFocused] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const dropdownRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (!showSuggestions && inputValue.length > 0) {
//       const filteredTickers = stocksAndTickers
//         .filter((ticker) =>
//           ticker.name.toLowerCase().includes(inputValue.toLowerCase())
//         )
//         .slice(0, 8);
//       setShowSuggestions(true);
//       setSearchResults(filteredTickers);
//     } else {
//       setShowSuggestions(false);
//       setSearchResults([]);
//     }
//     setSelectedIndex(-1);
//   }, [inputValue]);

//   const handleKeyDown = (e) => {
//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setSelectedIndex((prev) =>
//         prev < searchResults.length - 1 ? prev + 1 : prev
//       );
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
//     } else if (e.key === "Enter" && selectedIndex >= 0) {
//       const selected = searchResults[selectedIndex];
//       changeListener(selected.name);
//       setSearchResults([]);
//     } else if (e.key === "Escape") {
//       setSearchResults([]);
//       inputRef.current?.blur();
//     }
//   };

//   const handleClickOutside = (e) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//       setSearchResults([]);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="md:flex md:flex-row md:justify-end">
//       <div className="w-full md:w-[40%] relative" ref={dropdownRef}>
//         <div className="relative">
//           <input
//             ref={inputRef}
//             type="text"
//             placeholder="Search stocks..."
//             value={inputValue}
//             onChange={(e) => changeListener(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className={`w-full px-4 py-2 pr-10 mt-2 rounded-full border-2
//            ${isFocused ? "border-blue-500 shadow-lg" : "border-gray-300"}
//            transition-all duration-200
//           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//             aria-label="Search stocks"
//           />
//           {inputValue.length > 0 && (
//             <button
//               onClick={() => changeListener("")}
//               className="absolute right-12 top-1/2 -translate-y-1/2 p-1 rounded-full
//                 hover:bg-gray-100 transition-colors duration-200"
//             >
//               <X className="w-5 h-5 text-gray-400" />
//             </button>
//           )}
//           <div
//             onClick={() => {
//               if (inputValue.length > 0) {
//                 navigate("/main");
//               }
//             }}
//           >
//             <Search
//               className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6
//               ${isFocused ? "text-blue-500" : "text-gray-400"}
//               transition-colors duration-200`}
//             />
//           </div>
//         </div>

//         {showSuggestions && (
//           <div
//             className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200
//             overflow-hidden z-50 max-h-96 overflow-y-auto"
//           >
//             {searchResults.map((stock, index) => (
//               <div
//                 key={stock.ticker}
//                 className={`px-4 py-3 cursor-pointer transition-colors duration-150
//                   ${
//                     index === selectedIndex
//                       ? "bg-blue-50 text-blue-700"
//                       : "hover:bg-gray-50"
//                   }
//                   ${
//                     index !== searchResults.length - 1
//                       ? "border-b border-gray-100"
//                       : ""
//                   }`}
//                 onClick={() => {
//                   changeListener(stock.name);
//                   setSearchResults([]);
//                   setShowSuggestions(false);
//                 }}
//               >
//                 <div className="font-medium">{stock.name}</div>
//                 <div className="text-sm text-gray-500">{stock.ticker}</div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TextInput;
import React, { useEffect, useState, useRef } from "react";
import { stocksAndTickers } from "./stocksAndTickers";
import { Search, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const TextInput = ({ inputValue, changeListener }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue.length > 0) {
      const filteredTickers = stocksAndTickers
        .filter((ticker) =>
          ticker.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        .slice(0, 8);
      setShowSuggestions(true);
      setSearchResults(filteredTickers);
    } else {
      setShowSuggestions(false);
      setSearchResults([]);
    }
    setSelectedIndex(-1);
  }, [inputValue]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      const selected = searchResults[selectedIndex];
      changeListener(selected.name);
      setSearchResults([]);
      setShowSuggestions(false);
    } else if (e.key === "Escape") {
      setSearchResults([]);
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  };

  const handleStockSelection = (stock) => {
    changeListener(stock.ticker);
    setSearchResults([]);
    setShowSuggestions(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="md:flex md:flex-row md:justify-end">
      <div className="w-full md:w-[40%] relative" ref={dropdownRef}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search stocks..."
            value={inputValue}
            onChange={(e) => changeListener(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full px-4 py-2 pr-10 mt-2 rounded-full border-2
           ${isFocused ? "border-blue-500 shadow-lg" : "border-gray-300"}
           transition-all duration-200
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label="Search stocks"
          />
          {inputValue.length > 0 && (
            <button
              onClick={() => {
                changeListener("");
                setShowSuggestions(false);
              }}
              className={`absolute ${
                location.pathname !== "/main" ? "right-12" : "right-4"
              } top-1/4  p-1 rounded-full 
                hover:bg-gray-100 transition-colors duration-200`}
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
          {location.pathname !== "/main" && (
            <div
              onClick={() => {
                if (inputValue.length > 0) {
                  navigate("/main");
                }
              }}
            >
              <Search
                className={`absolute right-4 top-1/4 w-6 h-6
              ${isFocused ? "text-blue-500" : "text-gray-400"} 
              transition-colors duration-200`}
              />
            </div>
          )}
        </div>

        {showSuggestions && searchResults.length > 0 && (
          <div
            className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 
            overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            {searchResults.map((stock, index) => (
              <div
                key={stock.ticker}
                className={`px-4 py-3 cursor-pointer transition-colors duration-150
                  ${
                    index === selectedIndex
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-50"
                  }
                  ${
                    index !== searchResults.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                onClick={() => handleStockSelection(stock)}
              >
                <div className="font-medium">{stock.name}</div>
                <div className="text-sm text-gray-500">{stock.ticker}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
