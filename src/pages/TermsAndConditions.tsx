import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TermsAndConditions() {
  const { type } = useParams<{ type: 'personal' | 'business' }>();
  const { t } = useLanguage();
  const [displayLanguage, setDisplayLanguage] = useState<'en' | 'hi'>('en');

  const isBusiness = type === 'business';
  const title = isBusiness ? 'Business Terms & Conditions' : 'Personal Terms & Conditions';
  const docPath = isBusiness 
    ? '/Business_terms_conditions.docx' 
    : '/Personal_terms_conditions.docx';

  const handleViewDocument = () => {
    window.open(docPath, '_blank');
  };

  const toggleLanguage = (lang: 'en' | 'hi') => {
    setDisplayLanguage(lang);
  };

  // Terms content in English and Hindi
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
      hi: `
        <h2>व्यक्तिगत उपयोगकर्ता नियम और शर्तें</h2>
        
        <h3>1. नियमों की स्वीकृति</h3>
        <p>Clean Cars 360 सेवाओं तक पहुंचकर और उनका उपयोग करके, आप इस अनुबंध के नियमों और प्रावधानों को स्वीकार करते हैं और उनसे बंधने के लिए सहमत होते हैं।</p>
        
        <h3>2. सेवाएं</h3>
        <p>Clean Cars 360 हमारे प्लेटफॉर्म के माध्यम से कार वॉशिंग और विवरण सेवाएं प्रदान करता है। हम ग्राहकों को सत्यापित कार वॉश केंद्रों से जोड़ते हैं।</p>
        
        <h3>3. उपयोगकर्ता खाता</h3>
        <p>आप अपने खाते की जानकारी की गोपनीयता बनाए रखने और अपने खाते के तहत होने वाली सभी गतिविधियों के लिए जिम्मेदार हैं।</p>
        
        <h3>4. बुकिंग और रद्दीकरण</h3>
        <p>उपयोगकर्ता प्लेटफॉर्म के माध्यम से सेवाएं बुक कर सकते हैं। रद्दीकरण अनुसूचित सेवा समय से कम से कम 2 घंटे पहले किया जाना चाहिए।</p>
        
        <h3>5. भुगतान</h3>
        <p>प्लेटफॉर्म पर प्रदर्शित मूल्य के अनुसार सभी भुगतान किए जाने चाहिए। हम नकद, कार्ड और ऑनलाइन भुगतान विधियां स्वीकार करते हैं।</p>
        
        <h3>6. गुणवत्ता गारंटी</h3>
        <p>यदि आप सेवा की गुणवत्ता से संतुष्ट नहीं हैं, तो कृपया 24 घंटों के भीतर हमें सूचित करें और हम आपकी चिंताओं का समाधान करेंगे।</p>
        
        <h3>7. देयता में सीमा</h3>
        <p>Clean Cars 360 हमारी सेवाओं के उपयोग से उत्पन्न होने वाले किसी भी अप्रत्यक्ष, आकस्मिक, या परिणामी क्षति के लिए उत्तरदायी नहीं है।</p>
        
        <h3>8. नियमों में संशोधन</h3>
        <p>हम किसी भी समय इन नियमों को संशोधित करने का अधिकार सुरक्षित रखते हैं। प्लेटफॉर्म का निरंतर उपयोग संशोधित नियमों की स्वीकृति का गठन करता है।</p>
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
      hi: `
        <h2>व्यापारिक साझेदार नियम और शर्तें</h2>
        
        <h3>1. साझेदारी समझौता</h3>
        <p>Clean Cars 360 के साथ व्यापारिक साझेदार के रूप में पंजीकरण करके, आप हमारे ग्राहकों को उच्च-गुणवत्ता वाली कार वॉशिंग और विवरण सेवाएं प्रदान करने के लिए सहमत होते हैं।</p>
        
        <h3>2. व्यवसाय सत्यापन</h3>
        <p>सभी व्यवसायों को पंजीकरण के दौरान वैध वाणिज्यिक पंजीकरण, कर प्रमाण पत्र, और अन्य आवश्यक दस्तावेज़ प्रदान करने होंगे।</p>
        
        <h3>3. सेवा मानक</h3>
        <p>साझेदारों को लगातार सेवा गुणवत्ता बनाए रखनी होगी, अनुमोदित उत्पादों का उपयोग करना होगा, और Clean Cars 360 सेवा दिशानिर्देशों का पालन करना होगा।</p>
        
        <h3>4. मूल्य निर्धारण और कमीशन</h3>
        <p>व्यापारिक साझेदार Clean Cars 360 द्वारा परिभाषित कमीशन संरचना के लिए सहमत हैं। सभी मूल्य निर्धारण पारदर्शी होना चाहिए और प्लेटफॉर्म पर प्रदर्शित किया जाना चाहिए।</p>
        
        <h3>5. ग्राहक सेवा</h3>
        <p>साझेदारों को सभी ग्राहकों के साथ पेशेवर व्यवहार करना चाहिए, शिकायतों का त्वरित समाधान करना चाहिए, और उच्च संतुष्टि रेटिंग बनाए रखनी चाहिए।</p>
        
        <h3>6. भुगतान निपटान</h3>
        <p>सहमत कमीशन घटाने के बाद साप्ताहिक भुगतान का निपटान किया जाएगा। डैशबोर्ड के माध्यम से विस्तृत रिपोर्ट प्रदान की जाएगी।</p>
        
        <h3>7. ब्रांड उपयोग</h3>
        <p>साझेदार केवल पूर्व लिखित अनुमोदन के साथ विपणन उद्देश्यों के लिए Clean Cars 360 ब्रांडिंग का उपयोग कर सकते हैं।</p>
        
        <h3>8. समाप्ति</h3>
        <p>कोई भी पक्ष 30 दिन के लिखित नोटिस के साथ इस समझौते को समाप्त कर सकता है। नियमों के उल्लंघन के लिए तत्काल समाप्ति हो सकती है।</p>
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
              onClick={() => toggleLanguage('hi')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                displayLanguage === 'hi' 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              हिंदी
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

            {/* Show Hindi */}
            {displayLanguage === 'hi' && (
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🇮🇳</span> हिंदी संस्करण (Hindi Version)
                </h2>
                <div 
                  className="prose prose-invert max-w-none text-white/90"
                  dangerouslySetInnerHTML={{ __html: termsContent[isBusiness ? 'business' : 'personal'].hi }}
                />
              </div>
            )}
          </div>

          {/* Download Option */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <p className="text-slate-400 text-sm">
              {t('documentFormatDocx')}
            </p>
            
            <div className="flex gap-4">
              <a 
                href={docPath}
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
                <FileText size={18} />
                Open in New Tab
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
