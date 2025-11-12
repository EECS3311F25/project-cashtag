"use client";
import { useState, useEffect } from "react";


export default function EditBudgetModal({ isOpen, onClose, budget, onBudgetUpdated }) {


 //store the user’s input for the new budget.
 const [budgetAmount, setBudgetAmount] = useState("");
 const [category, setCategory] = useState("");
 const [categories, setCategories] = useState([]); // this holds all categories fetched from the backend

 const date = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
 const month = date.slice(0, 7); // extract "YYYY-MM"
 const userId = "6899c10f-f3e4-4101-b7fe-c72cbe0e07ba"; // update later

 // get available categories when modal opens
 useEffect(() => {
   if (isOpen && budget) {
    // backend endpoint to get available budget categories
     fetch(`http://localhost:8080/api/budget/user/${userId}/${month}/available-categories`) 
       .then((res) => res.json()) 
       .then((data) => setCategories([budget.category, ...data]))
       .catch((err) => console.error("Error fetching categories", err)); 
   }
 }, [isOpen, budget]);
  

// initialize budgetAmount and category so they are shown when modal opens
 useEffect(() => {
    if (isOpen && budget) {
      setBudgetAmount(budget.maxAmount);
      setCategory(budget.category);
    }
  }, [isOpen, budget]);

 //submit the form
 const handleUpdate = async (e) => {
  e.preventDefault(); // <--- prevent page reload
  
  const updatedBudget = {
    ...budget, //copies all existing properties of budget (id, currentAmount, month, etc.).
    maxAmount: parseFloat(budgetAmount),
    category: category.toUpperCase(),
    userId: userId
  };
  
   try {
    console.log("Budget being updated:", JSON.stringify(updatedBudget, null, 2));

    const res = await fetch(`http://localhost:8080/api/budget/user/${userId}/${month}/${category}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBudget),
    });


    if (res.ok) {
      onBudgetUpdated(); // triggers dashboard refresh
      onClose();
    } else {
      const errorText = await res.text();
      console.error("Server returned:", errorText);
    }
  } catch (err) {
    console.error("Error updating budget", err);
  }
 };

 if (!isOpen || !budget) return null;


 //popup layout
 return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Budget Amount</h2>
 
        <form onSubmit={handleUpdate} className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Amount"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            className="border p-2 rounded"
          />

          {/*cancel and update buttons */}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
 }