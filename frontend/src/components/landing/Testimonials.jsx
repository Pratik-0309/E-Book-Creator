import React from "react";
import { Star, Quote } from "Lucide-react";
import { TESTIMONIALS } from "../../utils/data";

function Testimonials() {
  return (
 <div
  id="testimonials"
  className="relative py-20 overflow-hidden bg-gray-50 sm:py-32"
>
  {/* Decorative Element 1 (Top Right Blur) */}
  <div className="absolute top-0 right-0 h-96 w-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
  {/* Decorative Element 2 (Bottom Left Blur) */}
  <div className="absolute bottom-0 left-0 h-96 w-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

  {/* Main Content Container */}
  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
    {/* Header Section */}
    <div className="mx-auto max-w-2xl text-center">
      <div className="flex items-center justify-center mb-4">
        <Star className="w-5 h-5 text-yellow-400 mr-2" />
        <span className="text-sm font-semibold tracking-wide text-purple-600 uppercase">
          Testimonials
        </span>
      </div>
      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
        Loved By Creators
        <span className="block text-indigo-600">Everywhere</span>
      </h2>
      <p className="mt-4 text-xl leading-8 text-gray-600">
        Don't just take Our word for it. Here's what our users have to say
        about their experience.
      </p>
    </div>

    {/* Testimonials Grid */}
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
      {TESTIMONIALS.map((testimonial, index) => {
        return (
          <div
            key={index}
            className="relative p-8 pt-16 bg-white rounded-2xl shadow-xl overflow-hidden group transition duration-300 hover:shadow-2xl hover:shadow-purple-400/50"
          >
            {/* Quote Icon - Already aligned top-left */}
            <div className="absolute top-0 left-0 mt-1 ml-1 flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600 shadow-lg transform">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Rating Star */}
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => {
                return <Star key={i} className="w-5 h-5 text-yellow-400 " />;
              })}
            </div>

            {/* Quote */}
            <p className="text-lg font-medium leading-7 text-gray-800">
              "{testimonial.quote}"
            </p>

            {/* Author Info */}
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-500 ring-offset-2"
                  src={testimonial.avatar}
                  alt={testimonial.author}
                />
              </div>
              <div className="ml-4">
                <p className="text-base font-semibold text-gray-900">
                  {" "}
                  {testimonial.author}{" "}
                </p>
                <p className="text-sm text-gray-500">
                  {" "}
                  {testimonial.title}{" "}
                </p>
              </div>
            </div>

            {/* MODIFIED: Removed the internal hover gradient div since we are using shadow instead */}
          </div>
        );
      })}
    </div>

    {/* Bottom Stats */}
    <div className="mt-20 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
      <div className="p-4">
        <div className="text-4xl font-extrabold text-indigo-600">50K+</div>
        <div className="mt-2 text-lg font-medium text-gray-600">
          Happy Creators
        </div>
      </div>
      <div className="p-4">
        <div className="text-4xl font-extrabold text-indigo-600">4.9/5</div>
        <div className="mt-2 text-lg font-medium text-gray-600">
          Average Rating
        </div>
      </div>
      <div className="p-4">
        <div className="text-4xl font-extrabold text-indigo-600">100K+</div>
        <div className="mt-2 text-lg font-medium text-gray-600">
          E-books Created
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default Testimonials;
