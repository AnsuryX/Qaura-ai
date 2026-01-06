
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
      en: [
        { name: 'Behavioral Cohort Synthesis', explanation: 'Using high-dimensional neural clusters to group customers by intent rather than just age or location.' },
        { name: 'Real-time Offer Mapping', explanation: 'Dynamic pricing and promotion logic that adapts instantly based on current session browsing velocity.' },
        { name: '1:1 Journey Orchestration', explanation: 'A seamless bridge across web, mobile, and physical touchpoints, ensuring the brand remembers every preference.' }
      ],
      ar: [
        { name: 'توليف المجموعات السلوكية', explanation: 'استخدام المجموعات العصبية عالية الأبعاد لتجميع العملاء حسب النية بدلاً من مجرد العمر أو الموقع.' },
        { name: 'رسم خرائط العروض في الوقت الفعلي', explanation: 'منطق التسعير والترويج الديناميكي الذي يتكيف فوراً بناءً على سرعة تصفح الجلسة الحالية.' },
        { name: 'تنظيم رحلة 1:1', explanation: 'جسر سلس عبر نقاط اتصال الويب والهاتف والمادية، مما يضمن تذكر العلامة التجارية لكل تفضيل.' }
      ]
    }
  },
  'predictive-analytics': {
    tools: ['BigQuery ML', 'Sentiment Scrapers', 'Time-Series Forecasting'],
    roi: { en: 'Reduce 30% of marketing waste.', ar: 'تقليل 30% من هدر التسويق.' },
    features: {
      en: [
        { name: 'Demand Heatmaps', explanation: 'Predictive geographic mapping of where your next luxury property or retail sale is most likely to occur in Qatar.' },
        { name: 'Churn Risk Detection', explanation: 'Early-warning systems that identify declining engagement patterns before the customer actually leaves.' },
        { name: 'Sentiment Analysis', explanation: 'Localized NLP that parses social conversations in Qatari dialects to gauge real-time market sentiment.' }
      ],
      ar: [
        { name: 'خرائط الطلب الحرارية', explanation: 'رسم خرائط جغرافية تنبؤية لمكان احتمال حدوث عملية بيع العقارات الفاخرة أو التجزئة التالية في قطر.' },
        { name: 'كشف مخاطر التوقف', explanation: 'أنظمة إنذار مبكر تحدد أنماط المشاركة المتناقصة قبل أن يغادر العميل فعلياً.' },
        { name: 'تحليل المشاعر', explanation: 'معالجة لغات طبيعية محلية تحلل المحادثات الاجتماعية باللهجات القطرية لقياس معنويات السوق في الوقت الفعلي.' }
      ]
    }
  },
  'content-automation': {
    tools: ['Khaleeji LLMs', 'Localized Diffusion', 'A/B Visual Logic'],
    roi: { en: '10x faster asset production.', ar: 'إنتاج أصول أسرع بـ 10 مرات.' },
    features: {
      en: [
        { name: 'Dialect-Aware Copywriting', explanation: 'LLMs fine-tuned specifically on Qatari linguistic nuances to ensure authentic, non-generic Arabic copy.' },
        { name: 'Culturally Sensitive Vision', explanation: 'Image generators constrained by Middle Eastern aesthetic values, respecting local architectural and clothing styles.' },
        { name: 'Dynamic Localization', explanation: 'Automated adaptation of global campaign assets into high-converting local variations at scale.' }
      ],
      ar: [
        { name: 'كتابة نصوص تراعي اللهجة', explanation: 'نماذج لغوية ضخمة مضبوطة بدقة على الفوارق اللغوية القطرية لضمان نصوص عربية أصيلة وغير عامة.' },
        { name: 'رؤية تراعي الثقافة', explanation: 'مولدات صور مقيدة بالقيم الجمالية الشرق أوسطية، مع احترام الأنماط المعمارية والملابس المحلية.' },
        { name: 'تعريب ديناميكي', explanation: 'تكييف آلي لأصول الحملات العالمية إلى أشكال محلية عالية التحويل على نطاق واسع.' }
      ]
    }
  },
  'omnichannel-growth': {
    tools: ['WhatsApp API', 'Identity Resolution', 'Hyper-Local SEO'],
    roi: { en: '3.2x higher attribution accuracy.', ar: 'دقة إسناد أعلى بـ 3.2 مرة.' },
    features: {
      en: [
        { name: 'Automated Lead Qualification', explanation: 'Intelligent WhatsApp bots that score and route leads based on potential lifetime value (LTV).' },
        { name: 'Cross-Network Retargeting', explanation: 'Predictive retargeting that follows users across Instagram, Snapchat, and local news portals intelligently.' },
        { name: 'Doha Search Dominance', explanation: 'Hyper-local SEO strategies optimized for Qatar-specific search queries in both English and Arabic.' }
      ],
      ar: [
        { name: 'تأهيل العملاء المحتملين آلياً', explanation: 'بوتات واتساب ذكية تسجل وتوجه العملاء المحتملين بناءً على القيمة الدائمة المحتملة (LTV).' },
        { name: 'إعادة الاستهداف عبر الشبكات', explanation: 'إعادة استهداف تنبؤية تتبع المستخدمين عبر إنستغرام وسناب شات وبوابات الأخبار المحلية بذكاء.' },
        { name: 'هيمنة البحث في الدوحة', explanation: 'استراتيجيات تحسين محركات بحث محلية للغاية محسنة لاستعلامات البحث الخاصة بقطر باللغتين الإنجليزية والعربية.' }
      ]
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
