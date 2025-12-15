"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    // Logic: Use the Environment variable, but fallback to localhost if it's missing
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const endpoint = `${baseUrl}/api/contact`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message Sent!");
        setFormData({ name: "", email: "", message: "" }); // Clear form on success
      } else {
        setStatus("Error sending message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error: Is backend running?");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Message"
          rows="4"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {status || "Send Message"}
        </button>
      </form>
    </div>
  );
}
