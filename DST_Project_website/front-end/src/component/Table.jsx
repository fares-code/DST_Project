import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "../Loading/LoadingPage";
import InputForm from "./InputForm";

export default function Table() {
  const [data, setData] = useState([]); // Holds table data
  const [loading, setLoading] = useState(true); // Controls loading spinner
  const [searchTerm, setSearchTerm] = useState(""); // Holds search input value

  // Fetch initial data when component mounts
  useEffect(() => {
    getData();
  }, []); // Empty array to prevent infinite loop

  // Get all data from backend
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/v1/data/get-data"
      );

      setData(response.data.Data);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching data", error);
      setLoading(false);
    }
  };

  // Handle delete book by ID
  const HandelDelete = async (id) => {
    try {
      if (!id) return console.log("There is no Id");
      const res = await axios.delete(
        `http://localhost:5000/api/v1/data/delete-one/${id}`
      );
      getData()
      setData(res.data.Data); // Update the table after deletion
    } catch (error) {
      console.log("There is Error While delete this Book", error);
    }
  };
  // Handle delete book by ID
  const HandelADD = async (id) => {
    try {
      if (!id) return console.log("There is no Id");
      const res = await axios.post(
        `http://localhost:5000/api/v1/data/add-one/${id}`
      );
      getData()
      setData(res.data.Data); // Update the table after deletion
    } catch (error) {
      console.log("There is Error While add this Book", error);
    }
  };

  // Handle search form submission
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/data/get-search-data", // Backend search endpoint
        { text: searchTerm } // Send search term in body
      );
      setData(response.data.data); // Update the table with search results
      setLoading(false);
    } catch (error) {
      console.error("Error while searching:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          {/* Search Form */}
          <div className="w-full mb-4 h-fit flex flex-row rounded-lg justify-center items-center bg-gradient-to-r from-red-600 via-blue-800 to-blue-950 p-4">
           
            <form
              className="bg-white/10 backdrop-blur-lg shadow-lg rounded-lg p-8 w-96"
              onSubmit={handelSubmit}
            >
              <h2 className="text-3xl font-extrabold text-white text-center mb-4">
                📚 Books Table
              </h2>
              <p className="text-gray-200 text-center mb-6">
                Search for your favorite book or author below
              </p>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="text"
                  className="text-cyan-200 font-semibold text-sm tracking-wide"
                >
                  Enter Book or Author Name
                </label>
                <input
                  type="text"
                  id="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Type here..."
                  className="p-3 rounded-lg w-full text-gray-800 placeholder-gray-400 border-2 border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-all"
                />
                <button
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Search
                </button>
                <button
                  className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                  onClick={getData}
                >
                  Get All Data
                </button>
              </div>
            </form>
             <InputForm/>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="min-w-max w-full border-collapse rounded-lg border border-gray-300 text-sm">
            <thead className="bg-blue-600 text-white">
  <tr>
    <th className="py-2 px-3 border-b">Id</th>
    <th className="py-2 px-3 border-b">Year</th>
    <th className="py-2 px-2 border-b">Book</th>
    <th className="py-2 px-2 border-b">Author</th>
    <th className="py-2 px-3 border-b">Language</th>
    
    <th className="py-2 px-3 border-b">Avg Rating</th>
  
   
    <th className="py-2 px-3 border-b">Sales</th>
    <th className="py-2 px-3 border-b">Revenue</th>
    <th className="py-2 px-3 border-b">Price</th>
    <th className="py-2 px-3 border-b">Rank</th>
    <th className="py-2 px-3 border-b">Publisher</th>
    <th className="py-2 px-3 border-b">N_Units</th>
    <th className="py-2 px-3 border-b">Actions</th>
  </tr>
</thead>
<tbody>
  {data.map((row, index) => (
    <tr
      key={index}
      className="bg-gradient-to-r from-red-600 to-blue-950 text-center text-white font-bold"
    >
      <td className="py-2 px-3 border">{index + 1}</td>
      <td className="py-2 px-3 border">{row.Publishing_Year}</td>
      <td className="py-2 px-2 border whitespace-nowrap">{row.Book_Name}</td>
      <td className="py-2 px-2 border whitespace-nowrap">{row.Author}</td>
      <td className="py-2 px-3 border">{row.Language_Code}</td>
     
      <td className="py-2 px-3 border">{row.Book_Average_Rating}</td>

      <td className="py-2 px-3 border">${row.Gross_Sales}</td>
      <td className="py-2 px-3 border">${row.Publisher_Revenue}</td>
      <td className="py-2 px-3 border">${row.Sale_Price}</td>
      <td className="py-2 px-3 border">{row.Sale_Rank}</td>
      <td className="py-2 px-3 border">{row.Publisher}</td>
      <td className="py-2 px-3 border">{row.count}</td>
      <td className="py-2 px-3 border " >
      <i class="fa-solid fa-plus cursor-pointer text-blue-400 pr-4" onClick={() => HandelADD(row._id)}></i>
      <i class="fa-solid fa-minus cursor-pointer text-red-400" onClick={() => HandelDelete(row._id)}></i>
      </td>
    </tr>
  ))}
</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
