import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TermsAndConditions() {
  const { type } = useParams() as { type: 'personal' | 'business' };
  const { t, language } = useLanguage();
  const [displayLanguage, setDisplayLanguage] = useState<'en' | 'ar'>('en');

  const isBusiness = type === 'business';
  const title = isBusiness ? 'Business Terms & Conditions' : 'Personal Terms & Conditions';
  
  // PDF paths - using public folder
  const pdfPath = isBusiness 
    ? '/Business_terms_conditions.pdf' 
    : '/Personal_terms_conditions.pdf';
  
  // Alternative: If you want to host PDFs online (recommended for better viewing)
  // You can upload them to a cloud storage and use those URLs
  const onlinePdfUrl = isBusiness
    ? 'https://carwash-h7df.vercel.app/Business_terms_conditions.pdf'
    : 'https://carwash-h7df.vercel.app/Personal_terms_conditions.pdf';

  const handleViewDocument = () => {
    // Try online URL first, fallback to local path
    window.open(onlinePdfUrl || pdfPath, '_blank');
  };

  const toggleLanguage = (lang: 'en' | 'ar') => {
    setDisplayLanguage(lang);
  };

  // Terms content in English and Arabic
  const termsContent = {
    personal: {
      en: `
        <h2>Personal User Terms and Conditions</h2>
        
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using Clean Cars 360 services, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h3>2. Services</h3>
        <p>Clean Cars 360 provides car washing and detailing services through our platform. We connect customers with verified car wash centers.</p>
        
        <h3>3. User Account</h3>
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
        
        <h3>4. Booking and Cancellation</h3>
        <p>Users can book services through the platform. Cancellations must be made at least 2 hours before the scheduled service time.</p>
        
        <h3>5. Payment</h3>
        <p>All payments must be made as per the pricing displayed on the platform. We accept cash, card, and online payment methods.</p>
        
        <h3>6. Quality Guarantee</h3>
        <p>If you are not satisfied with the service quality, please inform us within 24 hours and we will address your concerns.</p>
        
        <h3>7. Limitation of Liability</h3>
        <p>Clean Cars 360 is not liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
        
        <h3>8. Modifications to Terms</h3>
        <p>We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.</p>
      `,
      ar: `
        <h2>شروط وأحكام المستخدم الشخصي</h2>
        
        <h3>1. قبول الشروط</h3>
        <p>من خلال الوصول إلى خدمات Clean Cars 360 واستخدامها، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذا الاتفاق.</p>
        
        <h3>2. الخدمات</h3>
        <p>توفر Clean Cars 360 خدمات غسيل وتنظيف السيارات من خلال منصتنا. نحن نوصل العملاء بمراكز غسيل سيارات معتمدة.</p>
        
        <h3>3. حساب المستخدم</h3>
        <p>أنت مسؤول عن الحفاظ على سرية بيانات حسابك وجميع الأنشطة التي تتم تحت حسابك.</p>
        
        <h3>4. الحجز والإلغاء</h3>
        <p>يمكن للمستخدمين حجز الخدمات من خلال المنصة. يجب إجراء الإلغاء قبل ساعتين على الأقل من وقت الخدمة المحدد.</p>
        
        <h3>5. الدفع</h3>
        <p>يجب إجراء جميع المدفوعات وفقًا للأسعار المعروضة على المنصة. نحن نقبل طرق الدفع النقدي والبطاقة والدفع عبر الإنترنت.</p>
        
        <h3>6. ضمان الجودة</h3>
        <p>إذا لم تكن راضيًا عن جودة الخدمة، يرجى إخبارنا خلال 24 ساعة وسنعالج مخاوفك.</p>
        
        <h3>7. حدود المسؤولية</h3>
        <p>لا تتحمل Clean Cars 360 مسؤولية أي أضرار غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام خدماتنا.</p>
        
        <h3>8. التعديلات على الشروط</h3>
        <p>نحن نحتفظ بالحق في تعديل هذه الشروط في أي وقت. يشكل الاستمرار في استخدام المنصة قبولاً للشروط المعدلة.</p>
      `
    },
    business: {
      en: `
        <h2>Business Partner Terms and Conditions</h2>
        
        <h3>1. Partnership Agreement</h3>
        <p>By registering as a business partner with Clean Cars 360, you agree to provide high-quality car washing and detailing services to our customers.</p>
        
        <h3>2. Business Verification</h3>
        <p>All businesses must provide valid commercial registration, tax certificates, and other required documentation during registration.</p>
        
        <h3>3. Service Standards</h3>
        <p>Partners must maintain consistent service quality, use approved products, and follow Clean Cars 360 service guidelines.</p>
        
        <h3>4. Pricing and Commission</h3>
        <p>Business partners agree to the commission structure as defined by Clean Cars 360. All pricing must be transparent and displayed on the platform.</p>
        
        <h3>5. Customer Service</h3>
        <p>Partners must treat all customers professionally, resolve complaints promptly, and maintain high satisfaction ratings.</p>
        
        <h3>6. Payment Settlement</h3>
        <p>Payments will be settled weekly after deducting the agreed commission. Detailed reports will be provided through the dashboard.</p>
        
        <h3>7. Brand Usage</h3>
        <p>Partners may use Clean Cars 360 branding for marketing purposes only with prior written approval.</p>
        
        <h3>8. Termination</h3>
        <p>Either party may terminate this agreement with 30 days written notice. Immediate termination may occur for violation of terms.</p>
      `,
      ar: `
        <h2>شروط وأحكام شريك الأعمال</h2>
        
        <h3>1. اتفاقية الشراكة</h3>
        <p>من خلال التسجيل كشريك أعمال مع Clean Cars 360، فإنك توافق على تقديم خدمات غسيل وتنظيف السيارات عالية الجودة لعملائنا.</p>
        
        <h3>2. التحقق من الأعمال</h3>
        <p>يجب على جميع الشركات تقديم سجل تجاري صالح وشهادات ضريبية ومستندات أخرى مطلوبة أثناء التسجيل.</p>
        
        <h3>3. معايير الخدمة</h3>
        <p>يجب على الشركاء الحفاظ على جودة خدمة متسقة، واستخدام المنتجات المعتمدة، واتباع إرشادات خدمة Clean Cars 360.</p>
        
        <h3>4. التسعير والعمولة</h3>
        <p>يوافق شركاء الأعمال على هيكل العمولة كما حددته Clean Cars 360. يجب أن تكون جميع الأسعار شفافة ومعروضة على المنصة.</p>
        
        <h3>5. خدمة العملاء</h3>
        <p>يجب على الشركاء معاملة جميع العملاء باحترافية، وحل الشكاوى على الفور، والحفاظ على تصنيفات رضا عالية.</p>
        
        <h3>6. تسوية المدفوعات</h3>
        <p>ستتم تسوية المدفوعات أسبوعيًا بعد خصم العمولة المتفق عليها. سيتم توفير تقارير مفصلة من خلال لوحة التحكم.</p>
        
        <h3>7. استخدام العلامة التجارية</h3>
        <p>قد يستخدم الشركاء علامة Clean Cars 360 التجارية لأغراض التسويق فقط بموافقة خطية مسبقة.</p>
        
        <h3>8. الإنهاء</h3>
        <p>يجوز لأي من الطرفين إنهاء هذه الاتفاقية بإشعار كتابي مدته 30 يومًا. قد يحدث الإنهاء الفوري لانتهاك الشروط.</p>
      `
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/register" 
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-bold uppercase tracking-wider">{t('backToRegistration')}</span>
          </Link>
          
          {/* Language Toggle - WORKING NOW! */}
          <div className="flex gap-2">
            <button
              onClick={() => toggleLanguage('en')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                displayLanguage === 'en' 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              English
            </button>
            <button
              onClick={() => toggleLanguage('ar')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                displayLanguage === 'ar' 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              العربية
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div className="card w-full bg-black border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mb-4">
              <FileText className="text-yellow-400" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-slate-400 text-center">
              {t('pleaseReadTerms')}
            </p>
          </div>

          {/* Terms Content - Scrollable with Language Toggle */}
          <div className="bg-white/5 rounded-xl p-6 mb-6 max-h-[600px] overflow-y-auto custom-scrollbar">
            {/* Show English */}
            {displayLanguage === 'en' && (
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🇬🇧</span> English Version
                </h2>
                <div 
                  className="prose prose-invert max-w-none text-white/90"
                  dangerouslySetInnerHTML={{ __html: termsContent[isBusiness ? 'business' : 'personal'].en }}
                />
              </div>
            )}

            {/* Show Arabic */}
            {displayLanguage === 'ar' && (
              <div dir="rtl">
                <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🇸🇦</span> النسخة العربية
                </h2>
                <div 
                  className="prose prose-invert max-w-none text-white/90"
                  dangerouslySetInnerHTML={{ __html: termsContent[isBusiness ? 'business' : 'personal'].ar }}
                />
              </div>
            )}
          </div>

          {/* PDF Viewer Section */}
          <div className="mb-6">
            <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2">
                <FileText size={20} />
                {t('viewTermsDocument')}
              </h3>
              <p className="text-sm text-slate-400">
                {t('viewTermsDescription')}
              </p>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="bg-black border border-white/10 rounded-xl overflow-hidden" style={{ height: '600px' }}>
              <iframe
                src={`${onlinePdfUrl || pdfPath}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full"
                title="Terms and Conditions PDF"
                style={{ border: 'none' }}
              />
            </div>

            {/* Alternative Download Options */}
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              <a 
                href={onlinePdfUrl || pdfPath}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-yellow-400 font-bold text-sm transition-all"
              >
                <Download size={18} />
                {t('downloadDirectly')}
              </a>
              
              <button
                onClick={handleViewDocument}
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black rounded-xl font-bold text-sm transition-all shadow-lg shadow-yellow-400/10"
              >
                <ExternalLink size={18} />
                {t('openInFullScreen')}
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="border-t border-white/10 pt-6">
            <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-4">
              <p className="text-sm text-yellow-400">
                <strong>⚠️ {t('importantTermsNotice').split(':')[0]}:</strong>{' '}
                {t('importantTermsNotice').split(':').slice(1).join(':')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
