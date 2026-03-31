import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Tag, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2,
  X,
  Car
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import api from '../../../lib/api';
import { cn } from '../../../lib/utils';
import toast from 'react-hot-toast';

interface Service {
  id: number;
  name_en: string;
  name_ar: string;
  type: 'Exterior' | 'Interior' | 'Full' | 'Full Detailing';
  price_small: number;
  price_medium: number;
  price_suv: number;
  active: boolean;
}

export default function PriceListManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    type: 'Exterior' as 'Exterior' | 'Interior' | 'Full' | 'Full Detailing',
    price_small: '',
    price_medium: '',
    price_suv: '',
    active: true
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/business/services');
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = {
        name_en: formData.name_en,
        name_ar: formData.name_ar,
        type: formData.type,
        price_small: parseFloat(formData.price_small),
        price_medium: parseFloat(formData.price_medium),
        price_suv: parseFloat(formData.price_suv),
        active: formData.active
      };

      if (editingId) {
        await api.put(`/business/services/${editingId}`, data);
        toast.success('Service updated successfully');
      } else {
        await api.post('/business/services', data);
        toast.success('Service added successfully');
      }
      
      setShowForm(false);
      setEditingId(null);
      setFormData({
        name_en: '',
        name_ar: '',
        type: 'Exterior',
        price_small: '',
        price_medium: '',
        price_suv: '',
        active: true
      });
      fetchServices();
    } catch (error: any) {
      console.error('Error saving service:', error);
      toast.error(error?.response?.data?.message || 'Failed to save service');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      name_en: service.name_en,
      name_ar: service.name_ar,
      type: service.type,
      price_small: service.price_small.toString(),
      price_medium: service.price_medium.toString(),
      price_suv: service.price_suv.toString(),
      active: service.active
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.delete(`/business/services/${id}`);
      toast.success('Service deleted');
      fetchServices();
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  return (
    <div className="space-y-8 text-white font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Price List Management</h1>
            <p className="text-white/50 text-sm font-medium">Manage your services and pricing across all branches</p>
          </div>
        </div>

        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({
              name_en: '',
              name_ar: '',
              type: 'Exterior',
              price_small: '',
              price_medium: '',
              price_suv: '',
              active: true
            });
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-6 py-2.5 bg-yellow-500 text-black rounded-full font-bold text-sm hover:bg-yellow-400 transition-all active:scale-95"
        >
          <Plus size={18} />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center">
            <Loader2 className="animate-spin text-yellow-500 mx-auto" size={32} />
          </div>
        ) : services.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <div className="flex flex-col items-center gap-4 text-white/20">
              <Tag size={48} />
              <p className="text-sm font-bold uppercase tracking-widest">No services found</p>
            </div>
          </div>
        ) : (
          services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 flex flex-col gap-6 group hover:border-yellow-500/30 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl">{service.name_en}</h3>
                  <p className="text-white/40 text-xs mt-1">{service.type}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(service)}
                    className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(service.id)}
                    className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Small</div>
                  <div className="text-sm font-bold text-yellow-500">SAR {service.price_small}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Medium</div>
                  <div className="text-sm font-bold text-yellow-500">SAR {service.price_medium}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">SUV</div>
                  <div className="text-sm font-bold text-yellow-500">SAR {service.price_suv}</div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-2xl font-bold">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Name (English)</label>
                    <input
                      required
                      type="text"
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500/50 transition-all"
                      placeholder="e.g. Basic Wash"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Name (Arabic)</label>
                    <input
                      required
                      type="text"
                      value={formData.name_ar}
                      onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500/50 transition-all"
                      placeholder="غسيل أساسي"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Service Type</label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500/50 transition-all"
                    >
                      <option value="Exterior">Exterior</option>
                      <option value="Interior">Interior</option>
                      <option value="Full">Full Service</option>
                      <option value="Full Detailing">Full Detailing</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Small Car</label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      value={formData.price_small}
                      onChange={(e) => setFormData({ ...formData, price_small: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500/50 transition-all"
                      placeholder="25"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Medium Car</label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      value={formData.price_medium}
                      onChange={(e) => setFormData({ ...formData, price_medium: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500/50 transition-all"
                      placeholder="35"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">SUV</label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      value={formData.price_suv}
                      onChange={(e) => setFormData({ ...formData, price_suv: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500/50 transition-all"
                      placeholder="45"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-yellow-500 text-black rounded-2xl font-bold text-lg hover:bg-yellow-400 transition-all disabled:opacity-30 active:scale-[0.98]"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Service' : 'Add Service'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
