import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  ExternalLink,
  Printer,
  Copy,
  Check,
  FileText,
  Eye,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  AlertCircle,
} from 'lucide-react';
import { downloadResumeFile } from '../utils/resumeDownload';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'digital'>('preview');
  const [copied, setCopied] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadStatus('Preparing PDF download...');
    try {
      const res = await downloadResumeFile('Charan_Madala_VLSI_Physical_Design_Resume.pdf');
      setDownloadStatus(res.message);
      setTimeout(() => setDownloadStatus(null), 4000);
    } catch {
      setDownloadStatus('Download initiated. If blocked by browser, view the digital resume below.');
      setTimeout(() => setDownloadStatus(null), 5000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyText = () => {
    const resumeText = `CHARAN MADALA
VLSI PHYSICAL DESIGN ENGINEER
Hyderabad, India | 8688236555 | madalacharan1818@gmail.com
LinkedIn: https://www.linkedin.com/in/charan-madala-b8072321b
GitHub: https://github.com/madalacharan1818

PROFESSIONAL SUMMARY
Electronics and Communication graduate building a career in VLSI Physical Design, with a strong foundation in CMOS, digital design, and Verilog HDL and hands-on RTL-to-GDS experience using Cadence Genus and Innovus. Practical exposure to synthesis, floorplanning, macro placement, power planning, placement, and clock tree synthesis, gained on a CVA6 RISC-V processor (approx. 100K instances, 24 macros), an AES cryptographic core, and multi-clock synthesis test cases. Skilled in Tcl scripting and Linux for flow automation and report analysis.

Career Goal: To grow as a Physical Design Engineer by contributing to block- and chip-level implementation, and to deepen my expertise in timing optimization and timing closure on advanced, high-performance designs, progressing toward sign-off and ownership of complete physical design flows.

TECHNICAL SKILLS
EDA Tools: Cadence Genus, Cadence Innovus | HDL: Verilog | Scripting / OS: Tcl, Linux
Physical Design: Synthesis, Floorplanning, Macro Placement, Power Planning, Placement, CTS
Fundamentals: CMOS, Digital Design, Combinational and Sequential Logic
Design Concepts: Clock Domains, Generated Clocks, Standard Cells, Timing Constraints

VLSI TRAINING
Physical Design Training | Sumedha IT (June 2026 – December 2026)
- RTL-to-GDS implementation using Cadence Genus and Innovus, covering floorplanning, macro placement, power planning, placement, and clock tree synthesis.
- Practicing Tcl scripting and Linux commands for design automation and implementation analysis.

VLSI PROJECTS
1. CVA6 RISC-V Processor | Physical Design | CTS In Progress
Tools: Cadence Genus, Cadence Innovus | Target: 1.5 ns clock period
- Implementing the CVA6 RISC-V processor through the RTL-to-GDS flow; completed synthesis and standard-cell placement, and currently progressing through clock tree synthesis.
- Handling a large design of approx. 100K instances and 24 macros, which requires careful macro placement and power planning.
- Applied timing constraints for a single clock domain with a 1.5 ns target clock period, and analyzed implementation results at each stage.
- Using Tcl scripts and Linux commands to automate tool runs and review implementation reports.

2. AES Core | Cryptographic Engine
Tools: Cadence Genus, Cadence Innovus | Target: 1 ns clock period
- Performed synthesis and placement of an AES-based cryptographic hardware block with approx. 10K standard cells and a single clock domain.
- Implemented the design against an aggressive 1 ns target clock period, applying timing constraints during synthesis.
- Gained practical exposure to the physical implementation of a cryptographic block and the effect of tight timing targets on the flow.

3. Multi-Clock Design | Synthesis Test Cases
Tools: Cadence Genus | Scope: 3 clock domains, approx. 1K standard cells
- Synthesized test designs containing three clock domains, including a generated clock.
- Practiced writing multiple clock definitions and generated-clock constraints and verifying them during synthesis.
- Built a clear understanding of how clock definitions in the constraints affect timing analysis across domains.

EDUCATION
- M.Sc. Computing and Technology, Northumbria University (Jan 2022 – Jan 2024), Result: 61/100
- B.Tech. Electronics and Communication Engineering, Sathyabama University, Chennai (Jun 2017 – May 2021), CGPA: 7.3/10

CERTIFICATIONS
- NPTEL – Data Structures and Computing with Python
- Coursera – Introduction to VLSI Flow

LANGUAGES
- English – Professional Working Proficiency
- Telugu – Native
- Hindi – Conversational`;

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#081325]/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col bg-[#1E293B] border border-[#334155] rounded-[4px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[#334155] bg-[#101B2D]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-[#22D3EE] uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#22D3EE]" />
              Charan_Madala_PD.pdf
            </span>
            <span className="hidden sm:inline text-xs text-[#94A3B8]">·</span>
            <span className="hidden sm:inline text-xs font-mono text-[#94A3B8]">
              Verified Physical Design Résumé (106 KB)
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="flex items-center bg-[#1E293B] border border-[#334155] rounded-[4px] p-0.5">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-2.5 py-1 text-xs font-mono rounded-[2px] transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-[#22D3EE] text-[#101B2D] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                PDF View
              </button>
              <button
                onClick={() => setActiveTab('digital')}
                className={`px-2.5 py-1 text-xs font-mono rounded-[2px] transition-colors ${
                  activeTab === 'digital'
                    ? 'bg-[#22D3EE] text-[#101B2D] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                Digital Text View
              </button>
            </div>

            {/* Direct Download Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-[#101B2D] bg-[#22D3EE] hover:bg-[#67E8F9] rounded-[4px] transition-all shadow-[0_0_12px_rgba(34,211,238,0.25)]"
              title="Download PDF to computer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>

            {/* Open Raw in New Tab */}
            <a
              href="/assets/charan_madala_PD_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#94A3B8] hover:text-[#22D3EE] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-colors"
              title="Open raw PDF in new browser tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Download Feedback Banner */}
        {downloadStatus && (
          <div className="bg-[#152032] border-b border-[#22D3EE]/40 px-4 py-2 flex items-center justify-between text-xs font-mono text-[#22D3EE]">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              <span>{downloadStatus}</span>
            </div>
            <span className="text-[11px] text-[#94A3B8]">
              Saved as: Charan_Madala_VLSI_Physical_Design_Resume.pdf
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto bg-[#081325] p-3 sm:p-6 min-h-0">
          {activeTab === 'preview' ? (
            <div className="h-full flex flex-col items-center">
              {/* Embedded PDF Viewer */}
              <div className="w-full max-w-4xl h-[70vh] bg-[#101B2D] border border-[#334155] rounded-[4px] overflow-hidden shadow-lg relative">
                <object
                  data="/assets/charan_madala_PD_resume.pdf"
                  type="application/pdf"
                  className="w-full h-full"
                >
                  {/* Fallback if browser PDF plugin is blocked or disabled in iframe */}
                  <div className="p-8 text-center flex flex-col items-center justify-center h-full space-y-4">
                    <FileText className="w-12 h-12 text-[#22D3EE]" />
                    <h3 className="text-lg font-semibold text-[#F8FAFC]">
                      Charan Madala — Official Résumé PDF
                    </h3>
                    <p className="text-sm text-[#94A3B8] max-w-md">
                      Your browser preview is sandboxed. You can download the PDF directly or switch to the interactive digital text view above.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={handleDownload}
                        className="px-4 py-2 text-xs font-mono font-semibold text-[#101B2D] bg-[#22D3EE] hover:bg-[#67E8F9] rounded-[4px]"
                      >
                        Download PDF File
                      </button>
                      <button
                        onClick={() => setActiveTab('digital')}
                        className="px-4 py-2 text-xs font-mono text-[#F8FAFC] border border-[#334155] hover:border-[#22D3EE] rounded-[4px]"
                      >
                        Switch to Digital View
                      </button>
                    </div>
                  </div>
                </object>
              </div>

              {/* Quick troubleshooting hint */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#94A3B8]">
                <span>Tip: Click &quot;Download PDF&quot; or &quot;Digital Text View&quot; if your browser blocks iframe embeds</span>
                <span>·</span>
                <button
                  onClick={handleCopyText}
                  className="text-[#22D3EE] hover:underline flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied Full Résumé' : 'Copy Full Résumé Text'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Digital High-Fidelity Document View (Exact match to the PDF content) */
            <div className="max-w-4xl mx-auto bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-[2px] font-serif leading-normal select-text">
              {/* Header */}
              <div className="text-center border-b pb-4 mb-6 border-slate-300">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-wide uppercase text-slate-950 font-sans">
                  Charan Madala
                </h1>
                <div className="text-sm font-semibold tracking-wider uppercase text-slate-700 mt-1 font-sans">
                  VLSI Physical Design Engineer
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-slate-600 mt-2 font-sans">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Hyderabad, India
                  </span>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" /> 8688236555
                  </span>
                  <span>|</span>
                  <a
                    href="mailto:madalacharan1818@gmail.com"
                    className="flex items-center gap-1 text-cyan-800 hover:underline"
                  >
                    <Mail className="w-3 h-3" /> madalacharan1818@gmail.com
                  </a>
                  <span>|</span>
                  <a
                    href="https://www.linkedin.com/in/charan-madala-b8072321b"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-800 hover:underline"
                  >
                    LinkedIn
                  </a>
                  <span>|</span>
                  <a
                    href="https://github.com/madalacharan1818"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-800 hover:underline"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-sans">
                  Professional Summary
                </h2>
                <p className="text-xs text-slate-800 leading-relaxed text-justify">
                  Electronics and Communication graduate building a career in VLSI Physical Design, with a strong foundation in CMOS, digital design, and Verilog HDL and hands-on RTL-to-GDS experience using Cadence Genus and Innovus. Practical exposure to synthesis, floorplanning, macro placement, power planning, placement, and clock tree synthesis, gained on a CVA6 RISC-V processor (approx. 100K instances, 24 macros), an AES cryptographic core, and multi-clock synthesis test cases. Skilled in Tcl scripting and Linux for flow automation and report analysis.
                </p>
                <p className="text-xs text-slate-800 leading-relaxed mt-2 text-justify">
                  <strong>Career Goal:</strong> To grow as a Physical Design Engineer by contributing to block- and chip-level implementation, and to deepen my expertise in timing optimization and timing closure on advanced, high-performance designs, progressing toward sign-off and ownership of complete physical design flows.
                </p>
              </div>

              {/* Technical Skills */}
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-sans">
                  Technical Skills
                </h2>
                <div className="text-xs text-slate-800 space-y-1">
                  <div>
                    <strong>EDA Tools:</strong> Cadence Genus, Cadence Innovus &nbsp;|&nbsp; <strong>HDL:</strong> Verilog &nbsp;|&nbsp; <strong>Scripting / OS:</strong> Tcl, Linux
                  </div>
                  <div>
                    <strong>Physical Design:</strong> Synthesis, Floorplanning, Macro Placement, Power Planning, Placement, CTS
                  </div>
                  <div>
                    <strong>Fundamentals:</strong> CMOS, Digital Design, Combinational and Sequential Logic
                  </div>
                  <div>
                    <strong>Design Concepts:</strong> Clock Domains, Generated Clocks, Standard Cells, Timing Constraints
                  </div>
                </div>
              </div>

              {/* VLSI Training */}
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-sans">
                  VLSI Training
                </h2>
                <div className="flex justify-between items-baseline text-xs font-bold text-slate-900 font-sans">
                  <span>Physical Design Training | Sumedha IT</span>
                  <span>June 2026 – December 2026</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-xs text-slate-800 space-y-1 mt-1">
                  <li>
                    RTL-to-GDS implementation using Cadence Genus and Innovus, covering floorplanning, macro placement, power planning, placement, and clock tree synthesis.
                  </li>
                  <li>
                    Practicing Tcl scripting and Linux commands for design automation and implementation analysis.
                  </li>
                </ul>
              </div>

              {/* VLSI Projects */}
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-sans">
                  VLSI Projects
                </h2>

                {/* Project 1 */}
                <div className="mb-4">
                  <div className="flex justify-between items-baseline text-xs font-bold text-slate-900 font-sans">
                    <span>CVA6 RISC-V Processor | Physical Design</span>
                    <span className="italic text-slate-700">CTS In Progress</span>
                  </div>
                  <div className="text-xs italic text-slate-700 mb-1">
                    Tools: Cadence Genus, Cadence Innovus &nbsp;|&nbsp; Target: 1.5 ns clock period
                  </div>
                  <ul className="list-disc list-outside ml-4 text-xs text-slate-800 space-y-1">
                    <li>
                      Implementing the CVA6 RISC-V processor through the RTL-to-GDS flow; completed synthesis and standard-cell placement, and currently progressing through clock tree synthesis.
                    </li>
                    <li>
                      Handling a large design of approx. 100K instances and 24 macros, which requires careful macro placement and power planning.
                    </li>
                    <li>
                      Applied timing constraints for a single clock domain with a 1.5 ns target clock period, and analyzed implementation results at each stage.
                    </li>
                    <li>
                      Using Tcl scripts and Linux commands to automate tool runs and review implementation reports.
                    </li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div className="mb-4">
                  <div className="flex justify-between items-baseline text-xs font-bold text-slate-900 font-sans">
                    <span>AES Core | Cryptographic Engine</span>
                  </div>
                  <div className="text-xs italic text-slate-700 mb-1">
                    Tools: Cadence Genus, Cadence Innovus &nbsp;|&nbsp; Target: 1 ns clock period
                  </div>
                  <ul className="list-disc list-outside ml-4 text-xs text-slate-800 space-y-1">
                    <li>
                      Performed synthesis and placement of an AES-based cryptographic hardware block with approx. 10K standard cells and a single clock domain.
                    </li>
                    <li>
                      Implemented the design against an aggressive 1 ns target clock period, applying timing constraints during synthesis.
                    </li>
                    <li>
                      Gained practical exposure to the physical implementation of a cryptographic block and the effect of tight timing targets on the flow.
                    </li>
                  </ul>
                </div>

                {/* Project 3 */}
                <div className="mb-4">
                  <div className="flex justify-between items-baseline text-xs font-bold text-slate-900 font-sans">
                    <span>Multi-Clock Design | Synthesis Test Cases</span>
                  </div>
                  <div className="text-xs italic text-slate-700 mb-1">
                    Tools: Cadence Genus &nbsp;|&nbsp; Scope: 3 clock domains, approx. 1K standard cells
                  </div>
                  <ul className="list-disc list-outside ml-4 text-xs text-slate-800 space-y-1">
                    <li>
                      Synthesized test designs containing three clock domains, including a generated clock.
                    </li>
                    <li>
                      Practiced writing multiple clock definitions and generated-clock constraints and verifying them during synthesis.
                    </li>
                    <li>
                      Built a clear understanding of how clock definitions in the constraints affect timing analysis across domains.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-sans">
                  Education
                </h2>
                <div className="space-y-2 text-xs text-slate-800">
                  <div className="flex justify-between items-baseline font-sans">
                    <div>
                      <strong>M.Sc. Computing and Technology</strong>
                      <div className="text-slate-600">Northumbria University</div>
                    </div>
                    <div className="text-right">
                      <span>Jan 2022 – Jan 2024</span>
                      <div className="font-semibold text-slate-900">Result: 61/100</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline font-sans pt-1">
                    <div>
                      <strong>B.Tech. Electronics and Communication Engineering</strong>
                      <div className="text-slate-600">Sathyabama University, Chennai</div>
                    </div>
                    <div className="text-right">
                      <span>Jun 2017 – May 2021</span>
                      <div className="font-semibold text-slate-900">CGPA: 7.3/10</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-sans">
                  Certifications
                </h2>
                <ul className="list-disc list-outside ml-4 text-xs text-slate-800 space-y-0.5">
                  <li>NPTEL – Data Structures and Computing with Python</li>
                  <li>Coursera – Introduction to VLSI Flow</li>
                </ul>
              </div>

              {/* Languages */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-sans">
                  Languages
                </h2>
                <div className="text-xs text-slate-800">
                  English – Professional Working Proficiency &nbsp;|&nbsp; Telugu – Native &nbsp;|&nbsp; Hindi – Conversational
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t border-[#334155] bg-[#101B2D] text-xs font-mono text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyText}
              className="hover:text-[#22D3EE] flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#22D3EE]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
            </button>
            <span>·</span>
            <button
              onClick={handlePrint}
              className="hover:text-[#22D3EE] flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Résumé</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 text-xs font-medium text-[#101B2D] bg-[#22D3EE] hover:bg-[#67E8F9] rounded-[4px] transition-colors flex items-center gap-1.5 font-mono"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
