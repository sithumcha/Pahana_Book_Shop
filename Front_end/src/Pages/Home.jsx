import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import About from '../Components/About';
import ContactUs from '../Components/Contactus';
import NewArrivals from './NewArrivals';
import Header from '../Components/Header';
 


export default function Home() {
  return (


    <div >
      <Navbar />
 <Header />
 <NewArrivals />
 <About />
   <ContactUs />
    


      {/* <main className="flex-grow">
       
 
         <section className="bg-gray-100 py-10">
       
        </section>

      </main> */}

      <Footer />
    </div>
  );
}
