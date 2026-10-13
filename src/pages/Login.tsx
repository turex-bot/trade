import { useState } from 'react';
import { TreePine, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('admin@timberflow.id');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#166534] rounded-2xl mb-4 shadow-lg shadow-[#166534]/20">
            <TreePine className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-[24px] font-bold text-[#0f172a] tracking-tight">TimberFlow</h1>
          <p className="text-[13px] text-[#64748b] mt-1">Sistem Manajemen Trader Kayu Lapis</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-7">
          <div className="mb-6">
            <h2 className="text-[17px] font-semibold text-[#0f172a]">Masuk ke Akun Anda</h2>
            <p className="text-[13px] text-[#64748b] mt-1">Silakan masukkan kredensial untuk melanjutkan</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#334155] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="email@timberflow.id"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#334155] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#e2e8f0] text-[#166534] focus:ring-[#166534] focus:ring-offset-0" />
                <span className="text-[12px] text-[#64748b]">Ingat saya</span>
              </label>
              <button type="button" className="text-[12px] text-[#166534] font-medium hover:underline">
                Lupa password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#166534] text-white rounded-lg text-[13px] font-medium hover:bg-[#14532d] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 pt-5 border-t border-[#f1f5f9]">
            <p className="text-[11px] text-center text-[#94a3b8] mb-2">Demo Credentials</p>
            <div className="bg-[#f8fafc] rounded-lg p-3 text-[12px] text-[#64748b] space-y-1 border border-[#f1f5f9]">
              <p><strong className="text-[#334155]">Email:</strong> admin@timberflow.id</p>
              <p><strong className="text-[#334155]">Password:</strong> admin123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-[#94a3b8] mt-6">
          © 2025 TimberFlow. Sistem Manajemen Trader Kayu Lapis.
        </p>
      </div>
    </div>
  );
}
