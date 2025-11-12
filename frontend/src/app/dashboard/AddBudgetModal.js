"use client";
import { useState, useEffect } from "react";


export default function AddBudgetModal({ isOpen, onClose, onBudgetAdded }) {


 //store the user’s input for the new budget.
 const [budgetAmount, setBudgetAmount] = useState("");
 const [category, setCategory] = useState("");
 const [categories, setCategories] = useState([]); // this holds all categories fetched from the backend

 const date = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
 const month = date.slice(0, 7); // extract "YYYY-MM"
 const userId = "6899c10f-f3e4-4101-b7fe-c72cbe0e07ba"; // update later

 // get  categories when modal opens
 useEffect(() => {
   if (isOpen) {
    // backend endpoint to get available budget categories
     fetch(`http://localhost:8080/api/budget/user/${userId}/${month}/available-categories`) 
       .then((res) => res.json()) 
       .then((data) => setCategories(data)) 
       .catch((err) => console.error("Error fetching categories", err)); 
   }
 }, [isOpen]);



 //submit the form
 const handleSubmit = async (e) => {
  e.preventDefault(); // <--- prevent page reload

  // budget object sent to POST request.
  const budgetPayload = {
    maxAmount: parseFloat(budgetAmount),
    category: category.toUpperCase(),
    month: month,
    userId: userId, 
  };
  
   try {
    console.log("Budget being sent:", JSON.stringify(budgetPayload, null, 2));

    const res = await fetch("http://localhost:8080/api/budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budgetPayload),
    });

    if (res.ok) {
      setBudgetAmount("");
      setCategory("");
      onBudgetAdded(); // triggers dashboard refresh
      onClose();
    } else {
      const errorText = await res.text();
      console.error("Server returned:", errorText);
    }
  } catch (err) {
    console.error("Error adding budget", err);
  }
 };

 //if popup is not open, don’t render anything
 if (!isOpen) return null;


 //popup layout
 return (
    <div className="fixed inset-0 flex justify-center items-center">
 
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Budget</h2>
 
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Amount"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            className="border p-2 rounded"
          />
 
          {/*dropdown for category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
                <option key={index} value={cat}>
                    {cat.charAt(0) + cat.slice(1).toLowerCase()}
                </option>
                ))
            }
          </select>

          {/*cancel and save buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
 
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
 }