'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeAll: false,
    termsOpen: false,
    agreement: {
      privacy: 'yes',
      terms: 'yes',
      marketing: 'yes',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputStyle =
    'w-[300px] border border-gray-300 rounded px-4 py-2 placeholder-gray-400';

  // 세션 스토리지에서 값 복원
  useEffect(() => {
    const saved = sessionStorage.getItem('signup_form');
    if (saved) {
      const parsed = JSON.parse(saved);
      setForm((prev) => ({
        ...prev,
        ...parsed,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    let updatedForm = {};
    if (name.startsWith('agreement.')) {
      const key = name.split('.')[1];
      updatedForm = {
        agreement: {
          ...form.agreement,
          [key]: value,
        },
      };
    } else {
      updatedForm = {
        [name]: type === 'checkbox' ? checked : value,
      };
    }

    const newForm = {
      ...form,
      ...updatedForm,
    };

    setForm(newForm);

    // 형식 맞는 값만 저장
    const { name: n, email, phone, password, confirmPassword } = newForm;
    if (n && email && phone && password && confirmPassword) {
      sessionStorage.setItem(
        'signup_form',
        JSON.stringify({ name: n, email, phone })
      );
    }
  };

  const toggleTerms = () => {
    setForm((prev) => ({
      ...prev,
      termsOpen: !prev.termsOpen,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.agreement.privacy !== 'yes' || form.agreement.terms !== 'yes') {
      alert('필수 약관에 동의해야 합니다.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone_num: form.phone,
        }),
      });

      const result = await res.json();

      if (result.success) {
        sessionStorage.setItem('signup_email', form.email);
        sessionStorage.setItem('signup_name', form.name);
        sessionStorage.removeItem('signup_form');
        router.push('/auth/verification');
      } else if (result.userExists) {
        alert('이미 가입된 이메일입니다. 로그인 페이지로 이동합니다.');
        sessionStorage.setItem('signup_email', form.email);
        router.push('/auth/signin');
      } else {
        alert(`오류: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    } finally {
      setIsLoading(false);
    }
  };

  const isFilled =
    form.name &&
    form.email &&
    form.phone &&
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full flex justify-end items-center px-8 py-3 text-sm space-x-4">
        <span className="text-gray-400 leading-none">
          이미 계정이 있으신가요?
        </span>
        <button
          onClick={() => router.push('/auth/signin')}
          className="border border-gray-300 px-3 py-1 rounded text-sm"
        >
          로그인
        </button>
      </div>

      <div className="flex flex-col items-center justify-center px-4 min-h-[calc(100vh-80px)]">
        <div className="w-[320px] mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 font-semibold">
              Logo
            </div>
          </div>

          <h2 className="text-center text-2xl font-medium mb-6">Sign up</h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={inputStyle}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className={inputStyle}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            <div className="relative w-[300px]">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                className={`${inputStyle} pr-10`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative w-[300px]">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`${inputStyle} pr-10`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {form.password &&
              form.confirmPassword &&
              form.password !== form.confirmPassword && (
                <p className="text-sm text-red-500 w-[300px]">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}

            <div className="flex items-center space-x-2 w-[300px]">
              <input
                type="checkbox"
                name="agreeAll"
                checked={form.agreeAll}
                onChange={handleChange}
                className="w-4 h-4 accent-black"
              />
              <label className="text-sm text-gray-800">
                약관에 전체 동의 (선택 사항 포함)
              </label>
            </div>

            <div
              className="text-sm text-gray-800 cursor-pointer select-none flex justify-between items-center w-[300px]"
              onClick={toggleTerms}
            >
              <span>모두 보기</span>
              <span className="text-xs">{form.termsOpen ? '▲' : '▼'}</span>
            </div>

            {form.termsOpen && (
              <div className="space-y-3 text-sm text-gray-700">
                {[
                  {
                    label: '(필수) 개인정보 수집 및 이용에 동의합니다.',
                    name: 'privacy',
                  },
                  {
                    label: (
                      <>
                        (필수){' '}
                        <Link
                          href="/auth/terms"
                          className="underline text-black"
                        >
                          이용약관
                        </Link>{' '}
                        에 동의합니다.
                      </>
                    ),
                    name: 'terms',
                  },
                  {
                    label: '(선택) 마케팅 정보 수신에 동의합니다.',
                    name: 'marketing',
                  },
                ].map(({ label, name }) => (
                  <div key={name}>
                    <p>{label}</p>
                    <div className="flex gap-4 mt-1">
                      {['yes', 'no'].map((val) => (
                        <label key={val}>
                          <input
                            type="radio"
                            name={`agreement.${name}`}
                            value={val}
                            checked={
                              form.agreement[
                                name as keyof typeof form.agreement
                              ] === val
                            }
                            onChange={handleChange}
                            className="accent-black mr-1"
                          />
                          {val === 'yes' ? '네' : '아니오'}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={!isFilled || isLoading}
              className={`w-[300px] flex items-center justify-center gap-2 text-white py-2 rounded ${
                isFilled && !isLoading
                  ? 'bg-black hover:bg-gray-900'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Signing up...
                </>
              ) : (
                'Sign up'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
