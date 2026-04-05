import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Car } from 'lucide-react';
import api from '../lib/api';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const [loginType, setLoginType] = useState<'personal' | 'business'>('personal');
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent double submission

  const completeLogin = (user: any) => {
    console.log('Completing login for user role:', user.role);
    
    // Store role separately for quick access
    localStorage.setItem('role', user.role);
    
    // Small delay to ensure localStorage is saved before navigation
    setTimeout(() => {
      if (user.role === 'super_admin') {
        window.location.href = '/admin';
      } else if (user.role === 'business_owner' || user.role === 'business') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/app';
      }
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent any default form behavior
    
    // Prevent double submission
    if (isSubmitting || loading) {
      console.log('Already submitting, ignoring...');
      return;
    }
    
    console.log('=== FORM SUBMISSION STARTED ===');
    setIsSubmitting(true);
    setError('');
    setLoading(true);

    try {
      console.log('=== LOGIN ATTEMPT ===');
      console.log('Login type:', loginType);
      console.log('Phone:', phone);
      console.log('Password:', password ? '***' : 'empty');
      
      const res = await api.post('/auth/login', { 
        phone, 
        password,
        type: loginType 
      });
      
      console.log('=== LOGIN RESPONSE ===');
      console.log('Full response:', res);
      console.log('Response data:', res.data);
      
      const { token, user } = res.data;

      if (!token || !user) {
        console.error('Missing token or user in response');
        throw new Error('Invalid response from server');
      }

      if (!user.role) {
        console.error('User role missing:', user);
        throw new Error('User role is missing from response');
      }

      console.log('=== STORING AUTH DATA ===');
      console.log('Token:', token ? 'present' : 'missing');
      console.log('User:', user);
      console.log('Role:', user.role);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', user.role);
      
      console.log('=== AUTH DATA STORED ===');
      console.log('Stored role:', localStorage.getItem('role'));
      console.log('Stored user:', localStorage.getItem('user'));

      console.log('=== NAVIGATING TO:', user.role, '===');
      completeLogin(user);
    } catch (err: any) {
      console.error('=== LOGIN ERROR ===');
      console.error('Error object:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      
      const errorMessage = err.response?.data?.message || err.message || t('loginFailed');
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
      console.log('=== FORM SUBMISSION ENDED ===');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="card w-full max-w-[400px] mx-auto">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-4">
            <img 
              src="https://carwash-h7df.vercel.app/assets/icon.png" 
              alt="Clean Cars 360 Icon" 
              className="h-12 w-12 object-contain"
            />
            <img 
              src="https://i.ibb.co/0VjChkSD/1000071664-removebg-preview.png" 
              alt="360Cars" 
              className="h-12 object-contain"
            />
          </div>
        </div>

        <div className="flex p-1.5 bg-black rounded-2xl mb-8 border border-white/10 shadow-inner shadow-white/5">
          <button 
            onClick={() => setLoginType('personal')}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
              loginType === 'personal' 
                ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20" 
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {t('loginPersonal')}
          </button>
          <button 
            onClick={() => setLoginType('business')}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
              loginType === 'business' 
                ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20" 
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {t('loginBusiness')}
          </button>
        </div>

        {error && (
          <div className="bg-red-400/10 text-red-400 p-4 rounded-xl text-xs mb-6 text-center border border-red-400/20 animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">{t('phoneNumber')}</label>
            <input 
              type="tel" 
              placeholder="05xxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all placeholder:text-slate-700"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">{t('password')}</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all placeholder:text-slate-700"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-widest transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/10 active:scale-[0.98]"
          >
            {loading ? t('signingIn') : t('signIn')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            {t('dontHaveAccount')} <Link to="/register" className="text-yellow-400 font-bold hover:underline">{t('register')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
