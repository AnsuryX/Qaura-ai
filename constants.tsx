
import React from 'react';
import { LayoutTemplate, BrainCircuit, Zap, LineChart } from 'lucide-react';
import { Service, CaseStudy } from './types';

export const SERVICES: Service[] = [
  {
    id: 'conversion-pages',
    title: { en: 'Stop Scroll & Turn Visitors into Clients', ar: 'توقف عن التمرير وحول الزوار إلى عملاء' },
    description: { 
      en: 'Most websites lose 95% of traffic. Our landing pages are high-status conversion architecture designed to capture attention and trigger immediate action.', 
      ar: 'معظم المواقع تخسر 95% من الزوار. صفحات الهبوط لدينا هي بنية تحتية مصممة لجذب الانتباه وإثارة اتخاذ إجراء فوري.' 
    },
    icon: 'LayoutTemplate'
  },
  {
    id: 'ai-qualification',
    title: { en: 'Screen Leads Automatically 24/7', ar: 'فحص العملاء تلقائيًا 24/7' },
    description: { 
      en: 'Stop wasting time on people who can\'t afford you. Our AI screens leads for budget and intent, so you only talk to high-value opportunities.', 
      ar: 'توقف عن إضاعة الوقت مع أشخاص لا يستطيعون تحمل تكلفتك. يقوم ذكاؤنا الاصطناعي بفحص العملاء للميزانية والنية.' 
    },
    icon: 'BrainCircuit'
  },
  {
    id: 'follow-up-engine',
    title: { en: 'Close Deals While They Are Hot', ar: 'أغلق الصفقات وهي لا تزال ساخنة' },
    description: { 
      en: 'Leads cool down in minutes. We install infrastructure that responds in < 60 seconds with personalized WhatsApp and Email follow-ups.', 
      ar: 'العملاء يبردون في دقائق. نحن نثبت بنية تحتية تستجيب في أقل من 60 ثانية بمتابعات مخصصة عبر واتساب والبريد الإلكتروني.' 
    },
    icon: 'Zap'
  },
  {
    id: 'growth-sync',
    title: { en: 'See Exactly Where Revenue Comes From', ar: 'اعرف بالضبط من أين تأتي الإيرادات' },
    description: { 
      en: 'No more guessing. We sync your automated funnel to real-time ROI dashboards so you know exactly which Riyal produced which lead.', 
      ar: 'لا مزيد من التخمين. نحن نربط قمعك المؤتمت بلوحات تحكم عائد الاستثمار في الوقت الفعلي.' 
    },
    icon: 'LineChart'
  }
];

