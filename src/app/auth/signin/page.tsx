'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('signup_email');
    if (savedEmail) {
      setEmail(savedEmail);
      localStorage.removeItem('signup_email');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        alert('로그인 성공!');
        router.push('https://autcloud-fe.vercel.app/project');
      } else {
        const data = await res.json();
        alert(`로그인 실패: ${data.error}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('서버 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5FD] flex flex-col">
      {/* 회원가입 */}
      <div className="w-full flex justify-end items-center px-8 py-3 text-sm space-x-3">
        <span className="text-gray-500">회원이 아니신가요?</span>
        <button
          onClick={() => router.push('/auth/signup')}
          className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-100"
        >
          회원가입
        </button>
      </div>

      {/* 로그인 */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white p-10 rounded-lg shadow-sm">
          {/* 로고 + 텍스트 */}
          <div className="flex items-center space-x-2 mb-6">
            <img
              src="/aut-cloud-logo.svg"
              alt="AutCloud logo"
              className="w-8 h-8"
            />
            <h1 className="text-xl font-bold text-[#7868E6]">AutCloud</h1>
          </div>

          {/* 제목 */}
          <h2 className="text-lg font-bold text-black">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7868E6]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7868E6]"
            />
            <div className="text-xs text-[#7868E6] underline cursor-pointer">
              비밀번호 재설정
            </div>

            <button
              type="submit"
              disabled={!email || !password || isLoading}
              className={`w-full mt-5 py-2 rounded-md text-white text-sm font-medium transition-colors duration-200 ${
                email && password && !isLoading
                  ? 'bg-[#7868E6] hover:bg-[#6c5ad9]'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
