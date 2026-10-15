import { useState } from 'react';
import { TreePine, Eye, EyeOff } from 'lucide-react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('admin@timberflow.id');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#166534] via-[#15803d] to-[#14532d] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
            <TreePine className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">TimberFlow</h1>
          <p className="text-green-100 mt-1">Sistem Manajemen Trader Kayu Lapis</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Masuk ke Akun Anda</h2>
            <p className="text-sm text-gray-500 mt-1">Silakan masukkan kredensial untuk melanjutkan</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 bg-[#166534] text-white rounded-lg text-sm font-medium hover:bg-[#14532d]">
              Masuk
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400 mb-2">Demo Credentials</p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 space-y-1">
              <p><strong>Email:</strong> admin@timberflow.id</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
