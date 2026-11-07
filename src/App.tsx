import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { TechnicalAnalysis } from './components/TechnicalAnalysis';
import { ProjectGallery } from './components/ProjectGallery';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { galleryItems } from './data/gallery';
import { GalleryItem, ProjectData } from './types/portfolio';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Helper to open an image in lightbox either by matching existing gallery item or dynamic fallback
  const handleOpenImage = (imagePath: string, title: string) => {
    const existing = galleryItems.find((item) => item.imagePath === imagePath);
    if (existing) {
      setLightboxItem(existing);
    } else {
      setLightboxItem({
        id: 'dynamic-view',
        title: title || 'Cadence Innovus Artifact',
        category: 'CVA6 Floorplan',
        imagePath,
        tool: 'Cadence Innovus',
        stage: 'Intermediate Physical Verification',
        description: 'Detailed view of implementation capture from Cadence Innovus physical design environment.',
        aspectRatio: '1:1',
        technicalNotes: ['Original high-resolution Cadence Innovus capture'],
      });
    }
  };

  const handleLightboxNavigate = (direction: 'prev' | 'next') => {
    if (!lightboxItem) return;
    const currentIndex = galleryItems.findIndex((item) => item.id === lightboxItem.id);
    if (currentIndex === -1) return;

    if (direction === 'prev') {
      const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      setLightboxItem(galleryItems[prevIndex]);
    } else {
      const nextIndex = (currentIndex + 1) % galleryItems.length;
      setLightboxItem(galleryItems[nextIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-[#081325] text-[#D8E3FC] flex flex-col font-sans selection:bg-[#22D3EE]/20 selection:text-[#22D3EE]">
      {/* Navigation Bar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Home / Hero Section */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenImage={handleOpenImage}
        />

        {/* 2. About Me Section */}
        <About />

        {/* 3. Technical Skills Section */}
        <Skills />

        {/* 4. Featured Projects Section */}
        <Projects
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenImage={handleOpenImage}
        />

        {/* 5. Physical Design Analysis Dashboard */}
        <TechnicalAnalysis onOpenImage={handleOpenImage} />

        {/* 6. Implementation Gallery */}
        <ProjectGallery onOpenLightbox={(item) => setLightboxItem(item)} />

        {/* 7. Education & Training */}
        <Education onOpenResume={() => setIsResumeOpen(true)} />

        {/* 8. Contact Section */}
        <Contact onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Interactive Lightbox Modal for Screenshots */}
      <LightboxModal
        item={lightboxItem}
        allItems={galleryItems}
        onClose={() => setLightboxItem(null)}
        onNavigate={handleLightboxNavigate}
      />

      {/* Detailed Project Overview Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenImage={handleOpenImage}
      />

      {/* Dedicated Interactive Résumé Viewer & Downloader Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
