
export interface Service {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  title: { en: string; ar: string };
  category: { en: string; ar: string };
  description: { en: string; ar: string };
  results: { en: string[]; ar: string[] };
  image: string;
  tags: string[];
}

export type Page = 'home' | 'portfolio' | 'services' | 'contact';
export type Language = 'en' | 'ar';
