import React from 'react';
import { professionalExperience } from '../data/mock';
import { Building, Calendar, CheckCircle } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Professional Experience</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building quality software through comprehensive testing and automation
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {professionalExperience.position}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <Building className="text-blue-600" size={20} />
                  <span className="text-lg font-semibold text-gray-700">
                    {professionalExperience.company}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                <Calendar className="text-blue-600" size={18} />
                <span className="font-semibold text-gray-700">
                  {professionalExperience.duration}
                </span>
              </div>
            </div>

            {/* Responsibilities */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Key Responsibilities & Achievements</h4>
              <div className="grid gap-4">
                {professionalExperience.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <p className="text-gray-700 leading-relaxed">{responsibility}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Highlight */}
            <div className="mt-8 pt-6 border-t border-blue-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Core Technologies Used</h4>
              <div className="flex flex-wrap gap-3">
                {['Selenium WebDriver', 'Java', 'Postman', 'JIRA', 'Maven', 'Jenkins', 'AEM', 'Windchill PLM', 'BrowserStack'].map((tech, index) => (
                  <span key={index} className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;