import React from 'react';
import { projectHighlights } from '../data/mock';
import { Folder, ExternalLink, ChevronRight } from 'lucide-react';
import { usePageView } from '../hooks/useAnalytics';

const Projects = () => {
  usePageView('projects');

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Project Highlights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world testing projects that demonstrate expertise and impact
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {projectHighlights.map((project, index) => (
              <div key={project.id} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
                {/* Project Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-lg">
                    <Folder className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                      <span>Project {project.id}</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Link */}
                <div className="pt-4 border-t border-gray-200">
                  <button className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    <ExternalLink size={16} />
                    View Project Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Projects Teaser */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">More Projects Coming Soon</h3>
              <p className="text-gray-600 mb-6">
                Currently working on exciting new testing automation projects and frameworks.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
                Stay Tuned
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;