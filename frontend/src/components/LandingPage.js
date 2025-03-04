import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Hero Section */}
      <header className="bg-blue-900 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Welcome to Ice Insights</h1>
        <p className="mt-4 text-lg">
          Your go-to platform for in-depth NHL statistics and team insights.
        </p>
        <Link
          to="/standings"
          className="inline-block mt-8 bg-black text-yellow-50 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-50 hover:text-black transition-all"
        >
          Explore Standings!
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-16 text-gray-900">
        <h2 className="text-3xl font-bold text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-8 md:px-16">
          {/* Feature 1 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Feature Icon"
              className="mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold">Team Insights</h3>
            <p className="mt-2">
              Explore detailed insights for all NHL teams, including rosters,
              stats, and performance analysis.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Feature Icon"
              className="mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold">Player Profiles</h3>
            <p className="mt-2">
              Click on players to view their stats, achievements, and historical
              performance.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Feature Icon"
              className="mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold">Real-Time Standings</h3>
            <p className="mt-2">
              Stay up-to-date with the latest NHL standings and see how teams
              are performing in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-16">
          <blockquote className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-800 italic">
              "Ice Insights has changed the way I follow the NHL. The stats and
              insights are incredible!"
            </p>
            <footer className="mt-4 font-semibold text-gray-700">
              - Hockey Fan
            </footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-800 italic">
              "The team pages are packed with useful information. It’s my go-to
              app for NHL data."
            </p>
            <footer className="mt-4 font-semibold text-gray-700">
              - Sports Enthusiast
            </footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-800 italic">
              "I love how easy it is to navigate. The player profiles are
              amazing!"
            </p>
            <footer className="mt-4 font-semibold text-gray-700">
              - Die-Hard Fan
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
