import React, { useState } from 'react';
import { Download, Menu, X, FileText, Eye } from 'lucide-react';
import { downloadResumeFile } from '../utils/resumeDownload';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);
    try {
      await downloadResumeFile('Charan_Madala_VLSI_Physical_Design_Resume.pdf');
    } catch {
      onOpenResume();
    } finally {
      setIsDownloading(false);
    }
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Analysis', href: '#analysis' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#101B2D]/90 backdrop-blur-md border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in Space Grotesk) */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-[#F8FAFC] hover:text-[#22D3EE] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-[1px] bg-[#22D3EE]" />
          <span>Charan Madala</span>
        </a>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#94A3B8]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#F8FAFC] transition-colors whitespace-nowrap shrink-0 py-1 hover:border-b hover:border-[#22D3EE]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Résumé Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Preview Button */}
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-[#D8E3FC] hover:text-[#22D3EE] bg-[#1E293B] hover:bg-[#1E293B]/80 border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-all whitespace-nowrap"
            title="Preview official résumé in interactive viewer"
          >
            <Eye className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>View Résumé</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownloadClick}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium font-mono text-[#101B2D] bg-[#22D3EE] hover:bg-[#67E8F9] rounded-[4px] transition-all shadow-[0_0_12px_rgba(34,211,238,0.2)] whitespace-nowrap shrink-0 cursor-pointer"
            title="Download Charan Madala's VLSI Physical Design Resume (PDF)"
          >
            <Download className="w-3.5 h-3.5 text-[#101B2D]" />
            <span>{isDownloading ? 'Downloading...' : 'Download Résumé'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#94A3B8] hover:text-[#F8FAFC] border border-[#334155] rounded-[4px]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101B2D] border-b border-[#334155] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#22D3EE] hover:bg-[#1E293B] rounded-[4px] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#334155] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-mono text-[#D8E3FC] bg-[#1E293B] border border-[#334155] rounded-[4px]"
            >
              <FileText className="w-4 h-4 text-[#22D3EE]" />
              <span>Interactive Résumé Viewer</span>
            </button>
            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleDownloadClick(e);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-mono font-semibold text-[#101B2D] bg-[#22D3EE] rounded-[4px]"
            >
              <Download className="w-4 h-4 text-[#101B2D]" />
              <span>Download PDF File</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
