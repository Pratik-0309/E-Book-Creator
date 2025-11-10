import React from "react";
import { BookOpen, Twitter, Linkedin, Github } from "Lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 sm:pt-24 lg:pt-32 border-t border-gray-800 -mb-[90vh]">
      {/* Subtitle BackGround Pattern (Decorative Layer) */}
      <div className="absolute inset-x-0 top-0 h-48">
        <div className="absolute inset-0 "></div>
      </div>

      {/* Main Content Grid Wrapper */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 md:grid-cols-2">
          {/* Brand & Social Section */}
          <div className="space-y-6">
            {/* Brand Logo and Name */}
            <a href="/" className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <BookOpen className="h-8 w-8 text-indigo-500" />
              </div>
              <span className="text-2xl font-bold text-white">E-Book Creator</span>
            </a>
            {/* Description */}
            <p className="text-gray-400 text-base">
              Create, design, and Publish stunning ebooks with the power of AI.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-6">
              <a href="https://twitter.com" className="text-gray-400 hover:text-indigo-400 transition" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-indigo-400 transition" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://github.com" className="text-gray-400 hover:text-indigo-400 transition" aria-label="Github">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links Group Container (Product, Company, Legal) */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-y-12 col-span-1 xl:col-span-3">
            {/* Product Links */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#feature" className="text-base text-gray-400 hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#Pricing" className="text-base text-gray-400 hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#templates" className="text-base text-gray-400 hover:text-white transition">
                    Templates
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#about" className="text-base text-gray-400 hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-base text-gray-400 hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-base text-gray-400 hover:text-white transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="md:col-span-1">
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase"> Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#privacy" className="text-base text-gray-400 hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="text-base text-gray-400 hover:text-white transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar (Copyright) */}
      <div className="mt-12 border-t border-gray-800 pt-8 pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm text-gray-500 order-2 md:order-1 mt-4 md:mt-0">
            © {new Date().getFullYear()} E-Book Creator. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 order-1 md:order-2">
            Made with <span className="text-red-500">❤</span> for creators
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;