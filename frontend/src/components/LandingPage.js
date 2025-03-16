import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Welcome to Ice Insights</h1>
          <p className="text-xl text-gray-300 mb-8">
            Your go-to platform for in-depth NHL statistics, team insights, and
            game predictions. Stay ahead of the game with real-time data and
            analysis.
          </p>
          <div className="space-x-4">
            <Link
              to="/standings"
              className="inline-block bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Explore Standings
            </Link>
            <Link
              to="/predictor"
              className="inline-block bg-green-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
            >
              Predict Games
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold mb-4">Team Insights</h3>
              <p className="text-gray-300">
                Explore detailed insights for all NHL teams, including rosters,
                stats, and performance analysis.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold mb-4">Player Profiles</h3>
              <p className="text-gray-300">
                Dive into player stats, achievements, and historical performance
                with detailed profiles.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold mb-4">Game Predictions</h3>
              <p className="text-gray-300">
                Get accurate game predictions based on advanced analytics and
                team performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <blockquote className="bg-gray-700 p-6 rounded-lg shadow-md">
              <p className="text-gray-300 italic">
                "Ice Insights has changed the way I follow the NHL. The stats and
                insights are incredible!"
              </p>
              <footer className="mt-4 font-semibold text-gray-400">
                - Hockey Fan
              </footer>
            </blockquote>
            <blockquote className="bg-gray-700 p-6 rounded-lg shadow-md">
              <p className="text-gray-300 italic">
                "The team pages are packed with useful information. It’s my
                go-to app for NHL data."
              </p>
              <footer className="mt-4 font-semibold text-gray-400">
                - Sports Enthusiast
              </footer>
            </blockquote>
            <blockquote className="bg-gray-700 p-6 rounded-lg shadow-md">
              <p className="text-gray-300 italic">
                "I love how easy it is to navigate. The player profiles are
                amazing!"
              </p>
              <footer className="mt-4 font-semibold text-gray-400">
                - Die-Hard Fan
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-gray-900 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Ice Insights. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;