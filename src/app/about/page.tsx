import { AboutHero } from '../../components/about/AboutHero';
import { Education } from '../../components/about/Education';
import { TechnicalExpertise } from '../../components/about/TechnicalExpertise';
import { CurrentFocus } from '../../components/about/CurrentFocus';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 space-y-12 animate-fade-in">
      <div className="flex justify-center mb-4">
        <img src="/icons/chatbot.gif" alt="Chatbot" className="w-16 h-16" />
      </div>
      <AboutHero />
      <Education />
      <TechnicalExpertise />
      <CurrentFocus />
    </div>
  );
} 