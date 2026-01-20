import React from 'react';
import { LayoutTemplate, BrainCircuit, Zap, LineChart } from 'lucide-react';
import { Service, CaseStudy, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'conversion-pages',
    title: { en: 'Khaleeji Conversion Architecture', ar: 'هندسة التحويل الخليجية' },
    description: { 
      en: 'Stop wasting traffic. We install high-status conversion architecture that turns the Khaleeji scroll into qualified intent. Proven to increase lead volume by 4.2x. Deploy your engine.', 
      ar: 'توقف عن خسارة الزوار. نثبت بنية تحويل فاخرة تحول التصفح الخليجي إلى نية شراء مؤكدة. أثبتت كفاءتها بزيادة العملاء 4.2 ضعف. انشر محركك.' 
    },
    icon: 'LayoutTemplate'
  },
  {
    id: 'ai-qualification',
    title: { en: 'Autonomous HNW Qualification', ar: 'تأهيل تلقائي لكبار العملاء' },
    description: { 
      en: 'Talk only to buyers. Our AI screens every regional prospect for budget and authority before they touch your calendar. Reclaims 25+ hours of sales time weekly. Filter your pipe.', 
      ar: 'تحدث مع المشترين فقط. يقوم ذكاؤنا الاصطناعي بفحص كل عميل إقليمي للميزانية والصلاحية فوراً. استعد 25+ ساعة من وقت المبيعات أسبوعياً. ابدأ الفرز.' 
    },
    icon: 'BrainCircuit'
  },
  {
    id: 'follow-up-engine',
    title: { en: 'The 60-Second Closing Loop', ar: 'حلقة الإغلاق في 60 ثانية' },
    description: { 
      en: 'Never lose a lead. We trigger personalized WhatsApp loops within 60 seconds of qualification to lock in prospects while they are hot. Achieve 88% higher conversions. Close faster.', 
      ar: 'لا تفقد عميلاً أبداً. نفعل حلقات واتساب مخصصة خلال 60 ثانية من التأهيل لضمان الحجز فوراً. حقق تحويلات أعلى بنسبة 88%. أغلق الصفقات أسرع.' 
    },
    icon: 'Zap'
  },
  {
    id: 'growth-sync',
    title: { en: 'Regional Growth Synchronization', ar: 'مزامنة النمو الإقليمي' },
    description: { 
      en: 'Master your margins. We synchronize all regional funnel data into real-time ROI dashboards for absolute profit clarity. Get 100% visibility on scaling. Scale with data.', 
      ar: 'تحكم في هوامش ربحك. نمزامن جميع بيانات الأقماع الإقليمية في لوحات تحكم فورية لوضوح مالي مطلق. احصل على رؤية 100% لتوسعك. توسع بالبيانات.' 
    },
    icon: 'LineChart'
  }
];

