"use client";

import React from "react";
import { motion } from "framer-motion";
import { PortfolioData, DEFAULT_PROFILE } from "../types";

export default function SimplePortfolio({ data = {} as PortfolioData }) {
  // Ensure data exists with fallbacks
  const safeData = {
    ...DEFAULT_PROFILE,
    ...(data || {}),
    education: data?.education || [],
    experience: data?.experience || [],
    leadership: data?.leadership || [],
    contact: data?.contact || {}
  };
  

  try {
    return (
      <div className="bg-white min-h-screen p-8 font-sans max-w-4xl mx-auto">
        <header className="mb-12 border-b pb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{safeData.name}</h1>
          <p className="text-xl text-gray-600">{safeData.title}</p>
        </header>

        <main className="space-y-12">
          {/* Education */}
          {safeData.education && safeData.education.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Education</h2>
              <div className="space-y-6">
                {safeData.education.map((edu, i) => (
                  <motion.div 
                    key={i} 
                    className="border-l-4 border-blue-500 pl-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h3 className="font-bold text-xl">{edu.institution}</h3>
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-gray-600">{edu.details}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {safeData.experience && safeData.experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Experience</h2>
              <div className="space-y-8">
                {safeData.experience.map((exp, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl">{exp.role}</h3>
                      <span className="text-gray-600">{exp.duration}</span>
                    </div>
                    <p className="font-medium mb-2">{exp.company}</p>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {exp.highlights.map((highlight, hi) => (
                          <li key={hi}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Leadership */}
          {safeData.leadership && safeData.leadership.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Leadership</h2>
              <div className="space-y-8">
                {safeData.leadership.map((lead, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl">{lead.role}</h3>
                      <span className="text-gray-600">{lead.duration}</span>
                    </div>
                    <p className="font-medium mb-2">{lead.organization}</p>
                    {lead.highlights && lead.highlights.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {lead.highlights.map((highlight, hi) => (
                          <li key={hi}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Contact */}
          <section className="bg-gray-100 p-6 rounded-lg mt-12">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="flex flex-wrap gap-4">
              {safeData.contact?.email && (
                <a href={`mailto:${safeData.contact.email}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                  <span className="font-medium">Email:</span> {safeData.contact.email}
                </a>
              )}
              {safeData.contact?.github && (
                <a href={`https://github.com/${safeData.contact.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <span className="font-medium">GitHub:</span> {safeData.contact.github}
                </a>
              )}
              {safeData.contact?.linkedin && (
                <a href={`https://linkedin.com/in/${safeData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <span className="font-medium">LinkedIn:</span> {safeData.contact.linkedin}
                </a>
              )}
            </div>
          </section>
        </main>
      </div>
    );
  } catch (err) {
    console.error("Error rendering SimplePortfolio:", err);
    return (
      <div className="bg-white min-h-screen p-8 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 bg-red-50 border border-red-200 rounded-lg text-center">
          <h2 className="text-xl font-bold text-red-600 mb-3">Template Error</h2>
          <p className="mb-4">There was an error loading this portfolio template.</p>
          <p className="text-sm text-gray-600">Try selecting a different template or refreshing the page.</p>
        </div>
      </div>
    );
  }
}