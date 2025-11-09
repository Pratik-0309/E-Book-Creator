import { ArrowRight, Sparkles, BookOpen, Zap } from "Lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Hero1 from "../../assets/Hero1.png"

function Hero() {
  const { isAuthenticated } = useAuth();

  return (
<section className="relative bg-white min-h-[70vh] flex items-center py-10 lg:py-16 overflow-hidden">
    <div className="container mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Content */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-7 text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start space-x-2 bg-purple-50 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full w-fit mx-auto lg:mx-0 shadow-md border border-purple-200">
                <Sparkles size={16} className="text-purple-600" />
                <span className="text-purple-700 tracking-wider uppercase">AI-Powered Publishing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                Create Stunning
                <span className="block text-fuchsia-600 lg:inline-block"> E-Books In Minutes</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                From idea to publishing ebook, our AI-powered platform helps you
                write, design, and export professional-quality books effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 mt-4">
                <Link
                    to={isAuthenticated ? "/dashboard" : "/login"}
                    className="inline-flex items-center space-x-2 px-8 py-3 bg-fuchsia-600 text-white font-bold rounded-2xl shadow-lg shadow-fuchsia-300/50 hover:bg-fuchsia-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-white"
                >
                    <span className="text-lg">Start Creating for free</span>
                    <ArrowRight size={20} className="ml-1" />
                </Link>
                <a
                    href="#demo"
                    className="inline-flex items-center space-x-2 text-gray-700 font-medium hover:text-fuchsia-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white p-3 rounded-full border border-gray-300 hover:border-purple-500"
                >
                    <span>Watch Demo</span>
                    <span className="text-purple-500 ml-1">&#9658;</span>
                </a>
            </div>

            <div className="flex justify-center lg:justify-start space-x-8 mt-8 pt-8 border-t border-gray-100">
                <div className="text-center lg:text-left">
                    <div className="text-3xl font-extrabold text-gray-900">50k+</div>
                    <div className="text-sm text-gray-500">Books Created</div>
                </div>
                <div className="w-px bg-gray-200 h-10 self-center"></div>
                <div className="text-center lg:text-left">
                    <div className="text-3xl font-extrabold text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-500">User Rating</div>
                </div>
                <div className="w-px bg-gray-200 h-10 self-center"></div>
                <div className="text-center lg:text-left">
                    <div className="text-3xl font-extrabold text-gray-900">10 min</div>
                    <div className="text-sm text-gray-500">Avg. Creation</div>
                </div>
            </div>
        </div>

        {/* Right Image Section */}
        <div className="lg:col-span-6 relative flex justify-center items-center h-[500px] mt-8 lg:mt-0">
            <div className="relative w-full max-w-xl h-full flex items-center justify-center">
                <div className="absolute inset-0 rounded-2xl opacity-60 blur-2xl"></div>
                
                <div className="relative w-full h-full rounded-2xl border border-gray-200 overflow-hidden flex items-center justify-center transition-all duration-500 
                           hover: shadow-2xl hover:shadow-purple-900">
                    
                    <img
                        className="object-cover w-full max-h-full" 
                        src={Hero1}
                        alt="AI-Ebook Creator Dashboard Mockup"
                    />
                    
                    <div className="absolute top-8 right-8 p-4 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center space-x-3 w-48">
                        <div className="flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-600 rounded-full shadow-inner">
                            <Zap size={20} />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-800">Processing</div>
                            <div className="text-xs text-gray-500">AI generation</div>
                        </div>
                    </div>
                    
                    <div className="absolute bottom-8 left-8 p-4 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center space-x-3 w-48">
                        <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-full shadow-inner">
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-800">Completed</div>
                            <div className="text-xs text-gray-500">247 Pages</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

  );
}

export default Hero;
