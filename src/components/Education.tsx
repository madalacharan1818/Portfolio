import React from 'react';
import { educationList, certifications, languages } from '../data/education';
import { GraduationCap, Award, Globe2, BookOpen, Calendar, MapPin, Download, Eye } from 'lucide-react';
import { downloadResumeFile } from '../utils/resumeDownload';

interface EducationProps {
  onOpenResume?: () => void;
}

export const Education: React.FC<EducationProps> = ({ onOpenResume }) => {
  return (
    <section id="education" className="py-20 bg-[#101B2D] border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] uppercase tracking-wider mb-2">
            <span>06. Credentials &amp; Academics</span>
            <span className="text-[#334155]">/</span>
            <span className="text-[#94A3B8]">Education &amp; Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Academic Foundation &amp; Specialized VLSI Training.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#94A3B8]">
            Formal graduate engineering education combined with intensive EDA tool training in advanced physical design methodologies.
          </p>
        </div>

        {/* 2-Column Split: Education & Training on Left, Certifications & Languages on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Formal Education & VLSI Training Timeline */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-mono text-xs font-semibold text-[#22D3EE] uppercase tracking-wider flex items-center gap-2 mb-4">
              <GraduationCap className="w-4 h-4 text-[#22D3EE]" />
              Physical Design Training &amp; Degrees
            </h3>

            <div className="space-y-6">
              {educationList.map((item) => {
                const isTraining = item.type === 'training';

                return (
                  <div
                    key={item.id}
                    className="p-6 bg-[#1E293B] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#334155]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[11px] font-semibold uppercase ${
                              isTraining ? 'text-[#F59E0B]' : 'text-[#22D3EE]'
                            }`}
                          >
                            {isTraining ? 'SPECIALIZED VLSI TRAINING' : 'ACADEMIC DEGREE'}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-[#F8FAFC] mt-1">
                          {item.degree}
                        </h4>
                        <div className="text-xs font-mono text-[#94A3B8] mt-0.5">
                          {item.institution} {item.location ? `· ${item.location}` : ''}
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F8FAFC]">
                          <Calendar className="w-3.5 h-3.5 text-[#22D3EE]" />
                          <span>{item.period}</span>
                        </div>
                        <div className="text-xs font-mono font-semibold text-[#22D3EE] mt-0.5">
                          {item.result}
                        </div>
                      </div>
                    </div>

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="space-y-2 pt-1">
                        {item.highlights.map((hl, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[#94A3B8]"
                          >
                            <span className="text-[#22D3EE] mt-0.5 font-mono">▸</span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Certifications & Languages */}
          <div className="lg:col-span-4 space-y-6">
            {/* Certifications Card */}
            <div className="p-6 bg-[#1E293B] border border-[#334155] rounded-[4px] space-y-4">
              <h3 className="font-mono text-xs font-semibold text-[#F59E0B] uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-[#F59E0B]" />
                Professional Certifications
              </h3>

              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3.5 bg-[#101B2D] border border-[#334155] rounded-[4px] space-y-1.5"
                  >
                    <div className="text-xs font-mono text-[#22D3EE]">{cert.issuer}</div>
                    <div className="text-sm font-semibold text-[#F8FAFC]">
                      {cert.title}
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Proficiencies Card */}
            <div className="p-6 bg-[#1E293B] border border-[#334155] rounded-[4px] space-y-4">
              <h3 className="font-mono text-xs font-semibold text-[#22D3EE] uppercase tracking-wider flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#22D3EE]" />
                Language Proficiencies
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-[#101B2D] border border-[#334155] rounded-[2px]"
                  >
                    <span className="font-semibold text-[#F8FAFC]">{lang.name}</span>
                    <span className="text-[#94A3B8]">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Resume Download Callout */}
            <div className="p-5 bg-[#152032] border border-[#22D3EE]/40 rounded-[4px] space-y-3">
              <div className="text-xs font-mono text-[#22D3EE] uppercase font-semibold">
                Official PDF Document
              </div>
              <p className="text-xs text-[#94A3B8]">
                Download Charan Madala's complete physical design résumé with academic transcripts and project details.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={async () => {
                    try {
                      await downloadResumeFile('Charan_Madala_VLSI_Physical_Design_Resume.pdf');
                    } catch {
                      if (onOpenResume) onOpenResume();
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono font-semibold text-[#101B2D] bg-[#22D3EE] hover:bg-[#67E8F9] rounded-[4px] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Résumé</span>
                </button>
                {onOpenResume && (
                  <button
                    onClick={onOpenResume}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono text-[#D8E3FC] hover:text-[#22D3EE] bg-[#101B2D] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#22D3EE]" />
                    <span>View Interactive Résumé</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
