import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="text-center">
      <div className="gradient-bg text-white py-20 px-4 rounded-2xl mb-12">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to DSFL Fantasy League
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Create your dream team, compete with friends, and experience the thrill of fantasy football like never before.
        </p>
        {!isAuthenticated ? (
          <div className="space-x-4">
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors inline-block"
            >
              Login
            </Link>
          </div>
        ) : (
          <Link
            to="/players"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            View Players
          </Link>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-xl shadow-lg card-hover">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">Build Your Team</h3>
          <p className="text-gray-600">
            Select players from different houses and positions to create your ultimate fantasy team.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg card-hover">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">Strategic Gameplay</h3>
          <p className="text-gray-600">
            Choose your captain wisely and manage your budget to maximize your team's potential.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg card-hover">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">Compete & Win</h3>
          <p className="text-gray-600">
            Track your team's performance and compete with other fantasy managers for glory.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Houses</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Tata', 'Oberoi', 'Jaipur', 'Hyderabad', 'Kashmir'].map((house) => (
            <div key={house} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-800">{house}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;