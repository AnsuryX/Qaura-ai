
import React from 'react';
import { Layout, BrainCircuit, MessageSquareQuote, RefreshCcw, LayoutTemplate, Bot, Zap, LineChart } from 'lucide-react';
import { Service, CaseStudy } from './types';

export const SERVICES: Service[] = [
  {
    id: 'conversion-pages',
    title: { en: 'Conversion Architecture', ar: 'هندسة التحويل' },
    description: { 
      en: 'Elite landing pages engineered for the Qatari market, optimized for lightning-fast speeds and maximum lead capture.', 
      ar: 'صفحات هبوط نخبوية مصممة للسوق القطري، محسنة لسرعات فائقة وأقصى قدر من جذب العملاء.' 
    },
    icon: 'LayoutTemplate'
  },
  {
    id: 'ai-qualification',
    title: { en: 'Autonomous Qualification', ar: 'التأهيل الذاتي' },
    description: { 
      en: 'AI-driven screening that filters out looky-loos and identifies high-intent buyers before you ever speak to them.', 
      ar: 'فحص مدعوم بالذكاء الاصطناعي يصفي الفضوليين ويحدد المشترين ذوي النية العالية قبل أن تتحدث إليهم.' 
    },
    icon: 'BrainCircuit'
  },
  {
    id: 'follow-up-engine',
    title: { en: '24/7 Follow-up Protocol', ar: 'بروتوكول المتابعة 24/7' },
    description: { 
      en: 'Never lose a lead to silence. Our bots follow up via WhatsApp, SMS, and Email within seconds of contact.', 
      ar: 'لا تفقد عميلاً بسبب الصمت أبداً. تقوم بوتاتنا بالمتابعة عبر واتساب ورسائل SMS والبريد الإلكتروني في غضون ثوانٍ.' 
    },
    icon: 'Zap'
  },
  {
    id: 'growth-sync',
    title: { en: 'Growth Synchronization', ar: 'مزامنة النمو' },
    description: { 
      en: 'Seamless CRM integration that maps every automated touchpoint to your bottom line revenue.', 
      ar: 'تكامل CRM سلس يربط كل نقطة اتصال مؤتمتة بصافي إيراداتك.' 
    },
    icon: 'LineChart'
  }
];

