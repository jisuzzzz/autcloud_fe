'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 회원가입 후 저장된 이메일 자동 채워넣기
  useEffect(() => {
    const savedEmail = sessionStorage.getItem('signup_email');
    if (savedEmail) {
      setEmail(savedEmail);
      sessionStorage.removeItem('signup_email');
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (result.success) {
        alert('로그인 성공!');
        router.push('/');
      } else {
        alert(`로그인 실패: ${result.error}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('서버 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 회원가입 안내 */}
      <div className="w-full flex justify-end items-center px-8 py-3 text-sm space-x-4">
        <span className="text-gray-400 leading-none">회원이 아니신가요?</span>
        <button
          onClick={() => router.push('/signup')}
          className="border border-gray-300 px-3 py-1 rounded text-sm"
        >
          회원가입
        </button>
      </div>

      {/* 로그인 영역 */}
      <div className="flex flex-col items-center justify-center px-4 min-h-[calc(100vh-80px)]">
        <div className="w-[320px] mx-auto">
          {/* 로고 */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 font-semibold">
              Logo
            </div>
          </div>

          <h2 className="text-center text-2xl font-medium mb-6">Sign in</h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[300px] border border-gray-300 rounded px-4 py-2 placeholder-gray-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[300px] border border-gray-300 rounded px-4 py-2 placeholder-gray-400"
              required
            />

            {/* 비밀번호 재설정 링크 */}
            <div className="w-[300px] text-left text-sm text-gray-600 underline cursor-pointer">
              비밀번호 재설정
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className={`w-[300px] text-white py-2 rounded transition-colors duration-200 ${
                email && password
                  ? 'bg-black hover:bg-gray-900 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!email || !password || isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
