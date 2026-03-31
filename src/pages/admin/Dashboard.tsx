import React, { useState, useEffect } from 'react';
import { Users, Activity, DollarSign, Clock, Store, TrendingUp, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import api from '../../lib/api';

interface DashboardStats {
  activeUsers: number;
  totalWashes: number;
  platformRevenue: number;
  commissionEarned: number;
  totalCustomers: number;
  totalBusinesses: number;
}

interface ChartData {
  month: string;
  total_collected: number;
  total_receivables: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, chartRes] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/admin/financial-analysis')
      ]);
      setStats(statsRes.data);
      setChartData(chartRes.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#f5a623]" size={32} />
      </div>
    );
  }

  const statCards = [
    { name: 'Active Users', value: stats.activeUsers, icon: Users, color: 'text-white' },
    { name: 'Platform Washes', value: stats.totalWashes, icon: Activity, color: 'text-white' },
    { name: 'Total Collected SAR', value: Number(stats.platformRevenue).toLocaleString(), icon: DollarSign, color: 'text-[#f5a623]' },
    { name: 'Total Receivables SAR', value: Number(stats.commissionEarned).toLocaleString(), icon: Clock, color: 'text-white' },
    { name: 'Total Customers', value: stats.totalCustomers, icon: Users, color: 'text-white' },
    { name: 'Total Companies', value: stats.totalBusinesses, icon: Store, color: 'text-white' },
  ];

  return (
    <div className="space-y-8 animate-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
          <p className="text-slate-400 mt-1">Platform performance and financial summary</p>
        </div>
      </div>

      {/* 2x3 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="glass-card p-6 flex items-center gap-5 group hover:border-[#f5a623]/30 transition-all">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#f5a623]/10 transition-colors">
                <Icon className="text-[#f5a623]" size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.name}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Financial Analysis Chart */}
      <div className="glass-card p-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white">Financial Analysis</h2>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">MONTHLY PERFORMANCE COMPARISON</p>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `SAR ${value}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
              <Line 
                type="monotone" 
                dataKey="total_collected" 
                name="Total Collected"
                stroke="#f5a623" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#f5a623', strokeWidth: 2, stroke: '#1a1a1a' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="total_receivables" 
                name="Total Receivables"
                stroke="#64748b" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#64748b', strokeWidth: 2, stroke: '#1a1a1a' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
