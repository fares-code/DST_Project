import axios from "axios";
import React, { useState } from "react";

export default function InputForm() {
  const [formData, setFormData] = useState({
    rating: "",
    price: "",
    rank: "",
    revenue: ""
  });
  const [pred, setPred] = useState({});
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOk(false);
    try {
      const res = await axios.post("http://localhost:5000/api/v1/data/post-to-ml", formData);
      const predictionText = res.data.predection;
      const lines = predictionText.split('\r\n');
      const grossSalesLine = lines[0].split(':')[1].trim();
      const grossSales = parseFloat(grossSalesLine);
      const revenueLine = lines[1].split(':')[1].trim();
      const revenue = parseFloat(revenueLine);

      setPred({
        Gross_Sales: grossSales,
        Revenue: revenue
      });
      setOk(true);
      setLoading(false);
    } catch (error) {
      console.log("There is an error when submitting the form", error);
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-white/10 backdrop-blur-lg shadow-lg rounded-lg p-8 w-96  mx-auto mt-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-extrabold text-white text-center mb-4">
        📚 Book Predction model
      </h2>
      <p className="text-gray-200 text-center mb-6">
        Enter details for prediction below
      </p>
      <div className="flex flex-col gap-4">
        <label
          htmlFor="rating"
          className="text-cyan-200 font-semibold text-sm tracking-wide"
        >
          Book Rating
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Enter Book Rating..."
          className="p-3 rounded-lg w-full text-gray-800 placeholder-gray-400 border-2 border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-all"
          required
        />
        <label
          htmlFor="price"
          className="text-cyan-200 font-semibold text-sm tracking-wide"
        >
          Sale Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter Sale Price..."
          className="p-3 rounded-lg w-full text-gray-800 placeholder-gray-400 border-2 border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-all"
          required
        />
        <label
          htmlFor="rank"
          className="text-cyan-200 font-semibold text-sm tracking-wide"
        >
          Sale Rank
        </label>
        <input
          type="number"
          id="rank"
          name="rank"
          value={formData.rank}
          onChange={handleChange}
          placeholder="Enter Sale Rank..."
          className="p-3 rounded-lg w-full text-gray-800 placeholder-gray-400 border-2 border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-all"
          required
        />
        <label
          htmlFor="revenue"
          className="text-cyan-200 font-semibold text-sm tracking-wide"
        >
          Your Revenue
        </label>
        <input
          type="number"
          id="revenue"
          name="revenue"
          value={formData.revenue}
          onChange={handleChange}
          placeholder="Enter your revenue ..."
          className="p-3 rounded-lg w-full text-gray-800 placeholder-gray-400 border-2 border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-all"
          required
        />
        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Submit
        </button>

        {loading && (
          <div className="text-center text-white mt-4">
            <p>Loading...</p>
          </div>
        )}

        {ok && (
          <div className="text-center text-white mt-4">
            <p><strong>Gross Sales:</strong> {pred.Gross_Sales}</p>
            <p><strong>Revenue:</strong> {pred.Revenue}</p>
          </div>
        )}
      </div>
    </form>
  );
}
