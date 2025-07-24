// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
// import { toast, ToastContainer } from 'react-toastify'; // Importing toast and ToastContainer
// import 'react-toastify/dist/ReactToastify.css'; // Ensure styles are imported

// function BookList() {
//   const [books, setBooks] = useState([]);
//   const [error, setError] = useState('');
//   const [selectedBook, setSelectedBook] = useState(null); // For storing the book to be updated
//   const [isModalOpen, setIsModalOpen] = useState(false); // For controlling modal visibility
//   const navigate = useNavigate(); // Initialize navigate for React Router

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/books');
//         if (response.ok) {
//           const data = await response.json();
//           setBooks(data);
//           toast.success('Books fetched successfully!');
//         } else {
//           setError('Failed to fetch books');
//           toast.error('Failed to fetch books');
//         }
//       } catch (error) {
//         setError('An error occurred while fetching the books');
//         toast.error('An error occurred while fetching the books');
//       }
//     };

//     fetchBooks();
//   }, []);

//   const deleteBook = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/books/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         setBooks(books.filter(book => book.id !== id));
//         toast.success('Book deleted successfully!');
//       } else {
//         setError('Failed to delete book');
//         toast.error('Failed to delete book');
//       }
//     } catch (error) {
//       setError('An error occurred while deleting the book');
//       toast.error('An error occurred while deleting the book');
//     }
//   };

