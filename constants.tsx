
import React from 'react';
import { Cpu, BarChart3, Globe, Rocket, Zap } from 'lucide-react';
import { Service, CaseStudy } from './types';

export const SERVICES: Service[] = [
  {
    id: 'ai-personalization',
    title: { en: 'Neural Personalization', ar: 'التخصيص العصبي' },
    description: { 
      en: 'Dominate Doha\'s luxury market with hyper-individualized customer journeys.', 
      ar: 'هيمن على سوق الرفاهية في الدوحة من خلال رحلات عملاء مخصصة للغاية.' 
    },
    icon: 'Cpu'
  },
  {
    id: 'predictive-analytics',
    title: { en: 'Market Foresight', ar: 'التنبؤ بالسوق' },
    description: { 
      en: 'Our predictive engines forecast consumer volatility across Qatar\'s sectors.', 
      ar: 'محركاتنا التنبؤية تتوقع تقلبات المستهلكين عبر قطاعات قطر.' 
    },
    icon: 'BarChart3'
  },
  {
    id: 'content-automation',
    title: { en: 'Creative AI Studio', ar: 'استوديو الذكاء الاصطناعي الإبداعي' },
    description: { 
      en: 'Culturally resonant content in Khaleeji Arabic and English.', 
      ar: 'محتوى رنين ثقافيًا باللغتين العربية الخليجية والإنجليزية.' 
    },
    icon: 'Zap'
  },
  {
    id: 'omnichannel-growth',
    title: { en: 'Unified Digital Command', ar: 'القيادة الرقمية الموحدة' },
    description: { 
      en: 'Synchronize WhatsApp and Instagram for Qatar\'s mobile-first economy.', 
      ar: 'زامن واتساب وإنستغرام من أجل اقتصاد قطر الذي يعتمد على الهاتف المحمول.' 
    },
    icon: 'Globe'
  }
];

export const SERVICE_DETAILS = {
  'ai-personalization': {
    tools: ['TensorFlow', 'Neural Behavioral Models', 'DCO Engines'],
    roi: { en: 'Average 45% uplift in LTV.', ar: 'متوسط زيادة 45% في القيمة الدائمة للعميل.' },
    features: {
      en: ['Behavioral Cohort Synthesis', 'Real-time Offer Mapping', '1:1 Journey Orchestration'],
      ar: ['توليف المجموعات السلوكية', 'رسم خرائط العروض في الوقت الفعلي', 'تنظيم رحلة 1:1']
    }
  },
  'predictive-analytics': {
    tools: ['BigQuery ML', 'Sentiment Scrapers', 'Time-Series Forecasting'],
    roi: { en: 'Reduce 30% of marketing waste.', ar: 'تقليل 30% من هدر التسويق.' },
    features: {
      en: ['Demand Heatmaps', 'Churn Risk Detection', 'Sentiment Analysis'],
      ar: ['خرائط الطلب الحرارية', 'كشف مخاطر التوقف', 'تحليل المشاعر']
    }
  },
  'content-automation': {
    tools: ['Khaleeji LLMs', 'Localized Diffusion', 'A/B Visual Logic'],
    roi: { en: '10x faster asset production.', ar: 'إنتاج أصول أسرع بـ 10 مرات.' },
    features: {
      en: ['Dialect-Aware Copywriting', 'Culturally Sensitive Vision', 'Dynamic Localization'],
      ar: ['كتابة نصوص تراعي اللهجة', 'رؤية تراعي الثقافة', 'تعريب ديناميكي']
    }
  },
  'omnichannel-growth': {
    tools: ['WhatsApp API', 'Identity Resolution', 'Hyper-Local SEO'],
    roi: { en: '3.2x higher attribution accuracy.', ar: 'دقة إسناد أعلى بـ 3.2 مرة.' },
    features: {
      en: ['Automated Lead Qualification', 'Cross-Network Retargeting', 'Doha Search Dominance'],
      ar: ['تأهيل العملاء المحتملين آلياً', 'إعادة الاستهداف عبر الشبكات', 'هيمنة البحث في الدوحة']
    }
  }
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'doha-lux-real-estate',
    client: 'Pearl Residences',
    title: { en: 'Scaling Luxury Real Estate with Predictive Lead Gen', ar: 'توسيع العقارات الفاخرة مع توليد العملاء التنبؤي' },
    category: { en: 'Real Estate / AI Lead Gen', ar: 'عقارات / توليد عملاء بالذكاء الاصطناعي' },
    description: { 
      en: 'We identified high-net-worth investors looking for properties in Lusail.', 
      ar: 'حددنا المستثمرين ذوي الملاءة المالية العالية الذين يبحثون عن عقارات في لوسيل.' 
    },
    results: {
      en: ['340% Increase in leads', '45% Reduction in CPL', '$12M closed sales'],
      ar: ['340% زيادة في العملاء', '45% انخفاض في تكلفة العميل', '12 مليون دولار مبيعات مغلقة']
    },
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1200',
    tags: ['Predictive AI', 'Meta Ads', 'Qatar Market']
  },
  {
    id: 'qatar-tech-expo',
    client: 'Q-Tech Expo 2024',
    title: { en: 'Automating Visitor Engagement', ar: 'أتمتة مشاركة الزوار' },
    category: { en: 'Event Tech / Marketing Automation', ar: 'تكنولوجيا الفعاليات / أتمتة التسويق' },
    description: { 
      en: 'A multi-language AI concierge system handling 50,000+ inquiries.', 
      ar: 'نظام كونسيرج ذكاء اصطناعي متعدد اللغات يتعامل مع أكثر من 50,000 استفسار.' 
    },
    results: {
      en: ['98% Response accuracy', '15k CRM entries', 'Zero manual tickets'],
      ar: ['98% دقة الاستجابة', '15 ألف مدخل CRM', 'صفر تذاكر يدوية']
    },
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    tags: ['NLP', 'WhatsApp AI', 'Event Marketing']
  }
];
