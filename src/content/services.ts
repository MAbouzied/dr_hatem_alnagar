import type { ServiceContent } from './types';

export const services: ServiceContent[] = [
  {
    id: 'general-surgery',
    slug: 'general-surgery',
    oldWordPressSlug: 'general-surgery',
    titleAr: 'الجراحة العامة',
    shortDescriptionAr:
      'تشخيص وعلاج جراحي للحالات العامة في البطن والطوارئ والغدد اللعابية بخبرة أكثر من ٢٥ عاماً.',
    fullDescriptionAr:
      'تشمل الجراحة العامة في عيادة الدكتور حاتم النجار تقييم الحالات الجراحية في البطن والأمعاء، جراحات الطوارئ، وإجراءات الغدد اللعابية. نؤمن بالتشخيص الدقيق قبل أي تدخل، مع تفضيل التقنيات طفيفة التوغل عندما يسمح بها نوع الحالة.',
    whenToConsultAr: [
      'آلام بطن مستمرة أو متكررة',
      'فتق أو كتل تحتاج تقييماً جراحياً',
      'حالات طوارئ جراحية بعد التوجيه من الطوارئ',
      'حاجة لرأي جراحي ثانٍ',
    ],
    benefitsAr: [
      'خبرة استشارية في الجراحة العامة',
      'تخطيط علاجي واضح ومشاركة المريض في القرار',
      'تنسيق العمليات في مستشفيات معتمدة',
      'متابعة ما بعد الجراحة',
    ],
    ctaTextAr: 'احجز استشارة جراحية',
    title: 'الجراحة العامة | الدكتور حاتم النجار',
    description: 'إجراءات الجراحة العامة بأحدث التقنيات وتعافٍ آمن في عيادة أ.د. حاتم النجار.',
    schemaHint: 'MedicalProcedure',
    relatedArticleIds: [],
    iconPath: '/images/services/general-surgery.svg',
  },
  {
    id: 'laparoscopic-surgery',
    slug: 'laparoscopic-surgery',
    oldWordPressSlug: 'radiology',
    titleAr: 'جراحة المناظير',
    shortDescriptionAr:
      'جراحة طفيفة التوغل بتقنيات حديثة لتقليل الألم ومدة التعافي — استئصال المرارة، الفتق، وغيرها.',
    fullDescriptionAr:
      'جراحة المناظير تتيح إجراء العمليات عبر فتحات صغيرة بدلاً من شق جراحي كبير. في العيادة نطبق أحدث تقنيات المناظير لتقليل الألم، تقصير الإقامة، والعودة الأسرع للنشاط اليومي.',
    whenToConsultAr: [
      'حصى أو التهاب المرارة',
      'فتق بطني أو فخذي',
      'حاجة لتشخيص منظاري للبطن',
      'استئصالات معتمدة على المنظار',
    ],
    benefitsAr: [
      'ندوب جراحية صغيرة',
      'ألم أقل بعد العملية',
      'إقامة أقصر في المستشفى',
      'عودة أسرع للأنشطة اليومية',
    ],
    ctaTextAr: 'استفسر عن جراحة المناظير',
    title: 'جراحة المناظير | عيادة الدكتور حاتم النجار',
    description: 'جراحة طفيفة التوغل لتقليل الألم وفترة التعافي مع أ.د. حاتم النجار.',
    schemaHint: 'MedicalProcedure',
    relatedArticleIds: ['laparoscopic-advances'],
    iconPath: '/images/services/laparoscopic-surgery.svg',
  },
  {
    id: 'bariatric-surgery',
    slug: 'bariatric-surgery',
    oldWordPressSlug: 'orthopedics',
    titleAr: 'جراحات السمنة المفرطة',
    shortDescriptionAr:
      'حلول جراحية للسمنة تشمل تكميم المعدة وتحويل المسار — علاج طبي متكامل وليس فقط فقدان وزن.',
    fullDescriptionAr:
      'جراحات السمنة في العيادة تُجرى بعد تقييم شامل يشمل الفحوصات والاستعداد النفسي والالتزام بتغيير نمط الحياة. تشمل الخيارات تكميم المعدة بالمنظار، تحويل مسار المعدة، وعملية SASI حسب حالة المريض.',
    whenToConsultAr: [
      'مؤشر كتلة جسم 35+ مع أمراض مرتبطة',
      'مؤشر كتلة جسم 40+',
      'فشل فقدان الوزن بالطرق التقليدية لستة أشهر',
    ],
    benefitsAr: [
      'تحسين السكري وضغط الدم وانقطاع النفس',
      'متابعة تغذوية وبرنامج متابعة',
      'إجراءات بالمنظار عند الإمكان',
    ],
    ctaTextAr: 'احجز تقييم السمنة',
    title: 'جراحات السمنة | الدكتور حاتم النجار',
    description: 'حلول جراحية للسمنة المفرطة تحت إشراف استشاري جراحة.',
    schemaHint: 'MedicalProcedure',
    relatedArticleIds: ['bariatric-surgery-guide'],
    iconPath: '/images/services/bariatric-surgery.svg',
  },
  {
    id: 'colorectal-surgery',
    slug: 'colorectal-surgery',
    oldWordPressSlug: 'dental-care',
    titleAr: 'جراحة الشرج والمستقيم',
    shortDescriptionAr:
      'علاج البواسير بالليزر وجراحات الجهاز الهضمي السفلي — حلول دقيقة وتعافٍ أسرع.',
    fullDescriptionAr:
      'نقدم علاج البواسير بتقنية الليزر المتقدمة إلى جانب جراحات الشرج والمستقيم الأخرى. الهدف تقليل الألم وفترة التعافي مع الحفاظ على الدقة التشخيصية قبل أي تدخل.',
    whenToConsultAr: [
      'بواسير مزمنة أو نزيف',
      'ألم أو كتل في منطقة الشرج',
      'حاجة لعلاج بالليزر بدلاً من الجراحة التقليدية',
      'متابعة بعد تشخيص سرطان قولون',
    ],
    benefitsAr: [
      'علاج البواسير بالليزر في جلسة قصيرة',
      'تعافٍ أسرع مقارنة بالجراحة التقليدية',
      'خصوصية ورعاية متخصصة',
    ],
    ctaTextAr: 'استشر عن علاج البواسير',
    title: 'جراحة الشرج والمستقيم | الدكتور حاتم النجار',
    description: 'علاج البواسير بالليزر وجراحات الجهاز الهضمي في القاهرة.',
    schemaHint: 'MedicalProcedure',
    relatedArticleIds: ['laser-hemorrhoids', 'colon-cancer-early-detection'],
    iconPath: '/images/services/colorectal-surgery.svg',
  },
  {
    id: 'oncology-surgery',
    slug: 'oncology-surgery',
    oldWordPressSlug: 'pharmacology',
    titleAr: 'جراحة الأورام',
    shortDescriptionAr:
      'تشخيص وعلاج جراحي للأورام الحميدة والخبيثة مع تنسيق متعدد التخصصات.',
    fullDescriptionAr:
      'جراحة الأورام في العيادة تشمل تقييم الأورام، استئصال الغدد الليمفاوية، وجراحات الأورام الجلدية، مع التنسيق مع التخصصات الأخرى عند الحاجة. نؤكد على الاكتشاف المبكر خاصة في سرطان القولون.',
    whenToConsultAr: [
      'كتل أو أورام تحتاج تقييماً جراحياً',
      'حاجة لاستئصال ورم بعد التشخيص',
      'متابعة بعد اكتشاف بوليب أو ورم',
    ],
    benefitsAr: [
      'خبرة في جراحة أورام الجهاز الهضمي',
      'تخطيط علاجي شامل',
      'متابعة بعد العملية',
    ],
    ctaTextAr: 'احجز تقييم أورام',
    title: 'جراحة الأورام | الدكتور حاتم النجار',
    description: 'تشخيص وعلاج جراحي للأورام بمنهج متعدد التخصصات.',
    schemaHint: 'MedicalProcedure',
    relatedArticleIds: ['colon-cancer-early-detection'],
    iconPath: '/images/services/oncology-surgery.svg',
  },
  {
    id: 'endocrine-surgery',
    slug: 'endocrine-surgery',
    oldWordPressSlug: 'hematology',
    titleAr: 'جراحة الغدد الصماء',
    shortDescriptionAr:
      'جراحة الغدة الدرقية والغدد الجار درقية والكظرية — متى تحتاج للتدخل الجراحي.',
    fullDescriptionAr:
      'جراحة الغدد الصماء تتطلب دقة تشخيصية عالية. نُقيّم عُقَد الغدة الدرقية والحالات التي تستدعي استئصالاً جزئياً أو كلياً، مع متابعة وظائف الغدة بعد الجراحة.',
    whenToConsultAr: [
      'عُقَد درقية مشبوهة أو كبيرة',
      'فرط نشاط أو قصور يحتاج تقييماً جراحياً',
      'سرطان أو اشتباه سرطان الغدة الدرقية',
    ],
    benefitsAr: [
      'تقييم شامل قبل الجراحة',
      'خبرة في جراحة الغدد',
      'متابعة بعد الاستئصال',
    ],
    ctaTextAr: 'استشر عن الغدة الدرقية',
    title: 'جراحة الغدد الصماء | الدكتور حاتم النجار',
    description: 'جراحة الغدة الدرقية والغدد الصماء في عيادة متخصصة.',
    schemaHint: 'MedicalProcedure',
    relatedArticleIds: ['thyroid-surgery-guide'],
    iconPath: '/images/services/endocrine-surgery.svg',
  },
];

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return services.find((s) => s.slug === slug);
}