export const SERVICE_DETAILS = {
  'conversion-pages': {
    tools: ['Next.js', 'Vercel Edge', 'A/B Testing'],
    roi: { en: 'Average 3.5x increase in conversion rate.', ar: 'متوسط زيادة 3.5 ضعف في معدل التحويل.' },
    features: {
      en: [
        { name: 'Khaleeji-First Design', explanation: 'Visual layouts and typography specifically tested for Arabic reading patterns and luxury Qatari tastes.' },
        { name: 'Edge Performance', explanation: 'Sub-second load times across Doha to prevent drop-offs on mobile 5G networks.' },
        { name: 'Conversion-First Copy', explanation: 'Psychology-backed headlines designed to turn local traffic into immediate action.' }
      ],
      ar: [
        { name: 'تصميم خليجي أولاً', explanation: 'تخطيطات مرئية وطباعة تم اختبارها خصيصاً لأنماط القراءة العربية والأذواق القطرية الفاخرة.' },
        { name: 'أداء الحافة (Edge)', explanation: 'مرات تحميل أقل من ثانية في جميع أنحاء الدوحة لمنع التسرب على شبكات الجوال 5G.' },
        { name: 'نصوص تحويلية', explanation: 'عناوين مدعومة بعلم النفس مصممة لتحويل الزيارات المحلية إلى إجراءات فورية.' }
      ]
    }
  },
  'ai-qualification': {
    tools: ['GPT-4o', 'Condition Logic', 'NLP Dialects'],
    roi: { en: 'Save 20+ hours of sales team time per week.', ar: 'توفير أكثر من 20 ساعة من وقت فريق المبيعات أسبوعياً.' },
    features: {
      en: [
        { name: 'Intent Scoring', explanation: 'AI agents that ask strategic questions to determine budget, timeline, and urgency automatically.' },
        { name: 'Multi-Channel Capture', explanation: 'Uniform qualification logic across your website, Instagram DMs, and WhatsApp.' },
        { name: 'Instant CRM Entry', explanation: 'Qualified leads are automatically pushed to your sales team with a full summary of their needs.' }
      ],
      ar: [
        { name: 'سجل النية', explanation: 'وكلاء ذكاء اصطناعي يطرحون أسئلة استراتيجية لتحديد الميزانية والجدول الزمني ومدى الإلحاح آلياً.' },
        { name: 'جذب متعدد القنوات', explanation: 'منطق تأهيل موحد عبر موقعك الإلكتروني ورسائل إنستغرام وواتساب.' },
        { name: 'إدخال CRM فوري', explanation: 'يتم دفع العملاء المؤهلين تلقائياً إلى فريق المبيعات مع ملخص كامل لاحتياجاتهم.' }
      ]
    }
  },
  'follow-up-engine': {
    tools: ['Ansury Automate', 'WhatsApp API', 'SMTP Relay'],
    roi: { en: '90% reduction in lead response time.', ar: 'انخفاض بنسبة 90% في وقت الاستجابة للعملاء.' },
    features: {
      en: [
        { name: 'Rapid-Fire Response', explanation: 'The "5-minute rule" automated. Reach leads while they are still on your site.' },
        { name: 'Drip Nurture Logic', explanation: 'Multi-day follow-up sequences that handle objections and share case studies autonomously.' },
        { name: 'Meeting Scheduler', explanation: 'Integrated booking systems that let qualified leads choose a time on your calendar instantly.' }
      ],
      ar: [
        { name: 'استجابة سريعة جداً', explanation: 'أتمتة "قاعدة الـ 5 دقائق". تواصل مع العملاء بينما لا يزالون في موقعك.' },
        { name: 'منطق رعاية التقطير', explanation: 'سلاسل متابعة متعددة الأيام تتعامل مع الاعتراضات وتشارك دراسات الحالة ذاتياً.' },
        { name: 'مجدول المواعيد', explanation: 'أنظمة حجز متكاملة تتيح للعملاء المؤهلين اختيار وقت في تقويمك فوراً.' }
      ]
    }
  },
  'growth-sync': {
    tools: ['Looker Studio', 'Zapier', 'Custom Webhooks'],
    roi: { en: '100% visibility on marketing spend.', ar: 'رؤية بنسبة 100% على الإنفاق التسويقي.' },
    features: {
      en: [
        { name: 'Live Command Center', explanation: 'Real-time dashboard showing exactly how many leads are in each stage of your automated funnel.' },
        { name: 'Attribution Mapping', explanation: 'Know exactly which ad or campaign generated the highest value qualified leads.' },
        { name: 'Automated Reporting', explanation: 'Weekly performance digests sent to your inbox—no more manual spreadsheets.' }
      ],
      ar: [
        { name: 'مركز القيادة المباشر', explanation: 'لوحة تحكم في الوقت الفعلي توضح بالضبط عدد العملاء في كل مرحلة من مراحل قمعك المؤتمت.' },
        { name: 'خرائط الإسناد', explanation: 'اعرف بالضبط أي إعلان أو حملة ولدت أعلى قيمة من العملاء المؤهلين.' },
        { name: 'تقارير مؤتمتة', explanation: 'ملخصات أداء أسبوعية تُرسل إلى بريدك الوارد - لا مزيد من جداول البيانات اليدوية.' }
      ]
    }
  }
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'lusail-apartments',
    client: 'Lusail Prime Reality',
    title: { en: 'Converting Passive Browsers into Qualified Investors', ar: 'تحويل المتصفحين السلبيين إلى مستثمرين مؤهلين' },
    category: { en: 'Real Estate / Funnel Automation', ar: 'عقارات / أتمتة الأقماع' },
    description: { 
      en: 'We replaced their static website with a high-conversion engine that qualified leads via WhatsApp.', 
      ar: 'استبدلنا موقعهم الإلكتروني الثابت بمحرك تحويل عالي الأداء يقوم بتأهيل العملاء عبر واتساب.' 
    },
    results: {
      en: ['400% ROI on ad spend', '85% Automatic qualification', '2min Lead response time'],
      ar: ['400% عائد على الإنفاق الإعلاني', '85% تأهيل تلقائي', 'دقيقتان وقت الاستجابة للعملاء']
    },
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1200',
    tags: ['Landing Page', 'AI Qualify', 'Real Estate']
  },
  {
    id: 'doha-dentistry',
    client: 'Pearl Dental Clinic',
    title: { en: 'Automating the Patient Booking Loop', ar: 'أتمتة حلقة حجز المرضى' },
    category: { en: 'Medical / Lead Automation', ar: 'طبي / أتمتة العملاء' },
    description: { 
      en: 'A 24/7 AI receptionist that qualifies insurance and books appointments instantly.', 
      ar: 'موظف استقبال ذكاء اصطناعي يعمل 24/7 يتحقق من التأمين ويحجز المواعيد فوراً.' 
    },
    results: {
      en: ['120 New bookings/mo', 'Zero missed inquiries', '60% Admin time saved'],
      ar: ['120 حجزاً جديداً شهرياً', 'صفر استفسارات مفقودة', '60% توفير في الوقت الإداري']
    },
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
    tags: ['Healthcare', 'Appointment AI', 'Automation']
  }
];
