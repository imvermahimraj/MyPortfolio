import React from 'react';
import { personalInfo } from '../data/mock';
import { Heart, Code, TestTube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Name and Title */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">{personalInfo.name}</h3>
            <p className="text-gray-400">{personalInfo.title}</p>
          </div>

          {/* Quote */}
          <div className="mb-8 max-w-2xl mx-auto">
            <blockquote className="text-lg italic text-gray-300 leading-relaxed">
              "Quality is not an act, it is a habit. Every bug caught is a user's frustration prevented."
            </blockquote>
          </div>

          {/* Icons */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-blue-400">
              <Code size={24} />
              <span className="text-sm">Automation</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <TestTube size={24} />
              <span className="text-sm">Testing</span>
            </div>
            <div className="flex items-center gap-2 text-red-400">
              <Heart size={24} />
              <span className="text-sm">Quality</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-gray-400 text-sm mb-8">
            <p>{personalInfo.location}</p>
            <p>{personalInfo.email} | {personalInfo.phone}</p>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Built with passion for quality assurance and user experience
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;