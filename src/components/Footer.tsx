import React from 'react';
import { Download, Linkedin, Github, Mail, ArrowUp, FileText, Eye } from 'lucide-react';
import { downloadResumeFile } from '../utils/resumeDownload';

interface FooterProps {
  onOpenResume?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#081325] border-t border-[#334155] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-10 border-b border-[#334155]">
          {/* Brand & Stature */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-[1px] bg-[#22D3EE]" />
              <span className="text-lg font-bold text-[#F8FAFC] tracking-tight">
                Charan Madala
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] max-w-sm leading-relaxed">
              VLSI Physical Design Engineer specializing in RTL-to-GDSII flow implementation with Cadence Genus and Innovus.
            </p>
            <div className="text-xs font-mono text-[#94A3B8] flex items-center gap-2 pt-1">
              <span>Hyderabad, India</span>
              <span>·</span>
              <a
                href="mailto:madalacharan1818@gmail.com"
                className="text-[#22D3EE] hover:underline"
              >
                madalacharan1818@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-mono text-[#F8FAFC] uppercase tracking-wider mb-2">
              Portfolio Navigation
            </div>
            <div className="grid grid-cols-2 gap-y-1.5 text-xs text-[#94A3B8] font-mono">
              <a href="#about" className="hover:text-[#22D3EE] transition-colors">
                About Me
              </a>
              <a href="#skills" className="hover:text-[#22D3EE] transition-colors">
                Technical Skills
              </a>
              <a href="#projects" className="hover:text-[#22D3EE] transition-colors">
                Featured Projects
              </a>
              <a href="#analysis" className="hover:text-[#22D3EE] transition-colors">
                Physical Analysis
              </a>
              <a href="#gallery" className="hover:text-[#22D3EE] transition-colors">
                Innovus Gallery
              </a>
              <a href="#education" className="hover:text-[#22D3EE] transition-colors">
                Education &amp; Training
              </a>
              <a href="#contact" className="hover:text-[#22D3EE] transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Direct Actions */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono text-[#F8FAFC] uppercase tracking-wider mb-2">
              Verified Links
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/charan-madala-b8072321b"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#1E293B] border border-[#334155] hover:border-[#22D3EE] text-[#94A3B8] hover:text-[#22D3EE] rounded-[4px] transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/madalacharan1818"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#1E293B] border border-[#334155] hover:border-[#22D3EE] text-[#94A3B8] hover:text-[#22D3EE] rounded-[4px] transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:madalacharan1818@gmail.com"
                className="p-2 bg-[#1E293B] border border-[#334155] hover:border-[#22D3EE] text-[#94A3B8] hover:text-[#22D3EE] rounded-[4px] transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={async () => {
                  try {
                    await downloadResumeFile('Charan_Madala_VLSI_Physical_Design_Resume.pdf');
                  } catch {
                    if (onOpenResume) onOpenResume();
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-mono font-semibold text-[#101B2D] bg-[#22D3EE] hover:bg-[#67E8F9] rounded-[4px] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Résumé</span>
              </button>
              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-mono text-[#D8E3FC] hover:text-[#22D3EE] bg-[#1E293B] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>View Interactive Résumé</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quiet Sub-footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
          <div>
            © {new Date().getFullYear()} Charan Madala. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#22D3EE] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
