/**
 * Reliable resume download utility handling browser & iframe sandbox restrictions.
 */
export async function downloadResumeFile(
  filename = 'Charan_Madala_VLSI_Physical_Design_Resume.pdf'
): Promise<{ success: boolean; message: string }> {
  const filePaths = [
    '/assets/charan_madala_PD_resume.pdf',
    '/resume.pdf',
    '/charan_madala_PD_resume.pdf',
  ];

  for (const path of filePaths) {
    try {
      const response = await fetch(path, { cache: 'no-cache' });
      if (response.ok) {
        const blob = await response.blob();
        // Create blob object URL
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        link.setAttribute('style', 'display: none;');
        document.body.appendChild(link);
        link.click();
        
        // Cleanup after delay
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        }, 1500);

        return {
          success: true,
          message: 'Download initiated successfully!',
        };
      }
    } catch {
      // Continue to next path or fallback
    }
  }

  // Fallback for sandboxed iframes: create direct anchor
  try {
    const fallbackLink = document.createElement('a');
    fallbackLink.href = '/assets/charan_madala_PD_resume.pdf';
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    fallbackLink.download = filename;
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    document.body.removeChild(fallbackLink);
    return {
      success: true,
      message: 'Opening PDF in new window...',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Browser restricted download. Opening in-app interactive résumé viewer.',
    };
  }
}