export const SERVICE_DETAILS = {
  'conversion-pages': {
    tools: ['High-Performance Edge', 'Khaleeji UX', 'A/B Testing'],
    roi: { en: 'Average 3.5x increase in conversion rate.', ar: 'متوسط زيادة 3.5 ضعف في معدل التحويل.' },
    features: {
      en: [
        { name: 'Zero Traffic Leakage', explanation: 'Prevent potential clients from leaving your site due to technical friction or slow loading.' },
        { name: 'Luxury Qatari UX', explanation: 'Design patterns tested for high-net-worth expectations in the Doha market.' },
        { name: 'Conversion Copywriting', explanation: 'Every word is written to move users from "just looking" to "need this now".' }
      ],
      ar: [
        { name: 'صفر تسرب للزيارات', explanation: 'منع العملاء المحتملين من مغادرة موقعك بسبب الاحتكاك التقني أو التحميل البطيء.' },
        { name: 'تجربة مستخدم قطرية فاخرة', explanation: 'أنماط تصميم تم اختبارها لتوقعات ذوي الثروات العالية في سوق الدوحة.' },
        { name: 'نصوص تحويلية', explanation: 'كل كلمة مكتوبة لتحويل المستخدمين من "مجرد تصفح" إلى "أحتاج هذا الآن".' }
      ]
    }
  },
  'ai-qualification': {
    tools: ['Advanced NLP', 'Intent Analysis', 'Condition Logic'],
    roi: { en: 'Save 20+ hours of sales team time per week.', ar: 'توفير أكثر من 20 ساعة من وقت فريق المبيعات أسبوعياً.' },
    features: {
      en: [
        { name: 'Budget Verification', explanation: 'The AI determines budget before you ever waste a meeting with a low-intent prospect.' },
        { name: '24/7 Screening', explanation: 'Qualify leads at 3 AM while your competitors are asleep.' },
        { name: 'Intent Scoring', explanation: 'Rank leads based on how ready they are to buy right now.' }
      ],
      ar: [
        { name: 'التحقق من الميزانية', explanation: 'يحدد الذكاء الاصطناعي الميزانية قبل أن تضيع وقتك في أي اجتماع مع عميل غير جاد.' },
        { name: 'فحص 24/7', explanation: 'تأهيل العملاء في الساعة 3 صباحاً بينما ينام منافسوك.' },
        { name: 'تسجيل النية', explanation: 'تصنيف العملاء بناءً على مدى استعدادهم للشراء الآن.' }
      ]
    }
  },
  'follow-up-engine': {
    tools: ['Ansury Automate', 'WhatsApp API', 'Direct Calendar Sync'],
    roi: { en: '90% reduction in lead response time.', ar: 'انخفاض بنسبة 90% في وقت الاستجابة للعملاء.' },
    features: {
      en: [
        { name: '60s Response Time', explanation: 'Leads are 100x more likely to convert if contacted within 5 minutes.' },
        { name: 'Objection Handling', explanation: 'Nurture sequences that address common doubts before they reach your staff.' },
        { name: 'Auto-Booking', explanation: 'Qualified prospects can book directly into your team\'s calendar.' }
      ],
      ar: [
        { name: 'استجابة في 60 ثانية', explanation: 'فرصة تحويل العملاء تزيد 100 مرة إذا تم الاتصال بهم في غضون 5 دقائق.' },
        { name: 'معالجة الاعتراضات', explanation: 'سلاسل رعاية تعالج الشكوك الشائعة قبل وصولهم إلى موظفيك.' },
        { name: 'حجز تلقائي', explanation: 'يمكن للعملاء المؤهلين الحجز مباشرة في تقويم فريقك.' }
      ]
    }
  },
  'growth-sync': {
    tools: ['Revenue Dashboards', 'Profit Tracking', 'Real-time Alerts'],
    roi: { en: '100% visibility on marketing spend.', ar: 'رؤية بنسبة 100% على الإنفاق التسويقي.' },
    features: {
      en: [
        { name: 'ROI Clarity', explanation: 'Know your exact cost-per-qualified-lead, not just cost-per-click.' },
        { name: 'Scaling Blueprints', explanation: 'See exactly where to invest more to maximize your profit.' },
        { name: 'Zero Spreadsheets', explanation: 'Eliminate manual reporting. Get real-time updates pushed to your phone.' }
      ],
      ar: [
        { name: 'وضوح عائد الاستثمار', explanation: 'اعرف بالضبط تكلفة العميل المؤهل الواحد، وليس فقط تكلفة النقرة.' },
        { name: 'مخططات التوسع', explanation: 'اعرف بالضبط أين تستثمر أكثر لزيادة أرباحك.' },
        { name: 'صفر جداول بيانات', explanation: 'تخلص من التقارير اليدوية. احصل على تحديثات في الوقت الفعلي على هاتفك.' }
      ]
    }
  }
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'lusail-apartments',
    client: 'Lusail Prime Realty',
    title: { en: 'Replaced 3 Sales Roles with 1 AI Engine', ar: 'استبدال 3 وظائف مبيعات بمحرك ذكاء اصطناعي واحد' },
    category: { en: 'Real Estate Growth', ar: 'نمو العقارات' },
    description: { 
      en: 'Turned a manual, leaky sales process into an autonomous qualification system that increased deal speed by 300%.', 
      ar: 'حولنا عملية مبيعات يدوية مليئة بالتسرب إلى نظام تأهيل ذاتي زاد من سرعة إغلاق الصفقات بنسبة 300%.' 
    },
    results: {
      en: ['4x ROI on ad spend', '85% Automatic qualification', '100% Leads contacted < 60s'],
      ar: ['4 أضعاف عائد الإنفاق الإعلاني', '85% تأهيل تلقائي', '100% تواصل في أقل من 60 ثانية']
    },
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1200',
    tags: ['Real Estate', 'AI Infrastructure']
  },
  {
    id: 'doha-dentistry',
    client: 'Pearl Dental Clinic',
    title: { en: '120 High-Value Patient Bookings in 30 Days', ar: '120 حجز مريض عالي القيمة في 30 يوماً' },
    category: { en: 'Healthcare Scaling', ar: 'توسع الرعاية الصحية' },
    description: { 
      en: 'Installed AI infrastructure that qualifies insurance and books appointments instantly, removing admin bottlenecks.', 
      ar: 'ثبتنا بنية تحتية للذكاء الاصطناعي تتحقق من التأمين وتحجز المواعيد فوراً، مما أزال عوائق الإدارة.' 
    },
    results: {
      en: ['120 New bookings/mo', 'Zero leakage on inquiries', '60% Admin overhead reduction'],
      ar: ['120 حجزاً جديداً شهرياً', 'صفر تسرب في الاستفسارات', '60% تقليل التكاليف الإدارية']
    },
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
    tags: ['Medical', 'Auto-Booking']
  }
];
