import React, { useState, useEffect } from 'react';
import { Gift, CreditCard, Plus, Copy, Check, Loader2, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import api from '../../lib/api';
import { useLanguage } from '../../contexts/LanguageContext';

interface GiftCard {
  id: string;
  code: string;
  type: 'cash' | 'service';
  initial_value: number;
  current_balance: number;
  expiry_date: string;
  service_name?: string;
  business_name?: string;
}

interface Service {
  id: number;
  name_en: string;
  price_small: number;
  business_name: string;
}

interface PurchaseModalProps {
  show: boolean;
  onClose: () => void;
  purchaseType: 'cash' | 'service';
  onTypeChange: (type: 'cash' | 'service') => void;
  amount: number;
  onAmountChange: (amount: number) => void;
  selectedService: Service | null;
  onServiceSelect: (service: Service | null) => void;
  services: Service[];
  onPurchase: () => void;
  processing: boolean;
  t: any;
}

export default function GiftCards() {
  const [cards, setCards] = useState<GiftCard[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseType, setPurchaseType] = useState<'cash' | 'service'>('cash');
  const [amount, setAmount] = useState<number>(50);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [processing, setProcessing] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    fetchCards();
    fetchServices();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await api.get('/customer/gift-cards');
      setCards(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to fetch gift cards:', error);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await api.get('/customer/centers');
      console.log('Centers API Response:', res.data);
      // Extract all services from all centers
      const allServices: Service[] = [];
      if (Array.isArray(res.data)) {
        res.data.forEach((center: any) => {
          console.log('Processing center:', center);
          if (Array.isArray(center.services)) {
            center.services.forEach((service: any) => {
              allServices.push({
                ...service,
                business_name: center.name || center.business_name || 'Unknown Center'
              });
            });
          } else {
            console.log('No services found in center:', center.name);
          }
        });
      }
      console.log('All services extracted:', allServices);
      setServices(allServices);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setServices([]);
    }
  };

  const handlePurchase = async () => {
    if (purchaseType === 'service' && !selectedService) {
      alert('Please select a service');
      return;
    }

    setProcessing(true);
    try {
      // Simulate payment
      await new Promise(resolve => setTimeout(resolve, 1500));

      await api.post('/customer/gift-cards/purchase', {
        type: purchaseType,
        amount: purchaseType === 'cash' ? amount : selectedService?.price_small, 
        service_id: purchaseType === 'service' ? selectedService?.id : null,
        business_id: purchaseType === 'service' ? null : null 
      });

      await fetchCards();
      setShowPurchaseModal(false);
      setSelectedService(null);
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Failed to purchase gift card');
    } finally {
      setProcessing(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const [showServiceSelector, setShowServiceSelector] = useState(false);

  // Service Selector Modal Component
  const ServiceSelectorModal = () => (
    showServiceSelector && (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
        <div className="bg-neutral-900 w-full max-w-[440px] rounded-[32px] p-6 animate-in zoom-in-95 duration-200 border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">{t('Select Service')}</h3>
            <button 
              onClick={() => setShowServiceSelector(false)} 
              className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl p-2 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {services.length > 0 && (
            <div className="mb-4 text-xs text-slate-400">
              {services.length} {services.length === 1 ? t('service') : t('services')} {t('available')}
            </div>
          )}

          <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
            {services.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift size={32} className="text-slate-500" />
                </div>
                <p className="text-slate-400 text-sm">{t('No services available')}</p>
              </div>
            ) : (
              services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service);
                    setShowServiceSelector(false);
                  }}
                  className={cn(
                    "w-full p-4 rounded-2xl text-left transition-all border flex justify-between items-center group",
                    selectedService?.id === service.id
                      ? "bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/20"
                      : "bg-black text-slate-400 border-white/10 hover:border-yellow-400/50 hover:bg-white/5"
                  )}
                >
                  <div className="flex-1">
                    <div className="font-bold text-base mb-1">{service.name_en}</div>
                    <div className="text-xs opacity-70 flex items-center gap-1">
                      <span>{service.business_name}</span>
                    </div>
                  </div>
                  <div className="font-black text-lg text-yellow-400 group-hover:text-yellow-300">
                    SAR {service.price_small}
                  </div>
                </button>
              ))
            )}
          </div>

          {selectedService && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs text-yellow-400 font-bold mb-1">{t('Selected Service')}</div>
                    <div className="text-sm text-white font-medium">{selectedService.name_en}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-yellow-400 font-bold mb-1">{t('Price')}</div>
                    <div className="text-lg font-black text-yellow-400">SAR {selectedService.price_small}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-slate-400" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('Gift Cards')}</h1>
        <button 
          onClick={() => setShowPurchaseModal(true)}
          className="bg-yellow-400 text-black p-2 rounded-xl hover:bg-yellow-300 transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="grid gap-4">
        {cards.length === 0 ? (
          <div className="text-center py-12 bg-neutral-900 rounded-3xl border border-white/5">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-slate-400">
              <Gift size={32} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">{t('No Gift Cards')}</h3>
            <p className="text-slate-400 text-sm mb-6">{t('Purchase a gift card for yourself or a friend.')}</p>
            <button 
              onClick={() => setShowPurchaseModal(true)} 
              className="btn-primary w-full"
            >
              {t('Buy Gift Card')}
            </button>
          </div>
        ) : (
          cards.map((card) => (
            <div key={card.id} className="bg-gradient-to-r from-neutral-800 to-neutral-900 border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Gift size={100} />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest mb-1">
                      {card.type === 'cash' ? t('Cash Card') : t('Service Card')}
                    </p>
                    <h3 className="text-2xl font-black text-white">
                      {card.type === 'cash' ? `SAR ${card.current_balance}` : card.service_name}
                    </h3>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg backdrop-blur-sm">
                    <Gift size={20} className="text-yellow-400" />
                  </div>
                </div>

                <div className="bg-black/40 rounded-xl p-3 flex items-center justify-between mb-3 border border-white/5">
                  <code className="font-mono text-lg font-bold tracking-wider text-yellow-400">
                    {card.code}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(card.code)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedCode === card.code ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                  </button>
                </div>

                <p className="text-[10px] text-slate-500 font-medium">
                  {t('Expires')}: {new Date(card.expiry_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center z-[100] p-4">
          <div className="bg-neutral-900 w-full max-w-[440px] rounded-t-[40px] p-8 animate-in slide-in-from-bottom duration-300 border-t border-white/10">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{t('Buy Gift Card')}</h2>
              <button onClick={() => setShowPurchaseModal(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex p-1 bg-black rounded-xl mb-6 border border-white/10">
              <button 
                onClick={() => setPurchaseType('cash')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
                  purchaseType === 'cash' ? "bg-yellow-400 text-black font-bold" : "text-slate-400 hover:text-white"
                )}
              >
                {t('Cash Card')}
              </button>
              <button 
                onClick={() => setPurchaseType('service')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
                  purchaseType === 'service' ? "bg-yellow-400 text-black font-bold" : "text-slate-400 hover:text-white"
                )}
              >
                {t('Service Card')}
              </button>
            </div>

            <div className="space-y-6 mb-8">
              {purchaseType === 'cash' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('Amount (SAR)')}</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[50, 100, 200].map((val) => (
                      <button
                        key={val}
                        onClick={() => setAmount(val)}
                        className={cn(
                          "py-3 rounded-xl font-bold text-sm transition-all border",
                          amount === val 
                            ? "bg-yellow-400 text-black border-yellow-400" 
                            : "bg-black text-slate-400 border-white/10 hover:border-white/30"
                        )}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('Select Service')}</label>
                  <button
                    onClick={() => setShowServiceSelector(true)}
                    className={cn(
                      "w-full p-4 rounded-2xl text-left transition-all border flex justify-between items-center",
                      selectedService
                        ? "bg-yellow-400/10 text-yellow-400 border-yellow-400/50 hover:border-yellow-400"
                        : "bg-black text-slate-400 border-white/10 hover:border-yellow-400/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Gift size={20} className={selectedService ? "text-yellow-400" : "text-slate-500"} />
                      <div>
                        <div className="font-bold text-sm">
                          {selectedService ? selectedService.name_en : t('Choose a service...')}
                        </div>
                        {selectedService && (
                          <div className="text-xs opacity-70">{selectedService.business_name}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedService && (
                        <div className="font-black text-lg text-yellow-400">
                          SAR {selectedService.price_small}
                        </div>
                      )}
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-slate-400">
                        <path d="M7.5 12.5L10 15L12.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.5 7.5L10 5L12.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>
                </div>
              )}

              <div className="bg-black rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                <span className="text-slate-400 font-medium">{t('Total to Pay')}</span>
                <span className="text-xl font-bold text-white">
                  SAR {purchaseType === 'cash' ? amount : (selectedService?.price_small || 0)}
                </span>
              </div>
            </div>

            <button 
              onClick={handlePurchase}
              disabled={processing}
              className="btn-primary w-full py-4 shadow-lg shadow-yellow-400/20 disabled:opacity-70"
            >
              {processing ? t('Processing...') : t('Purchase Now')}
            </button>
          </div>
        </div>
      )}

      {/* Service Selector Modal */}
      <ServiceSelectorModal />
    </div>
  );
}
