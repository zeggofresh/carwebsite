import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Shield, Zap, MapPin, Star, Clock, CheckCircle2, Car,
  Smartphone, TrendingUp, Store, CreditCard, History, ArrowRight, Navigation, Play, BadgeCheck,
  LayoutDashboard, Layers
} from 'lucide-react';
import api from '../../lib/api';
import { useLanguage } from '../../contexts/LanguageContext';

export const CustomerHome = ({ audience = 'INDIVIDUALS', setAudience, onOpenLogin, searchQuery = '' }: any) => {
  const { language: lang } = useLanguage();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isRtl = lang === 'ar';

  useEffect(() => {
    console.log('CustomerHome mounted, audience:', audience);
    const fetchBusinesses = async () => {
      try {
        const response = await api.get('/public/centers');
        setBusinesses(response.data || []);
      } catch (error) {
        console.error('Error fetching businesses:', error);
        setBusinesses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const filteredBusinesses = businesses.filter(b => 
    (b.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (b.address?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  const stats = [
    { icon: Store, label: isRtl ? 'مراكز الخدمة' : 'Service Centers', value: '500+', color: 'text-brand-yellow' },
    { icon: Star, label: isRtl ? 'تقييم العملاء' : 'Customer Rating', value: '4.9/5', color: 'text-emerald-500' },
    { icon: Clock, label: isRtl ? 'متوسط الوقت' : 'Avg. Time', value: '45m', color: 'text-blue-500' },
    { icon: History, label: isRtl ? 'غسلات مكتملة' : 'Washes Done', value: '10k+', color: 'text-purple-500' }
  ];

  const features = audience === 'BUSINESSES' ? [
    {
      icon: LayoutDashboard,
      title: isRtl ? 'لوحة تحكم متقدمة' : 'Advanced Dashboard',
      desc: isRtl ? 'تحكم كامل في عملياتك، من الحجوزات إلى الموظفين.' : 'Complete control over your operations, from bookings to staff.'
    },
    {
      icon: TrendingUp,
      title: isRtl ? 'تحليلات الإيرادات' : 'Revenue Analytics',
      desc: isRtl ? 'تتبع نموك مع تقارير مالية مفصلة واتجاهات.' : 'Track your growth with detailed financial reports and trends.'
    },
    {
      icon: CreditCard,
      title: isRtl ? 'مدفوعات سلسة' : 'Seamless Payments',
      desc: isRtl ? 'اقبل Apple Pay و POS والنقد مع تسوية آلية.' : 'Accept Apple Pay, POS, and cash with automated reconciliation.'
    },
    {
      icon: Layers,
      title: isRtl ? 'مزامنة الفروع' : 'Branch Sync',
      desc: isRtl ? 'إدارة مواقع متعددة من حساب واحد موحد.' : 'Manage multiple locations from a single unified account.'
    }
  ] : [
    {
      icon: Smartphone,
      title: isRtl ? 'حجز ذكي' : 'Smart Booking',
      desc: isRtl ? 'احجز موعدك في ثوانٍ من هاتفك' : 'Book your appointment in seconds from your phone'
    },
    {
      icon: Navigation,
      title: isRtl ? 'تتبع مباشر' : 'Live Tracking',
      desc: isRtl ? 'تابع حالة غسيل سيارتك لحظة بلحظة' : 'Track your car wash status in real-time'
    },
    {
      icon: CreditCard,
      title: isRtl ? 'دفع آمن' : 'Secure Payment',
      desc: isRtl ? 'خيارات دفع متعددة وآمنة تماماً' : 'Multiple secure payment options available'
    },
    {
      icon: Clock,
      title: isRtl ? 'توفير الوقت' : 'Time Saving',
      desc: isRtl ? 'لا داعي للانتظار، احجز موعدك مسبقاً' : 'No more waiting, book your slot in advance'
    }
  ];

  const isCurrentlyOpen = (workingHours: string) => {
    if (!workingHours) return true; // Default to open if not specified
    try {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      // Basic parsing for "HH:MM - HH:MM" format
      const match = workingHours.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
      if (match) {
        const start = parseInt(match[1]) * 60 + parseInt(match[2]);
        const end = parseInt(match[3]) * 60 + parseInt(match[4]);
        
        if (end < start) { // Handles overnight hours
          return currentTime >= start || currentTime <= end;
        }
        return currentTime >= start && currentTime <= end;
      }
    } catch (e) {
      console.error('Error parsing working hours:', e);
    }
    return true;
  };

  return (
    <div className="space-y-32 pb-32 mt-24">
      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <div className="premium-badge mx-auto inline-block">
            {audience === 'BUSINESSES' 
              ? (isRtl ? 'حلول الأعمال' : 'Business Solutions')
              : (isRtl ? 'لماذا نحن؟' : 'Why Choose Us?')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {audience === 'BUSINESSES'
              ? (isRtl ? 'أدوات قوية لأعمالك' : 'Powerful Tools for Business')
              : (isRtl ? 'ميزات ذكية لك' : 'Smart Features for You')}
          </h2>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features?.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="premium-card p-8 space-y-4 group hover:border-brand-yellow/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-brand-yellow" />
              </div>
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Centers Section */}
      {audience === 'INDIVIDUALS' && (
        <section id="centers" className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-4">
              <div className="premium-badge inline-block">
                {isRtl ? 'المراكز القريبة' : 'Nearby Centers'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {isRtl ? 'ابحث عن أفضل مركز حولك' : 'Find the Best Center Near You'}
              </h2>
            </div>
            <button 
              onClick={onOpenLogin}
              className="premium-btn px-8 py-4 rounded-xl flex items-center gap-2 group whitespace-nowrap"
            >
              {isRtl ? 'عرض الكل' : 'View All Centers'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="premium-card h-[400px] animate-pulse bg-white/5" />
              ))
            ) : filteredBusinesses?.length > 0 ? (
              filteredBusinesses.slice(0, 6).map((center, idx) => (
                <motion.div
                  key={center.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="premium-card overflow-hidden group border-white/5 hover:border-brand-yellow/20"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={center.image_url || 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800'} 
                      alt={center.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className="bg-brand-yellow/90 backdrop-blur-md text-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider shadow-xl">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        {isRtl ? 'متجر موثق' : 'Verified Store'}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-1 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
                        {center.rating || '4.8'}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-yellow transition-colors">
                        {center.name}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-1 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {center.address}
                      </p>
                      {center.working_hours && (
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-2">
                          <Clock className="w-3 h-3" />
                          {center.working_hours}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        {isCurrentlyOpen(center.working_hours) ? (
                          <>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs text-emerald-500 font-medium">
                              {isRtl ? 'مفتوح الآن' : 'Open Now'}
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 rounded-full bg-rose-500" />
                            <span className="text-xs text-rose-500 font-medium">
                              {isRtl ? 'مغلق حالياً' : 'Closed Now'}
                            </span>
                          </>
                        )}
                      </div>
                      <button 
                        onClick={onOpenLogin}
                        className="text-brand-yellow text-sm font-bold flex items-center gap-1 group/btn"
                      >
                        {isRtl ? 'احجز الآن' : 'Book Now'}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                  <Car className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-slate-400">
                  {isRtl ? 'لا توجد مراكز متاحة حالياً' : 'No centers available yet'}
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
