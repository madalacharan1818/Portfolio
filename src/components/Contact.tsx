import React, { useState } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  Download,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { downloadResumeFile } from '../utils/resumeDownload';

interface ContactProps {
  onOpenResume?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Contact Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Physical Design Engineer Role',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('madalacharan1818@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('8688236555');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate mailto link
    const subject = encodeURIComponent(`[${formState.role}] Outreach from ${formState.name} (${formState.company || 'Direct'})`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nCompany: ${formState.company}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:madalacharan1818@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#081325] border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] uppercase tracking-wider mb-2">
            <span>07. Inquiries &amp; Opportunities</span>
            <span className="text-[#334155]">/</span>
            <span className="text-[#94A3B8]">Direct Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Connect for Physical Design Opportunities.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#94A3B8]">
            Actively seeking full-time roles and opportunities in VLSI Physical Design, block/chip implementation, and STA timing closure in India and globally.
          </p>
        </div>

        {/* 2-Column Split: Direct Contact Cards vs. Message Dispatch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Channels */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="p-5 bg-[#1E293B] border border-[#334155] rounded-[4px] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                <span className="flex items-center gap-1.5 text-[#22D3EE]">
                  <Mail className="w-3.5 h-3.5" />
                  Primary Email
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#22D3EE]" />
                      <span className="text-[#22D3EE]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href="mailto:madalacharan1818@gmail.com"
                className="block text-base sm:text-lg font-mono font-semibold text-[#F8FAFC] hover:text-[#22D3EE] transition-colors break-all"
              >
                madalacharan1818@gmail.com
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="p-5 bg-[#1E293B] border border-[#334155] rounded-[4px] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                <span className="flex items-center gap-1.5 text-[#22D3EE]">
                  <Linkedin className="w-3.5 h-3.5" />
                  Professional Network
                </span>
                <span className="text-xs text-[#94A3B8]">LinkedIn</span>
              </div>
              <a
                href="https://www.linkedin.com/in/charan-madala-b8072321b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-base font-semibold text-[#F8FAFC] hover:text-[#22D3EE] transition-colors"
              >
                <span>linkedin.com/in/charan-madala</span>
                <ExternalLink className="w-4 h-4 text-[#22D3EE]" />
              </a>
            </div>

            {/* GitHub Card */}
            <div className="p-5 bg-[#1E293B] border border-[#334155] rounded-[4px] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                <span className="flex items-center gap-1.5 text-[#22D3EE]">
                  <Github className="w-3.5 h-3.5" />
                  Code &amp; Script Repositories
                </span>
                <span className="text-xs text-[#94A3B8]">GitHub</span>
              </div>
              <a
                href="https://github.com/madalacharan1818"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-base font-semibold text-[#F8FAFC] hover:text-[#22D3EE] transition-colors"
              >
                <span>github.com/madalacharan1818</span>
                <ExternalLink className="w-4 h-4 text-[#22D3EE]" />
              </a>
            </div>

            {/* Phone & Location Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-1">
                  <span className="flex items-center gap-1 text-[#22D3EE]">
                    <Phone className="w-3 h-3" />
                    Phone
                  </span>
                  <button
                    onClick={handleCopyPhone}
                    className="hover:text-[#22D3EE]"
                    title="Copy phone number"
                  >
                    {copiedPhone ? <Check className="w-3 h-3 text-[#22D3EE]" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <a
                  href="tel:8688236555"
                  className="font-mono text-sm font-semibold text-[#F8FAFC] hover:text-[#22D3EE]"
                >
                  +91 8688236555
                </a>
              </div>

              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
                <div className="text-xs font-mono text-[#22D3EE] mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Location
                </div>
                <div className="font-mono text-sm font-semibold text-[#F8FAFC]">
                  Hyderabad, India
                </div>
              </div>
            </div>

            {/* Résumé Quick Download */}
            <div className="p-4 bg-[#101B2D] border border-[#22D3EE]/40 rounded-[4px] flex items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-semibold text-[#F8FAFC] block">
                  Charan_Madala_PD.pdf
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  Verified PDF Résumé (106 KB)
                </span>
              </div>
              <div className="flex items-center gap-2">
                {onOpenResume && (
                  <button
                    onClick={onOpenResume}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-[#D8E3FC] hover:text-[#22D3EE] bg-[#1E293B] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-colors cursor-pointer"
                    title="Preview in interactive viewer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#22D3EE]" />
                    <span>View</span>
                  </button>
                )}
                <button
                  onClick={async () => {
                    try {
                      await downloadResumeFile('Charan_Madala_VLSI_Physical_Design_Resume.pdf');
                    } catch {
                      if (onOpenResume) onOpenResume();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-[#101B2D] bg-[#22D3EE] hover:bg-[#67E8F9] rounded-[4px] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Technical Inquiry / Recruiter Message Form */}
          <div className="lg:col-span-7 bg-[#1E293B] border border-[#334155] rounded-[4px] p-6 lg:p-8">
            <h3 className="text-xl font-bold text-[#F8FAFC] mb-2 font-display">
              Send a Direct Message
            </h3>
            <p className="text-xs font-mono text-[#94A3B8] mb-6">
              Recruiters, engineering leads, and silicon teams can initiate contact directly.
            </p>

            {submitted ? (
              <div className="p-6 bg-[#101B2D] border border-[#22D3EE] rounded-[4px] text-center space-y-3">
                <Check className="w-8 h-8 text-[#22D3EE] mx-auto" />
                <h4 className="text-base font-semibold text-[#F8FAFC]">
                  Mail Client Triggered
                </h4>
                <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
                  Your mail client has been opened with your inquiry pre-formatted for Charan Madala (madalacharan1818@gmail.com).
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-4 py-1.5 text-xs font-mono text-[#22D3EE] border border-[#22D3EE] rounded-[4px] hover:bg-[#22D3EE]/10"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 bg-[#101B2D] border border-[#334155] focus:border-[#22D3EE] text-sm text-[#F8FAFC] rounded-[4px] outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. j.doe@semiconductor.com"
                      className="w-full px-3.5 py-2.5 bg-[#101B2D] border border-[#334155] focus:border-[#22D3EE] text-sm text-[#F8FAFC] rounded-[4px] outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      placeholder="e.g. Fabless Semiconductor Corp"
                      className="w-full px-3.5 py-2.5 bg-[#101B2D] border border-[#334155] focus:border-[#22D3EE] text-sm text-[#F8FAFC] rounded-[4px] outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={formState.role}
                      onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#101B2D] border border-[#334155] focus:border-[#22D3EE] text-sm text-[#F8FAFC] rounded-[4px] outline-none font-mono"
                    >
                      <option value="Physical Design Engineer Role">Full-time PD Engineer Role</option>
                      <option value="Block Implementation Consultation">Block Implementation Discussion</option>
                      <option value="Timing Closure & STA Collaboration">Timing Closure / STA Opportunity</option>
                      <option value="General Professional Inquiry">General Technical Discussion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Details about the role, project requirements, or discussion topics..."
                    className="w-full px-3.5 py-2.5 bg-[#101B2D] border border-[#334155] focus:border-[#22D3EE] text-sm text-[#F8FAFC] rounded-[4px] outline-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-[#101B2D] bg-[#22D3EE] hover:bg-[#67E8F9] rounded-[4px] transition-all font-mono"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch Technical Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
