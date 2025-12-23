import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Users, Code, Globe, Heart } from 'lucide-react';

const DevTeam = () => {
  const teamMembers = [
    {
      name: 'Avdhesh Bhadoriya',
      role: 'Team Lead',
      description: 'Led the development of the OIA website with expertise in full-stack development and project management.',
      skills: ['React', 'Node.js', 'MongoDB', 'UI/UX Design'],
      icon: <Code className="h-8 w-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-8 w-8 text-[#283887]" />
            <h1 className="text-3xl font-bold text-slate-900">Developing Team of Website</h1>
          </div>
          <p className="text-slate-600">MII Foundation - Building the future of international education</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Development Team</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            The talented individuals behind the Office of International Affairs website, 
            dedicated to creating a seamless experience for students and faculty.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow border-slate-200 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-[#283887] to-[#3B82F6] rounded-full flex items-center justify-center text-white">
                  {member.icon}
                </div>
                <CardTitle className="text-2xl font-semibold text-slate-900 mb-2">
                  {member.name}
                </CardTitle>
                <Badge className="bg-[#A21D2E] text-white px-4 py-1">
                  {member.role}
                </Badge>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {member.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Foundation Info */}
        <Card className="bg-gradient-to-r from-[#283887]/10 to-[#A21D2E]/10 border-slate-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-900 flex items-center justify-center">
              <Heart className="h-6 w-6 mr-2 text-[#A21D2E]" />
              MII Foundation
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Empowering education through technology and innovation
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-slate-700 leading-relaxed max-w-3xl mx-auto">
              The MII Foundation is committed to transforming educational experiences through 
              cutting-edge technology solutions. Our team works tirelessly to create platforms 
              that bridge gaps in international education and foster global collaboration.
            </p>
            <div className="mt-6 flex justify-center space-x-8">
              <div className="text-center">
                <Globe className="h-8 w-8 text-[#283887] mx-auto mb-2" />
                <div className="font-semibold text-slate-900">Global Impact</div>
                <div className="text-sm text-slate-600">Worldwide Reach</div>
              </div>
              <div className="text-center">
                <Code className="h-8 w-8 text-[#A21D2E] mx-auto mb-2" />
                <div className="font-semibold text-slate-900">Innovation</div>
                <div className="text-sm text-slate-600">Cutting-edge Tech</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-[#283887] mx-auto mb-2" />
                <div className="font-semibold text-slate-900">Collaboration</div>
                <div className="text-sm text-slate-600">Team Excellence</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevTeam;
