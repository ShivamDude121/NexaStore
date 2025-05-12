"use client"
import React from 'react';

export default function SignUpSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in-up">
        {/* Header Skeleton */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex items-center">
              {/* Logo skeleton with spin animation */}
              <div className="h-12 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-spin-slow"></div>
              <div className="ml-2 h-8 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer"></div>
            </div>
          </div>
          {/* Title skeleton with delayed animation */}
          <div className="mt-6 h-8 w-64 mx-auto bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer animation-delay-200"></div>
          {/* Subtitle skeleton with more delay */}
          <div className="mt-2 h-4 w-56 mx-auto bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer animation-delay-400"></div>
        </div>

        {/* Form Skeleton */}
        <div className="mt-8 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6 animate-float">
            {/* First Name Field */}
            <div className="animate-fade-in-up animation-delay-100">
              <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer mb-2"></div>
              <div className="h-10 w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-md animate-pulse-smooth"></div>
            </div>

            {/* Last Name Field */}
            <div className="animate-fade-in-up animation-delay-200">
              <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer mb-2"></div>
              <div className="h-10 w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-md animate-pulse-smooth"></div>
            </div>

            {/* Email Field */}
            <div className="animate-fade-in-up animation-delay-300">
              <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer mb-2"></div>
              <div className="h-10 w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-md animate-pulse-smooth"></div>
            </div>

            {/* Password Field */}
            <div className="animate-fade-in-up animation-delay-400">
              <div className="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer mb-2"></div>
              <div className="relative">
                <div className="h-10 w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-md animate-pulse-smooth"></div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-spin-slow"></div>
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div className="animate-fade-in-up animation-delay-500">
              <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer mb-3"></div>
              <div className="space-y-3">
                {/* User Role Option */}
                <div className="flex items-center animate-fade-in-left">
                  <div className="h-4 w-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse-glow"></div>
                  <div className="ml-3 flex items-center">
                    <div className="h-5 w-5 bg-gradient-to-r from-green-100 to-green-200 rounded animate-pulse-smooth mr-2"></div>
                    <div>
                      <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer mb-1"></div>
                      <div className="h-3 w-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer"></div>
                    </div>
                  </div>
                </div>
                
                {/* Admin Role Option */}
                <div className="flex items-center animate-fade-in-left animation-delay-100">
                  <div className="h-4 w-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse-glow"></div>
                  <div className="ml-3 flex items-center">
                    <div className="h-5 w-5 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded animate-pulse-smooth mr-2"></div>
                    <div>
                      <div className="h-4 w-28 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer mb-1"></div>
                      <div className="h-3 w-44 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="animate-fade-in-up animation-delay-600">
              <div className="h-12 w-full bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-md animate-pulse-glow"></div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-4 animate-fade-in-up animation-delay-700">
          <div className="h-4 w-48 mx-auto bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer"></div>
          <div className="h-4 w-32 mx-auto bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulse-glow {
          0% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
        }

        @keyframes pulse-smooth {
          0% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.8;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 400% 100%;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-pulse-smooth {
          animation: pulse-smooth 1.5s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
}