import React from "react";
import { FEATURES } from "../../utils/data";

function Features() {
  return (
    <div className="py-20 sm:py-32 bg-white" id="features"> 
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center mb-4">
            <span className="text-xs font-semibold tracking-widest text-purple-700 uppercase px-3 py-1 bg-purple-100 rounded-full">Features</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Everything You Need to
            <span className="block text-purple-600">Create Your Ebook</span>
          </h2>
          <p className="mt-4 text-xl leading-8 text-gray-600">
            Our platform is packed with powerful features to help you write, design, and publish your ebook effortlessly.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 group">
                  <div className="mb-6">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg 
                                 shadow-${feature.gradient.split('-')[2]}/20 transition-transform duration-300`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-base text-gray-600">{feature.description}</p>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center">
                      Learn More
                      <svg
                        className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-gray-100 text-center">
          <p className="text-xl font-semibold text-gray-700 mb-6"> Ready to get started?</p>
          <a href="/signup" 
             className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition duration-150 ease-in-out"
          >
            <span> Start Creating Today</span>
            <svg
              className="ml-3 -mr-1 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Features;
