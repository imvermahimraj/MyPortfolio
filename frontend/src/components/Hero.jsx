import React from 'react';
import { MapPin, Phone, Mail, Download } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image Placeholder */}
          <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
            HV
          </div>
          
          {/* Name and Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {personalInfo.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-blue-600 font-semibold mb-6">
            {personalInfo.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {personalInfo.experience} of experience in Manual and Automation testing
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-blue-600" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={20} className="text-blue-600" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-blue-600" />
              <span>{personalInfo.email}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
              View My Work
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 justify-center">
              <Download size={20} />
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;