//   const updateBook = (book) => {
//     console.log("Selected book:", book); // Add this log to check the selected book
//     setSelectedBook(book);
//     setIsModalOpen(true);
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     const updatedBook = {
//       ...selectedBook,
//       title: e.target.title.value,
//       author: e.target.author.value,
//       publisher: e.target.publisher.value,
//       language: e.target.language.value,
//       price: parseFloat(e.target.price.value),
//       pages: parseInt(e.target.pages.value),
//       category: e.target.category.value,
//     };

//     console.log("Updated book:", updatedBook); // Log the updated book data to debug

//     try {
//       const response = await fetch(`http://localhost:8080/api/books/${selectedBook.id}`, {
//         method: 'PUT',
//         body: JSON.stringify(updatedBook),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const updatedBooks = books.map(book =>
//           book.id === selectedBook.id ? updatedBook : book
//         );
//         setBooks(updatedBooks);
//         setIsModalOpen(false);
//         toast.success('Book updated successfully!');
//       } else {
//         setError('Failed to update book');
//         toast.error('Failed to update book');
//       }
//     } catch (error) {
//       setError('An error occurred while updating the book');
//       toast.error('An error occurred while updating the book');
//     }
//   };

//   // Back Button to navigate to Admin Dashboard
//   const goBackToAdminDashboard = () => {
//     navigate('/admin'); // Navigate to the admin dashboard page
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Book List</h2>
      
//       {/* Back Button to Admin Dashboard */}
//       <button
//         onClick={goBackToAdminDashboard}
//         className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 mb-6"
//       >
//         Back to Admin Dashboard
//       </button>
      
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       {books.length > 0 ? (
//         <table className="w-full table-auto border-separate border-spacing-2">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="p-4 text-left text-sm font-medium">Title</th>
//               <th className="p-4 text-left text-sm font-medium">Author</th>
//               <th className="p-4 text-left text-sm font-medium">Publisher</th>
//               <th className="p-4 text-left text-sm font-medium">Language</th>
//               <th className="p-4 text-left text-sm font-medium">Price</th>
//               <th className="p-4 text-left text-sm font-medium">Pages</th>
//               <th className="p-4 text-left text-sm font-medium">Category</th>
//               <th className="p-4 text-left text-sm font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book.id} className="border-t">
//                 <td className="p-4 text-sm text-gray-800">{book.title}</td>
//                 <td className="p-4 text-sm text-gray-800">{book.author}</td>
//                 <td className="p-4 text-sm text-gray-800">{book.publisher}</td>
//                 <td className="p-4 text-sm text-gray-800">{book.language}</td>
//                 <td className="p-4 text-sm text-gray-800">RS{book.price}</td>
//                 <td className="p-4 text-sm text-gray-800">{book.pages}</td>
//                 <td className="p-4 text-sm text-gray-800">{book.category}</td>
//                  <td className="p-4">
//                   <img
//                     src={`http://localhost:8080/${book.imageUrl}`}
//                     alt={book.title}
//                     className="w-24 h-16 object-cover rounded-md shadow-md"
//                   />
//                 </td>
//                 <td className="p-4">
//                   <button
//                     onClick={() => updateBook(book)}
//                     className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out mr-4"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => deleteBook(book.id)}
//                     className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-center text-gray-500">No books found</p>
//       )}

//       {/* Modal for updating book */}
//       {isModalOpen && selectedBook && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg w-96 shadow-lg transform transition-all duration-300 scale-100">
//             <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Book</h2>
//             <form onSubmit={handleUpdateSubmit}>
//               <div className="mb-4">
//                 <label className="block mb-2 text-sm text-gray-700">Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   defaultValue={selectedBook?.title}
//                   className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-sm text-gray-700">Author</label>
//                 <input
//                   type="text"
//                   name="author"
//                   defaultValue={selectedBook?.author}
//                   className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-sm text-gray-700">Publisher</label>
//                 <input
//                   type="text"
//                   name="publisher"
//                   defaultValue={selectedBook?.publisher}
//                   className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-sm text-gray-700">Language</label>
//                 <input
//                   type="text"
//                   name="language"
//                   defaultValue={selectedBook?.language}
//                   className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-sm text-gray-700">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   defaultValue={selectedBook?.price}
//                   className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-sm text-gray-700">Pages</label>
//                 <input
//                   type="number"
//                   name="pages"
//                   defaultValue={selectedBook?.pages}
//                   className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* <div className="mb-4">
//                 <label className="block mb-2 text-sm text-gray-700">category</label>
//                 <input
//                   type="text"
//                   name="category"
//                   defaultValue={selectedBook?.category}
//                   className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div> */}

//                <div>
//                     <label className="block text-sm font-medium text-gray-700">Category</label>
//                     <select
//                       name="category"
//                       defaultValue={selectedBook.category}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="Fiction">Fiction</option>
//                       <option value="Non-Fiction">Non-Fiction</option>
//                       <option value="Science">Science</option>
//                       <option value="History">History</option>
//                       <option value="Biography">Biography</option>
//                     </select>
//                   </div>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
//                 >
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ToastContainer to render toast messages */}
//       <ToastContainer />
//     </div>
//   );
// }

// export default BookList;






import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit, FiTrash2, FiArrowLeft, FiSearch } from 'react-icons/fi';
import { FaBookOpen } from 'react-icons/fa';

function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
          toast.success('Books loaded successfully!', {
            icon: <FaBookOpen className="text-blue-500" />
          });
        } else {
          setError('Failed to fetch books');
          toast.error('Failed to fetch books');
        }
      } catch (error) {
        setError('An error occurred while fetching the books');
        toast.error('An error occurred while fetching the books');
      }
    };

    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBooks(books.filter(book => book.id !== id));
        toast.success('Book deleted successfully!', {
          icon: '🗑️'
        });
      } else {
        setError('Failed to delete book');
        toast.error('Failed to delete book');
      }
    } catch (error) {
      setError('An error occurred while deleting the book');
      toast.error('An error occurred while deleting the book');
    }
  };

  const updateBook = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedBook = {
      ...selectedBook,
      title: e.target.title.value,
      author: e.target.author.value,
    //   publisher: e.target.publisher.value,
      language: e.target.language.value,
      price: parseFloat(e.target.price.value),
      pages: parseInt(e.target.pages.value),
      category: e.target.category.value,
      description: e.target.description.value,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/books/${selectedBook.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedBook),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedBooks = books.map(book =>
          book.id === selectedBook.id ? updatedBook : book
        );
        setBooks(updatedBooks);
        setIsModalOpen(false);
        toast.success('Book updated successfully!', {
          icon: '✏️'
        });
      } else {
        setError('Failed to update book');
        toast.error('Failed to update book');
      }
    } catch (error) {
      setError('An error occurred while updating the book');
      toast.error('An error occurred while updating the book');
    }
  };

  const goBackToAdminDashboard = () => {
    navigate('/admin');
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaBookOpen className="mr-3 text-indigo-600" />
              Book Inventory
            </h1>
            <p className="text-gray-600 mt-2">Manage your book collection</p>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              onClick={goBackToAdminDashboard}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="relative w-full md:w-96 mb-4 md:mb-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search books by title, author or category..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="bg-indigo-50 text-indigo-800 px-4 py-2 rounded-lg">
              <span className="font-medium">{books.length}</span> books in inventory
            </div>
          </div>
        </div>

        {/* Book Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {error && <p className="text-red-500 p-4">{error}</p>}
          
          {filteredBooks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cover
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex-shrink-0 h-16 w-12">
                          <img
                            className="h-full w-full object-cover rounded-md shadow-sm"
                            src={`http://localhost:8080/${book.imageUrl}`}
                            alt={book.title}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{book.title}</div>
                        <div className="text-sm text-gray-500">{book.publisher}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{book.author}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${book.category === 'Fiction' ? 'bg-purple-100 text-purple-800' : 
                            book.category === 'Non-Fiction' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'}`}>
                          {book.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        RS {book.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateBook(book)}
                            className="text-indigo-600 hover:text-indigo-900 flex items-center"
                            title="Edit"
                          >
                            <FiEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => deleteBook(book.id)}
                            className="text-red-600 hover:text-red-900 flex items-center"
                            title="Delete"
                          >
                            <FiTrash2 className="mr-1" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <FaBookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No books found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try a different search term' : 'Add some books to get started'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Update Book Modal */}
      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Update Book</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedBook.title}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <input
                      type="text"
                      name="author"
                      defaultValue={selectedBook.author}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      name="category"
                      defaultValue={selectedBook.category}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Fiction">Fiction</option>
                      <option value="Non-Fiction">Non-Fiction</option>
                      <option value="Science">Science</option>
                      <option value="History">History</option>
                      <option value="Biography">Biography</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (RS)</label>
                    <input
                      type="number"
                      name="price"
                      step="0.01"
                      defaultValue={selectedBook.price}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
                    <input
                      type="number"
                      name="pages"
                      defaultValue={selectedBook.pages}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
                
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                  <input
                    type="text"
                    name="publisher"
                    defaultValue={selectedBook.publisher}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div> */}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <input
                    type="text"
                    name="language"
                    defaultValue={selectedBook.language}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    defaultValue={selectedBook.description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default BookList;