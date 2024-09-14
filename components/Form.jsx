import React from 'react';

export default function Form({ onSubmit, currentAccountId }) {
  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <fieldset id="fieldset">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Decireport</h2>
        <p className="text-gray-600 mb-4">Report Incident, {currentAccountId}!</p>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
            Incident Summary:
          </label>
          <input
            autoComplete="off"
            autoFocus
            id="message"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Report Incident
        </button>
      </fieldset>
    </form>
  );
}