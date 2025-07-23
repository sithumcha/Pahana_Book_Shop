import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">Welcome to Pahana Book Shop</h1>
        <p className="mt-4 text-xl text-gray-500">
          Discover a wide range of books across various genres. Your journey to knowledge and imagination starts here.
        </p>
        <div className="mt-8">
          <a
            href="/shop"
            className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-indigo-700"
          >
            Start Shopping
          </a>
        </div>
      </div>

      {/* Featured Books Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Featured Books</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Book 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              className="w-full h-64 object-cover"
              src="https://images.unsplash.com/photo-1584344188555-bab12be6a75e?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg5MXwwfDF8c2VhY2h8OXx8Ym9va3xlbnwwfHx8fDE2ODAxMjM3NTI&ixlib=rb-1.2.1&q=80&w=400"
              alt="Book Cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">The Great Gatsby</h3>
              <p className="mt-2 text-sm text-gray-600">By F. Scott Fitzgerald</p>
              <div className="mt-4">
                <a
                  href="/shop"
                  className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
          {/* Book 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              className="w-full h-64 object-cover"
              src="https://images.unsplash.com/photo-1574158622684-3c5f65e9c0de?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg5MXwwfDF8c2VhY2h8Mnx8Ym9va3xlbnwwfHx8fDE2ODAxMjM3NjY&ixlib=rb-1.2.1&q=80&w=400"
              alt="Book Cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">1984</h3>
              <p className="mt-2 text-sm text-gray-600">By George Orwell</p>
              <div className="mt-4">
                <a
                  href="/shop"
                  className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
          {/* Book 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              className="w-full h-64 object-cover"
              src="https://images.unsplash.com/photo-1573245010594-58e6217d7ed9?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg5MXwwfDF8c2VhY2h8Mnx8Ym9va3xlbnwwfHx8fDE2ODAxMjM4MTg&ixlib=rb-1.2.1&q=80&w=400"
              alt="Book Cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">To Kill a Mockingbird</h3>
              <p className="mt-2 text-sm text-gray-600">By Harper Lee</p>
              <div className="mt-4">
                <a
                  href="/shop"
                  className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
          {/* Book 4 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              className="w-full h-64 object-cover"
              src="https://images.unsplash.com/photo-1598774690599-0e4bfe051905?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg5MXwwfDF8c2VhY2h8Mnx8Ym9va3xlbnwwfHx8fDE2ODAxMjM4Nzg&ixlib=rb-1.2.1&q=80&w=400"
              alt="Book Cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">Moby Dick</h3>
              <p className="mt-2 text-sm text-gray-600">By Herman Melville</p>
              <div className="mt-4">
                <a
                  href="/shop"
                  className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Start Your Reading Journey</h2>
        <p className="mt-4 text-lg text-gray-600">Explore our vast collection of books today and find your next great read!</p>
        <div className="mt-6">
          <a
            href="/shop"
            className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-indigo-700"
          >
            Browse Our Collection
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
