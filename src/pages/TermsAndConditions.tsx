import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TermsAndConditions() {
  const { type } = useParams() as { type: 'personal' | 'business' };
  const { t, language } = useLanguage();
  const [displayLanguage, setDisplayLanguage] = useState<'en' | 'ar'>('en');

  const isBusiness = type === 'business';
  const title = isBusiness ? 'Business Terms & Conditions' : 'Personal Terms & Conditions';

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
        
        <h3>1. التعريفات</h3>
        <p>• "المنصة": نظام إدارة مغاسل السيارات (الموقع أو التطبيق)<br>• "العميل": أي شخص يقوم بالتسجيل أو استخدام خدمات الغسيل<br>• "مقدم الخدمة": مالك المغسلة أو محطة الغسيل المسؤول عن تقديم الخدمة<br>• "الخدمة": جميع خدمات غسيل السيارات المعروضة<br>• "الاشتراك": الباقات الشهرية أو الخدمات المتكررة المدفوعة</p>
        
        <h3>2. قبول الشروط</h3>
        <p>باستخدامك للمنصة، فإنك تقر وتوافق على الالتزام بجميع شروط وأحكام المنصة، وأي تعديلات تطرأ عليها لاحقاً.</p>
        
        <h3>3. التسجيل واستخدام الحساب</h3>
        <p>يلتزم المستخدم بإدخال بيانات صحيحة وكاملة عند التسجيل، ويتحمل مسؤولية الحفاظ على سرية تلك البيانات وأي تبعات ناجمة عنها.</p>
        
        <h3>4. أسعار الخدمات والاشتراكات والعروض</h3>
        <p>جميع أسعار الخدمات والاشتراكات والعروض من قبل مقدم الخدمة، والمنصة لا تلتزم بأي سعر ولا تتحمل أي مسؤولية تجاه ذلك.</p>
        
        <h3>5. الدفع</h3>
        <p>لا تتحمل المنصة أي مسؤولية عن عمليات الدفع أو التحصيل داخل المنصة أو خارجها.</p>
        
        <h3>6. إلغاء الحجز/الاسترجاع</h3>
        <p>تخضع سياسات الإلغاء والاسترجاع لما يحدده مقدم الخدمة، ولا تلتزم المنصة بأي التزام تجاهها.</p>
        
        <h3>7. مسؤولية الخدمة</h3>
        <p>لا تتحمل المنصة أي مسؤولية عن أي ضرر أو فقدان أو سوء جودة الخدمة المقدمة من قبل مقدم الخدمة.</p>
        
        <h3>8. تقييم الخدمة</h3>
        <p>يحق للمستخدم تقييم الخدمة وفقاً للأنظمة والمعايير المعمول بها، مع منع الشتم والتحقير والذم والعنصرية.</p>
        
        <h3>9. إساءة الاستخدام</h3>
        <p>أي عبث أو إساءة لاستخدام المنصة أو لخدماتها، يحق للمنصة اتخاذ الإجراءات اللازمة عند المخالفة.</p>
        
        <h3>10. خصوصية البيانات</h3>
        <p>تلتزم المنصة بحماية بيانات المستخدمين وفقاً لسياسة الخصوصية المعتمدة، ولا تمتد مسؤوليتها إلى البيانات المقدمة لمقدمي الخدمات.</p>
        
        <h3>11. التعديلات</h3>
        <p>تحتفظ المنصة بالحق في تعديل هذه الشروط والأحكام في أي وقت، واستمرار استخدام المنصة يعتبر موافقة على التعديل.</p>
        
        <h3>12. التواصل</h3>
        <p>أي شكوى فنية أو تتعلق بالخدمة يجب إبلاغها مباشرة إلى مقدم الخدمة، ولا تتحمل المنصة مسؤولية معالجتها.</p>
        
        <h3>13. تحديد المسؤولية</h3>
        <p>لا تتحمل المنصة أي أضرار مباشرة أو غير مباشرة أو تبعية ناتجة عن استخدام المنصة أو الخدمات المقدمة عبرها.</p>
        
        <h3>14. تعويض المستخدم</h3>
        <p>يلتزم المستخدم بتعويض المنصة عن أي مطالبات أو خسائر أو أضرار تنشأ نتيجة مخالفته لهذه الشروط.</p>
        
        <h3>15. العلاقة التعاقدية</h3>
        <p>تعمل المنصة كوسيط فقط بين المستخدم ومقدم الخدمة، ولا يعد طرفاً في العقد بينهما.</p>
        
        <h3>16. القوة القاهرة</h3>
        <p>لا تتحمل المنصة أي مسؤولية عن أي تأخير أو تقصير ناتج عن ظروف خارجة عن الإرادة.</p>
        
        <h3>17. القانون الحاكم</h3>
        <p>يخضع استخدام هذه الشروط والأحكام وأنظمة المملكة العربية السعودية المعمول بها.</p>
        
        <h3>18. فض المنازعات</h3>
        <p>تتم تسوية النزاعات الناشئة عن هذه الشروط عن طريق المحاكم وفقاً للأنظمة المعمول بها في المملكة العربية السعودية.</p>
        
        <h3>19. القبول الإلكتروني</h3>
        <p>الموافقة الإلكترونية عبر مربع الاختيار تعتبر توقيعاً ملزماً.</p>
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
        
        <h3>اتفاقية استخدام وتشغيل منصة Clean Cars 360 - اتفاقية ثلاثية الأطراف</h3>
        
        <h4>الأطراف:</h4>
        <p>1. الطرف الأول: مالك منصة Clean Cars 360 (ويشار إليه لاحقاً بـ "المنصة")<br>
        2. الطرف الثاني: مقدم الخدمة (مالك أو مشغل مغسلة السيارات المسجل في المنصة) (ويشار إليه لاحقاً بـ "مقدم الخدمة")<br>
        3. الطرف الثالث: المستخدم النهائي/العميل الذي يطلب الخدمات عبر المنصة (ويشار إليه لاحقاً بـ "العميل")</p>
        
        <p>تُعد هذه الاتفاقية ملزمة لجميع الأطراف، وتعتبر موافقة الطرف الثاني على هذه الاتفاقية إلكترونياً عند التسجيل في المنصة قبولاً باتفاقية ثلاثية الأطراف.</p>
        
        <h3>المادة (1): طبيعة العلاقة</h3>
        <ul>
          <li>المنصة وسيط تقني يربط بين مقدم الخدمة والعميل.</li>
          <li>لا تنشأ عن هذه الاتفاقية أي علاقة شراكة أو وكالة أو تمثيل قانوني بين الأطراف.</li>
          <li>العلاقة التعاقدية الخاصة بتنفيذ الخدمة تكون بين الطرف الثاني (مقدم الخدمة) والطرف الثالث (العميل).</li>
          <li>دور الطرف الأول يقتصر على توفير النظام التقني وتنظيم العمليات.</li>
        </ul>
        
        <h3>المادة (2): موضوع الاتفاقية</h3>
        <p>تمكن المنصة الطرف الثاني من:</p>
        <ul>
          <li>عرض خدماته وأسعاره.</li>
          <li>إدارة الاشتراكات والباقات.</li>
          <li>إدارة العروض وبطاقات الهدايا.</li>
          <li>استقبال المدفوعات الإلكترونية.</li>
          <li>إصدار تقارير تشغيلية ومالية.</li>
          <li>الاستفادة من الحملات التسويقية وفق اتفاق منفصل.</li>
        </ul>
        <p>ويقوم الطرف الثالث بطلب الخدمات وسداد قيمتها عبر المنصة.</p>
        
        <h3>المادة (3): التزامات الطرف الثاني (مقدم الخدمة)</h3>
        <p>يلتزم الطرف الثاني بما يلي:</p>
        <ul>
          <li>امتلاك سجل تجاري ورخصة سارية.</li>
          <li>تقديم معلومات صحيحة ومحدثة.</li>
          <li>الالتزام بجودة الخدمة المعلنة.</li>
          <li>الالتزام بالأسعار المعروضة داخل المنصة.</li>
          <li>عدم التواصل مع العملاء خارج المنصة بغرض التحايل على العمولة.</li>
          <li>عدم تقديم سعر أقل لنفس الخدمة خارج التطبيق لنفس العميل.</li>
          <li>تحمل كامل المسؤولية عن أي ضرر للمركبات.</li>
          <li>طباعة وعرض QR Code أو البنر الخاص بالمنصة داخل موقع العمل على نفقته الخاصة.</li>
        </ul>
        
        <h3>المادة (4): التزامات الطرف الثالث (العميل)</h3>
        <p>يلتزم الطرف الثالث بما يلي:</p>
        <ul>
          <li>تقديم معلومات صحيحة عند التسجيل.</li>
          <li>الالتزام بمواعيد الحجز.</li>
          <li>سداد قيمة الخدمة عبر المنصة أو في مركز الخدمة حسب وسائل الدفع المتاحة.</li>
          <li>عدم إساءة استخدام النظام أو تقديم بلاغات كيدية.</li>
        </ul>
        
        <h3>المادة (5): سياسة العمولات</h3>
        <ul>
          <li>يحصل الطرف الأول على عمولة قدرها X ريال عن كل عملية منفذة عبر المنصة وفق الملحق (1).</li>
          <li>يحصل الطرف الأول على عمولة منفصلة عن كل عملية حجز موعد وفق الملحق (1).</li>
          <li>تخصم العمولة من الرصيد المتوفر لدى مقدم الخدمة وفقاً لما ورد في المحفظة.</li>
          <li>في حال توفر المبلغ بالمحفظة.</li>
          <li>يتم تحويل المبالغ المستحقة بعد التصفية من المحفظة نهاية كل شهر إلى الحساب البنكي الخاص بالمنصة.</li>
          <li>تخضع الاشتراكات لنفس آلية العمولة.</li>
          <li>الحد الأدنى الشهري للعمولات هو (200 ريال سعودي)، وفي حال كانت العمولات أقل من ذلك يلتزم الطرف الثاني بسداد الفرق.</li>
          <li>في حال التحايل أو تنفيذ عمليات خارج النظام يلتزم الطرف الثاني بدفع غرامة تعاقدية عن كل حالة مثبتة.</li>
          <li>يحق للطرف الأول تعديل نسبة أو قيمة العمولة بإشعار مسبق لمدة (30 يوماً)، واستمرار الطرف الثاني باستخدام المنصة يعتبر موافقة على التعديل.</li>
          <li>يلتزم الطرف الثاني (مزود الخدمة) بتحويل المبلغ المستحق بعد خصم ما في المحفظة إلى حساب البنك للطرف الأول (المنصة) الرئيسي.</li>
        </ul>
        
        <h3>المادة (6): المدفوعات</h3>
        <ul>
          <li>تتم المدفوعات عبر بوابة دفع معتمدة.</li>
          <li>يتم تحويل المستحقات للطرف الثاني خلال (7 أيام عمل) من تاريخ نهاية كل شهر بناءً على تقرير المبيعات.</li>
          <li>يتم تحويل المبلغ المستحق إلى حساب المنصة أو الشركة نفسها أو إلى المالك مباشرة.</li>
          <li>لا يتحمل الطرف الأول مسؤولية تأخير مزود خدمة الدفع.</li>
          <li>يحق للطرف الأول حجز جزء من المستحقات عند وجود شكاوى قيد التحقيق.</li>
        </ul>
        
        <h3>المادة (7): الإلغاء والاسترداد</h3>
        <ul>
          <li>تخضع عمليات الاسترداد لسياسة موحدة معتمدة من المنصة.</li>
          <li>لا يجوز للطرف الثاني إلغاء اشتراك نشط دون موافقة خطية من الطرف الأول.</li>
          <li>يحق للطرف الأول تعليق الحساب عند تكرار الشكاوى المثبتة أو في حال عدم سداد المبالغ المستحقة.</li>
        </ul>
        
        <h3>المادة (8): المسؤولية القانونية</h3>
        <ul>
          <li>الطرف الأول وسيط تقني فقط.</li>
          <li>الطرف الثاني يتحمل كامل المسؤولية القانونية عن:<br>
            - جودة التنفيذ.<br>
            - أي ضرر أو مطالبة مالية.<br>
            - أي نزاع مباشر مع الطرف الثالث.
          </li>
          <li>يعفي الطرف الثالث الطرف الأول من أي مطالبة ناتجة عن سوء تنفيذ الخدمة.</li>
          <li>يلتزم الطرف الثاني بتعويض الطرف الأول عن أي ضرر ناتج عن إخلاله بالتزاماته.</li>
        </ul>
        
        <h3>المادة (9): حماية البيانات</h3>
        <ul>
          <li>بيانات العملاء ملك للطرف الأول.</li>
          <li>يمنع نسخ أو بيع أو استغلال قاعدة البيانات.</li>
          <li>تلتزم المنصة بحماية البيانات وفق نظام حماية البيانات الشخصية في المملكة العربية السعودية.</li>
          <li>يلتزم الطرف الثاني باستخدام البيانات لأغراض تنفيذ الخدمة فقط.</li>
        </ul>
        
        <h3>المادة (10): الملكية الفكرية</h3>
        <ul>
          <li>جميع حقوق الملكية الفكرية للمنصة محفوظة للطرف الأول.</li>
          <li>لا يحق للطرف الثاني استخدام شعار Clean Cars 360 أو اسمها تجارياً إلا بإذن كتابي من المنصة.</li>
        </ul>
        
        <h3>المادة (11): مدة الاتفاقية</h3>
        <ul>
          <li>يبدأ التعاقد من تاريخ الموافقة الإلكترونية على استخدام المنصة.</li>
          <li>تجدد تلقائياً ما لم يخطر أحد الطرفين بإنهاء العقد مع إعطاء مهلة شهر قبل الإنهاء.</li>
          <li>يجوز لأي طرف إنهاؤها بإشعار خطي قبل (30 يوماً).</li>
          <li>تخضع هذه الاتفاقية لأنظمة المملكة العربية السعودية، ويكون الاختصاص القضائي لمحاكم مدينة الرياض.</li>
        </ul>
        
        <h3>نموذج الإقرار الإلكتروني</h3>
        <p><strong>بموافقتي على هذه الشروط أقر بأنني:</strong></p>
        <ul>
          <li>قد قرأت وفهمت جميع بنود الاتفاقية.</li>
          <li>أوافق عليها بشكل كامل ونهائي.</li>
          <li>ألتزم بتنفيذ جميع الالتزامات المترتبة عليّ.</li>
        </ul>
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