export const SERVICE_DETAILS = {
  'conversion-pages': {
    tools: ['Vercel Edge', 'Arabic NLP Copy', 'HNWI UX Design'],
    roi: { en: 'Average 4.2x increase in qualified lead volume.', ar: 'متوسط زيادة 4.2 ضعف في حجم العملاء المؤهلين.' },
    features: {
      en: [
        { name: 'Zero Friction UX', explanation: 'Eliminating the 3-second bounce that costs GCC businesses millions in lost ad spend.' },
        { name: 'Luxury Aesthetics', explanation: 'Visual language that commands respect from elite Qatari, Saudi, and Emirati clientele.' },
        { name: 'Multi-Dialect Copy', explanation: 'Copy that resonates whether your audience is in نجد, the Levant, or the Coast.' }
      ],
      ar: [
        { name: 'تجربة مستخدم بلا عوائق', explanation: 'القضاء على الارتداد الذي يكلف شركات الخليج الملايين من الإنفاق الإعلاني الضائع.' },
        { name: 'جماليات فاخرة', explanation: 'لغة بصرية تفرض الاحترام من النخبة القطرية والسعودية الإماراتية.' },
        { name: 'نصوص متعددة اللهجات', explanation: 'نصوص تلامس جمهورك سواء كان في نجد أو الشام أو الساحل.' }
      ]
    }
  },
  'ai-qualification': {
    tools: ['Custom GPT Agents', 'Lead Scoring', 'CRM Integration'],
    roi: { en: 'Reclaims 25+ hours of sales leadership time per week.', ar: 'استعادة أكثر من 25 ساعة من وقت قيادة المبيعات أسبوعياً.' },
    features: {
      en: [
        { name: 'Budget Screening', explanation: 'Identify high-ticket potential immediately before human intervention.' },
        { name: '24/7 Concierge', explanation: 'Capture and qualify leads during late-night peak usage hours in the Middle East.' },
        { name: 'Bot-to-Human Handover', explanation: 'Seamless transition to your closers only when a lead is 90% ready to buy.' }
      ],
      ar: [
        { name: 'فحص الميزانية', explanation: 'تحديد إمكانات الصفقات الكبيرة فوراً قبل التدخل البشري.' },
        { name: 'كونسيرج 24/7', explanation: 'جذب وتأهيل العملاء خلال ساعات الذروة المتأخرة في الشرق الأوسط.' },
        { name: 'تسليم سلس للبشر', explanation: 'انتقال سلس لمغلقي الصفقات فقط عندما يكون العميل جاهزاً بنسبة 90%.' }
      ]
    }
  },
  'follow-up-engine': {
    tools: ['WhatsApp Business API', 'SMTP Relays', 'Booking AI'],
    roi: { en: '88% higher conversion of qualified inquiries.', ar: 'تحويل أعلى بنسبة 88% للاستفسارات المؤهلة.' },
    features: {
      en: [
        { name: 'Hyper-Personalization', explanation: 'AI follow-ups that reference specific client needs shared during qualification.' },
        { name: 'Automated Scheduling', explanation: 'The AI books the meeting on your calendar without back-and-forth emails.' },
        { name: 'Omnichannel Presence', explanation: 'Be present where your clients are: WhatsApp, Email, and SMS.' }
      ],
      ar: [
        { name: 'شخصنة فائقة', explanation: 'متابعات ذكاء اصطناعي تشير إلى احتياجات العميل المحددة التي تمت مشاركتها أثناء التأهيل.' },
        { name: 'جدولة مؤتمتة', explanation: 'يقوم الذكاء الاصطناعي بحجز الاجتماع في تقويمك دون رسائل متبادلة.' },
        { name: 'تواجد شامل', explanation: 'كن حاضراً حيث يتواجد عملاؤك: واتساب، بريد إلكتروني، ورسائل نصية.' }
      ]
    }
  },
  'growth-sync': {
    tools: ['Custom Dashboards', 'API Sync', 'Predictive Analysis'],
    roi: { en: '100% clarity on regional scaling ROI.', ar: 'وضوح بنسبة 100% على عائد استثمار التوسع الإقليمي.' },
    features: {
      en: [
        { name: 'Revenue Attribution', explanation: 'Know exactly which Riyadh ad campaign led to your biggest Dubai deal.' },
        { name: 'Automated Reporting', explanation: 'Weekly executive summaries pushed directly to your WhatsApp.' },
        { name: 'Waste Detection', explanation: 'Instantly identify and cut ad spend that produces non-qualified leads.' }
      ],
      ar: [
        { name: 'إسناد الإيرادات', explanation: 'اعرف بالضبط أي حملة إعلانية في الرياض أدت إلى أكبر صفقة لك في دبي.' },
        { name: 'تقارير مؤتمتة', explanation: 'ملخصات تنفيذية أسبوعية تُرسل مباشرة إلى واتساب الخاص بك.' },
        { name: 'كشف الهدر', explanation: 'تحديد وقطع الإنفاق الإعلاني الذي ينتج عملاء غير مؤهلين فوراً.' }
      ]
    }
  }
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'riyadh-luxury-realestate',
    client: 'Al-Majd Estates, Riyadh',
    title: { en: 'Autonomous Lead Machine for $50M Assets', ar: 'آلة عملاء ذاتية لأصول بقيمة 50 مليون دولار' },
    category: { en: 'KSA Vision 2030 Real Estate', ar: 'عقارات رؤية 2030 - السعودية' },
    description: { 
      en: 'Deployed a full conversion engine for high-end luxury villas in Riyadh, replacing 4 manual sales coordinators.', 
      ar: 'قمنا بنشر محرك تحويل كامل للفيلات الفاخرة في الرياض، ليحل محل 4 منسقي مبيعات يدوياً.' 
    },
    results: {
      en: ['5.2x ROI in 60 days', '92% Auto-Qualification', 'SAR 12M Pipeline Added'],
      ar: ['5.2 ضعف عائد الاستثمار في 60 يوماً', '92% تأهيل تلقائي', 'إضافة 12 مليون ريال للقمع البيعي']
    },
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200',
    tags: ['KSA', 'Real Estate', 'AI Infrastructure']
  },
  {
    id: 'dubai-wealth-mgmt',
    client: 'Apex Capital, Dubai',
    title: { en: 'Scale Without Headcount: 310% Growth', ar: 'التوسع بدون زيادة موظفين: نمو بنسبة 310%' },
    category: { en: 'Fintech / Wealth Management', ar: 'تكنولوجيا مالية / إدارة ثروات' },
    description: { 
      en: 'Automated the entire lead-to-meeting pipeline for a HNW investment firm in DIFC, replacing manual vetting with an AI that verifies investor status instantly.', 
      ar: 'أتمتة كامل قمع تحويل العملاء إلى اجتماعات لشركة استثمار كبرى في مركز دبي المالي العالمي، واستبدال الفحص اليدوي بذكاء اصطناعي يتحقق من وضع المستثمر فوراً.' 
    },
    results: {
      en: ['310% Increase in qualified calls', 'Zero manual follow-up', '100% Data accuracy'],
      ar: ['زيادة 310% في المكالمات المؤهلة', 'صفر متابعة يدوية', 'دقة بيانات 100%']
    },
    image: 'https://images.unsplash.com/photo-1582653280643-e395ea042731?auto=format&fit=crop&q=80&w=1200',
    tags: ['UAE', 'Fintech', 'Automation']
  },
  {
    id: 'kuwait-medical-group',
    client: 'Royal Health, Kuwait',
    title: { en: '1,200 Automated Consultations per Month', ar: '1,200 استشارة مؤتمتة شهرياً' },
    category: { en: 'Healthcare / Medical Tourism', ar: 'الرعاية الصحية / السياحة العلاجية' },
    description: { 
      en: 'Built an autonomous patient acquisition engine that handles 24/7 inquiries in Kuwait and the GCC.', 
      ar: 'بناء محرك جذب مرضى ذاتي يتعامل مع الاستفسارات على مدار الساعة في الكويت والخليج.' 
    },
    results: {
      en: ['65% Lower Acquisition Cost', '80% Staff time saved', '1,200 Monthly bookings'],
      ar: ['تكلفة جذب أقل بنسبة 65%', 'توفير 80% من وقت الموظفين', '1,200 حجز شهري']
    },
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
    tags: ['Kuwait', 'Medical', 'Growth Sync']
  },
  {
    id: 'lusail-apartments',
    client: 'Lusail Prime, Doha',
    title: { en: 'Doha\'s Most Efficient Real Estate Engine', ar: 'أكثر محرك عقاري كفاءة في الدوحة' },
    category: { en: 'Qatar Luxury Living', ar: 'الحياة الفاخرة في قطر' },
    description: { 
      en: 'Turned a leaky manual process into a 24/7 autonomous closing machine.', 
      ar: 'تحويل عملية يدوية مليئة بالتسرب إلى آلة إغلاق ذاتية تعمل 24/7.' 
    },
    results: {
      en: ['4x ROI on ad spend', '85% Automatic qualification', '100% Instant response'],
      ar: ['4 أضعاف عائد الإنفاق الإعلاني', '85% تأهيل تلقائي', '100% استجابة فورية']
    },
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1200',
    tags: ['Qatar', 'Real Estate', 'Full Engine']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Faisal Al-Saud',
    company: 'Al-Majd Estates, Riyadh',
    quote: { 
      en: "Ansury didn't just give us a website; they gave us a 24/7 sales force that understands the high-status expectations of our Saudi clientele.",
      ar: "أنسوري لم تمنحنا مجرد موقع إلكتروني؛ لقد منحونا قوة مبيعات تعمل على مدار الساعة وتفهم التوقعات الراقية لعملائنا في السعودية."
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'test-2',
    name: 'Sarah Bin Rashid',
    company: 'Apex Capital, Dubai',
    quote: { 
      en: "The lead quality improved by 300% in the first month. Our sales team is now only talking to serious investors, reclaiming hours of productive time.",
      ar: "تحسنت جودة العملاء المحتملين بنسبة 300% في الشهر الأول. يتحدث فريق مبيعاتنا الآن فقط مع المستثمرين الجادين، مما وفر ساعات من الوقت المنتج."
    },
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'test-3',
    name: 'Yousuf Al-Mulla',
    company: 'Royal Health, Kuwait City',
    quote: { 
      en: "Speed is status in the Khaleej. Ansury's 60-second response infrastructure ensured we never lost a high-value inquiry to a competitor.",
      ar: "السرعة هي المكانة في الخليج. ضمنت البنية التحتية للاستجابة في 60 ثانية من أنسوري أننا لم نفقد أي استفسار عالي القيمة لمنافس."
    },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'test-4',
    name: 'Jassim Al-Thani',
    company: 'Lusail Prime, Doha',
    quote: { 
      en: "The ROI was clear from day 14. Their autonomous growth engine is truly synchronized with the fast-paced Qatar market.",
      ar: "كان عائد الاستثمار واضحاً من اليوم الرابع عشر. محرك النمو الذاتي الخاص بهم متزامن حقاً مع السوق القطري سريع الوتيرة."
    },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];