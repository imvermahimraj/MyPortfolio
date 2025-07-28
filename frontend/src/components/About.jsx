import React from 'react';
import { personalStory, philosophy, interests, futurePlans } from '../data/mock';
import { User, Heart, Target, Trophy } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From customer support to quality assurance - a journey driven by curiosity and a natural eye for detail
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Personal Story */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <User className="text-blue-600" size={32} />
              <h3 className="text-2xl font-bold text-gray-900">{personalStory.title}</h3>
            </div>
            <div className="text-gray-700 leading-relaxed text-lg space-y-4">
              {personalStory.story.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Grid of Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* QA Philosophy */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="text-red-500" size={28} />
                <h3 className="text-xl font-bold text-gray-900">{philosophy.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{philosophy.description}</p>
            </div>

            {/* Tennis Interest */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="text-yellow-500" size={28} />
                <h3 className="text-xl font-bold text-gray-900">{interests.tennis.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">{interests.tennis.description}</p>
              <div className="flex flex-wrap gap-2">
                {interests.tennis.favorites.slice(0, 3).map((player, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {player}
                  </span>
                ))}
              </div>
            </div>

            {/* Future Plans */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-green-500" size={28} />
                <h3 className="text-xl font-bold text-gray-900">{futurePlans.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{futurePlans.description}</p>
            </div>
          </div>

          {/* Tech Interest */}
          <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{interests.technology.title}</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{interests.technology.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;