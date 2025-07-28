import React from 'react';
import { technicalSkills, keyStrengths, certifications } from '../data/mock';
import { Code, Database, Settings, TestTube, Bug, GitBranch, FileText, Award, Star } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    { title: 'Languages', skills: technicalSkills.languages, icon: Code, color: 'bg-blue-500' },
    { title: 'Automation', skills: technicalSkills.automation, icon: Settings, color: 'bg-green-500' },
    { title: 'API Testing', skills: technicalSkills.apiTesting, icon: TestTube, color: 'bg-purple-500' },
    { title: 'Manual Testing', skills: technicalSkills.manualTesting, icon: Bug, color: 'bg-red-500' },
    { title: 'Version Control', skills: technicalSkills.versionControl, icon: GitBranch, color: 'bg-orange-500' },
    { title: 'Databases', skills: technicalSkills.databases, icon: Database, color: 'bg-indigo-500' },
    { title: 'Documentation', skills: technicalSkills.documentation, icon: FileText, color: 'bg-teal-500' },
    { title: 'Build & CI/CD', skills: technicalSkills.buildCICD, icon: Settings, color: 'bg-gray-500' }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Technical Skills</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive toolkit for quality assurance and testing excellence
          </p>
        </div>

        {/* Technical Skills Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`${category.color} p-2 rounded-lg`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Strengths */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Key Strengths</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {keyStrengths.map((strength, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <Star className="text-yellow-500 mt-1" size={20} />
                  <p className="text-gray-700 leading-relaxed">{strength}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Certifications</h3>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <Award className="text-blue-600" size={24} />
                  <span className="text-lg font-semibold text-gray-900">{cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;