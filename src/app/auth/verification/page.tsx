'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function VerificationPage() {
  const router = useRouter();
  const [code, setCode] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(300);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const email =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('signup_email') || ''
      : '';

  useEffect(() => {
    if (resendDisabled && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [resendDisabled, timer]);

  useEffect(() => {
    if (timer <= 0) {
      setResendDisabled(false);
    }
  }, [timer]);

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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    if (pasted.length === 6) {
      const newCode = pasted.split('');
      setCode(newCode);
      setTimeout(() => inputsRef.current[5]?.focus(), 0);
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
      const res = await fetch('/api/auth/verification', {
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

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full flex justify-end items-center px-8 py-3 text-sm space-x-4">
        <span className="text-gray-400 leading-none">
          이미 계정이 있으신가요?
        </span>
        <button
          onClick={() => router.push('/auth/signin')}
          className="border border-gray-300 px-3 py-1.5 rounded text-sm"
        >
          로그인
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-[320px] text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded flex items-center justify-center text-gray-400 font-bold">
            Logo
          </div>

          <h2 className="text-xl font-medium mb-2">이메일 인증</h2>
          <p className="text-sm text-gray-600 mb-4">
            가입하신 이메일 주소로 인증번호를 보냈습니다.
            <br />
            받으신 인증번호를 입력해주세요.
          </p>

          <div className="mb-4 text-sm text-gray-500">
            남은 시간: <span className="font-mono">{formatTimer(timer)}</span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 flex flex-col items-center"
          >
            <div className="flex justify-center gap-2">
              {code.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center border border-gray-300 rounded text-xl"
                />
              ))}
            </div>

            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

            <button
              type="submit"
              className={`w-[300px] h-11 flex items-center justify-center gap-2 rounded text-white text-sm font-medium ${
                code.every((c) => c)
                  ? 'bg-black hover:bg-gray-900'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!code.every((c) => c) || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  인증 중...
                </>
              ) : (
                '인증하기'
              )}
            </button>

            <button
              type="button"
              className={`w-[300px] h-11 border rounded text-sm font-semibold ${
                resendDisabled
                  ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'text-black border-gray-300 hover:bg-gray-100'
              }`}
              disabled={resendDisabled}
              onClick={() => {
                setResendDisabled(true);
                setTimer(300);
                alert('인증번호를 다시 보냈습니다. (가정)');
              }}
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
