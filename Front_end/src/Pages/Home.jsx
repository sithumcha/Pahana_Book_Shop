import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import About from '../Components/About';
import ContactUs from '../Components/Contactus';
import NewArrivals from './NewArrivals';
import Header from '../Components/Header';
 


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Top section */}
      <main className="flex-grow">
        <section className="p-8 text-center bg-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
          <p className="text-lg text-gray-600">This is the main content of the homepage.</p>
        </section>


         <section className="bg-gray-100 py-10">
          <Header />
        </section>

         {/* All Books  */}
        <section className="bg-gray-100 py-10">
          <NewArrivals />
        </section>


        {/* About  */}
        <section className="bg-gray-100 py-10">
          <About />
        </section>


        {/* Contact  */}
        <section className="bg-gray-100 py-10">
          <ContactUs />
        </section>



      


       
      </main>

      <Footer />
    </div>
  );
}
