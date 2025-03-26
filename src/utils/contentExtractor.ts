const fs = require('fs');
const path = require('path');

interface PageContent {
  id: string;
  text: string;
  section: string;
}

function cleanContent(content: string): string {
  return content
    .replace(/import.*?;/g, '')
    .replace(/export.*?{/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function extractPortfolioContent(): Promise<PageContent[]> {
  const contents: PageContent[] = [];
  const pagesDir = path.join(process.cwd(), 'src/app');

  try {
    // Read about section
    if (fs.existsSync(path.join(pagesDir, 'about/page.tsx'))) {
      const aboutContent = fs.readFileSync(
        path.join(pagesDir, 'about/page.tsx'),
        'utf-8'
      );
      contents.push({
        id: 'about',
        text: cleanContent(aboutContent),
        section: 'About'
      });
    }

    // Read projects section
    if (fs.existsSync(path.join(pagesDir, 'projects/page.tsx'))) {
      const projectsContent = fs.readFileSync(
        path.join(pagesDir, 'projects/page.tsx'),
        'utf-8'
      );
      contents.push({
        id: 'projects',
        text: cleanContent(projectsContent),
        section: 'Projects'
      });
    }

    return contents;
  } catch (error) {
    console.error('Error extracting content:', error);
    return [];
  }
}

module.exports = {
  extractPortfolioContent
};