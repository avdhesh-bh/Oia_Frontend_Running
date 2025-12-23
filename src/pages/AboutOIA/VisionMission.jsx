import React from 'react';
import { useStaticContentByKey } from '../../hooks/useOIAData';
import { Helmet } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const VisionMission = () => {
  const { data: content, isLoading } = useStaticContentByKey('vision_mission');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#283887]" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Vision & Mission | About OIA - Medi-Caps University</title>
      </Helmet>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {content ? (
              <div className="prose prose-slate max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold text-[#283887] mb-6">Vision & Mission</h1>
                <div className="space-y-6">
                  <section>
                    <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                    <p className="text-slate-600">
                      To establish Medi-Caps University as a globally recognized institution fostering international
                      collaboration, cultural diversity, and academic excellence.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>Promote student and faculty mobility through strategic partnerships</li>
                      <li>Facilitate research collaboration with leading international institutions</li>
                      <li>Provide comprehensive support to international students and scholars</li>
                      <li>Develop innovative programs that prepare students for global careers</li>
                      <li>Build sustainable relationships with universities, industries, and governments worldwide</li>
                    </ul>
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VisionMission;


