import { AboutHero } from '../../components/about/AboutHero';
import { Education } from '../../components/about/Education';
import { TechnicalExpertise } from '../../components/about/TechnicalExpertise';
import { CurrentFocus } from '../../components/about/CurrentFocus';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 space-y-12 animate-fade-in">
      <AboutHero />
      <Education />
      <TechnicalExpertise />
      <CurrentFocus />
    </div>
  );
} 