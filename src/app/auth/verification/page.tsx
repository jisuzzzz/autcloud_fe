'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function VerificationPage() {
  const router = useRouter();
  const [code, setCode] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const email =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('signup_email') || ''
      : '';

  const handleInputChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const joinedCode = code.join('');
    if (joinedCode.length < 6) {
      setError('6자리 인증번호를 입력해주세요.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verification/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verification_code: joinedCode }),
      });
      const result = await res.json();
      if (result.success) {
        router.push('/project');
      } else {
        setError(result.error || '인증 실패');
      }
    } catch (err) {
      console.error(err);
      setError('서버 오류');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 안내 & 로그인 */}
      <div className="w-full flex justify-end items-center px-8 py-3 text-sm space-x-4">
        <span className="text-gray-400 leading-none">로그인 안내 문구</span>
        <button
          onClick={() => router.push('/auth/signin')}
          className="border border-gray-300 px-3 py-1.5 rounded text-sm"
        >
          로그인
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-[320px] text-center">
          {/* Logo */}
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded flex items-center justify-center text-gray-400 font-bold">
            Logo
          </div>

          <h2 className="text-xl font-medium mb-2">Title</h2>
          <p className="text-sm text-gray-600 mb-8">
            가입하신 이메일 주소로 인증번호를 보냈습니다.
            <br />
            받으신 인증번호를 입력해주세요.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 flex flex-col items-center"
          >
            {/* 인증번호 6자리 입력 */}
            <div className="flex justify-center gap-2">
              {code.map((value, index) => (
                <input
                  key={index}
                  ref={(el: HTMLInputElement | null) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center border border-gray-300 rounded text-xl"
                />
              ))}
            </div>

            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

            {/* 인증하기 버튼 */}
            <button
              type="submit"
              className={`w-[300px] h-11 rounded text-white text-sm font-medium ${
                code.every((c) => c)
                  ? 'bg-black hover:bg-gray-900'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!code.every((c) => c) || loading}
            >
              인증하기
            </button>

            {/* 재전송 */}
            <button
              type="button"
              className="w-[300px] h-11 border border-gray-300 rounded font-semibold text-sm"
              onClick={() => alert('인증번호 재전송 기능은 추후 구현')}
            >
              인증번호 다시 보내기
            </button>

            <button
              type="button"
              className="text-sm text-gray-500 mt-2"
              onClick={() => router.back()}
            >
              뒤로가기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
