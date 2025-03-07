import React from "react";

const AboutComponent: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-3xl font-bold mb-4">About Our Recipe App</h1>
      <p className="text-lg text-gray-700">
        Welcome to our Recipe Management App! This platform allows users to create, edit, and manage their favorite recipes with ease.
      </p>

      <h2 className="text-2xl font-semibold mt-4">Features:</h2>
      <ul className="list-disc ml-5 text-lg text-gray-700">
        <li>Add and save your favorite recipes.</li>
        <li>Edit your own recipes anytime.</li>
        <li>Rate and comment on recipes.</li>
        <li>Admins can manage all recipes.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Our Mission</h2>
      <p className="text-lg text-gray-700">
        Our goal is to create a simple and user-friendly platform for food lovers to store and share their best recipes.
      </p>
    </div>
  );
};

export default AboutComponent;
