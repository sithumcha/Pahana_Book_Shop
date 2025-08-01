// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
// import { FiCheckCircle } from 'react-icons/fi';

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [result, setResult] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setResult('Sending...');

//     const formDataToSend = new FormData();
//     formDataToSend.append('access_key', 'f42395e8-8c6c-4913-9e69-1857f6f80658'); // Web3Forms API key
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('email', formData.email);
//     formDataToSend.append('message', formData.message);

//     try {
//       const response = await fetch('https://api.web3forms.com/submit', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       const data = await response.json();

//       if (data.success) {
//         setResult('');
//         setIsSubmitted(true);
//         setFormData({ name: '', email: '', message: '' });
//         toast.success('Form Submitted Successfully!');
//       } else {
//         console.error('Error', data);
//         toast.error(data.message || 'Submission failed.');
//       }
//     } catch (error) {
//       toast.error('An error occurred. Please try again.');
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="bg-gray-50">
//       {/* Hero Section */}
//       <div className="relative bg-indigo-900 text-white py-20 px-4 sm:px-6 lg:px-8">
//         <div className="absolute inset-0 bg-black/50">
//           <img
//             src="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
//             alt="Bookshop interior"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="relative max-w-7xl mx-auto text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
//           <p className="text-xl md:text-2xl max-w-3xl mx-auto">
//             We'd love to hear from you! Reach out with questions, feedback, or just to say hello.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Contact Form */}
//           <div className="bg-white p-8 rounded-xl shadow-lg">
//             <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

//             {isSubmitted ? (
//               <div className="text-center py-8">
//                 <FiCheckCircle className="mx-auto text-green-500 text-5xl mb-4" />
//                 <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
//                 <p className="text-gray-600 mb-6">
//                   Thank you for contacting us. We'll get back to you within 24 hours.
//                 </p>
//                 <button
//                   onClick={() => setIsSubmitted(false)}
//                   className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
//                 >
//                   Send Another Message
//                 </button>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                     placeholder="Your name"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                     placeholder="your@email.com"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                     Your Message
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     required
//                     rows="5"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                     placeholder="How can we help you?"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
//                 >
//                   <FaPaperPlane />
//                   <span>Send Message</span>
//                 </button>
//               </form>
//             )}
//           </div>

//           {/* Contact Information */}
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Contact Details</h2>

//             <div className="space-y-6">
//               <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
//                 <div className="bg-indigo-100 p-3 rounded-full">
//                   <FaMapMarkerAlt className="text-indigo-600 text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold mb-1">Visit Our Bookshop</h3>
//                   <p className="text-gray-600">123 Literary Lane, Booktown, BT12 3AB</p>
//                   <button className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
//                     Get Directions →
//                   </button>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
//                 <div className="bg-indigo-100 p-3 rounded-full">
//                   <FaPhone className="text-indigo-600 text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold mb-1">Call Us</h3>
//                   <p className="text-gray-600">+1 (555) 123-4567</p>
//                   <p className="text-gray-500 text-sm mt-1">Mon-Fri: 9am-6pm</p>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
//                 <div className="bg-indigo-100 p-3 rounded-full">
//                   <FaEnvelope className="text-indigo-600 text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold mb-1">Email Us</h3>
//                   <p className="text-gray-600">hello@pahanabooks.com</p>
//                   <p className="text-gray-500 text-sm mt-1">We respond within 24 hours</p>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
//                 <div className="bg-indigo-100 p-3 rounded-full">
//                   <FaClock className="text-indigo-600 text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold mb-1">Opening Hours</h3>
//                   <ul className="text-gray-600 space-y-1">
//                     <li className="flex justify-between">
//                       <span>Monday - Friday</span>
//                       <span>9:00 AM - 7:00 PM</span>
//                     </li>
//                     <li className="flex justify-between">
//                       <span>Saturday</span>
//                       <span>10:00 AM - 6:00 PM</span>
//                     </li>
//                     <li className="flex justify-between">
//                       <span>Sunday</span>
//                       <span>11:00 AM - 5:00 PM</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Map Section */}
//         <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
//           <iframe
//             title="Bookshop Location"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291234!2d-73.9878449242395!3d40.74844097138996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1685476787895!5m2!1sen!2sus"
//             width="100%"
//             height="400"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             loading="lazy"
//             className="rounded-lg"
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;



import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane, FaBook } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await emailjs.sendForm(
        'service_uf3qcns',         // Your EmailJS service ID
        'template_ips49hu',        // Your EmailJS template ID
        formRef.current,           // Pass the form reference
        'UcoaxTY2jf8pmZXIl'        // Your EmailJS public key
      );
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-black/50">
          <img
            src="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
            alt="Bookshop interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            We'd love to hear from you! Reach out with questions, feedback, or just to say hello.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

            {isSubmitted ? (
              <div className="text-center py-8">
                <FiCheckCircle className="mx-auto text-green-500 text-5xl mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
                >
                  <FaPaperPlane />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Contact Details</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Visit Our Bookshop</h3>
                  <p className="text-gray-600">123 Literary Lane, Booktown, BT12 3AB</p>
                  <button className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Get Directions →
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <FaPhone className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-500 text-sm mt-1">Mon-Fri: 9am-6pm</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <FaEnvelope className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                  <p className="text-gray-600">hello@pahanabooks.com</p>
                  <p className="text-gray-500 text-sm mt-1">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <FaClock className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Opening Hours</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 7:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>11:00 AM - 5:00 PM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
          <iframe
            title="Bookshop Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291234!2d-73.9878449242395!3d40.74844097138996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1685476787895!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;