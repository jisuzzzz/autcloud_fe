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
    'w-full border border-gray-300 rounded-md px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7868E6]';

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
    <div className="min-h-screen bg-[#F6F5FD] flex flex-col">
      {/* 로그인 */}
      <div className="w-full flex justify-end items-center px-8 py-3 text-sm space-x-4">
        <span className="text-gray-500">이미 계정이 있으신가요?</span>
        <button
          onClick={() => router.push('/auth/signin')}
          className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-100"
        >
          로그인
        </button>
      </div>

      {/* 회원가입 폼 */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white p-10 mb-10 rounded-lg shadow-sm">
          {/* 로고 */}
          <div className="flex items-center space-x-2 mb-6">
            <img
              src="/aut-cloud-logo.svg"
              alt="AutCloud logo"
              className="w-8 h-8"
            />
            <h1 className="text-xl font-bold text-[#7868E6]">AutCloud</h1>
          </div>

          {/* 제목 */}
          <h2 className="text-lg font-bold text-black">Get started</h2>
          <p className="text-sm text-gray-500 mb-6">Create a new account</p>

          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
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

            {/* 비밀번호 */}
            <div className="relative">
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
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* 비밀번호 확인 */}
            <div className="relative">
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
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* 비밀번호 불일치 메시지 */}
            {form.password &&
              form.confirmPassword &&
              form.password !== form.confirmPassword && (
                <p className="text-sm text-red-500">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}

            {/* 전체 동의 */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="agreeAll"
                checked={form.agreeAll}
                onChange={handleChange}
                className="w-4 h-4 accent-[#7868E6]"
              />
              <label className="text-sm text-gray-800">
                약관에 전체 동의 (선택 사항 포함)
              </label>
            </div>

            {/* 약관 펼치기 */}
            <div
              className="text-sm text-gray-800 cursor-pointer select-none flex justify-between items-center"
              onClick={toggleTerms}
            >
              <span>모두 보기</span>
              <span className="text-xs">{form.termsOpen ? '▲' : '▼'}</span>
            </div>

            {/* 약관 항목 */}
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
                            className="accent-[#7868E6] mr-1"
                          />
                          {val === 'yes' ? '네' : '아니오'}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={!isFilled || isLoading}
              className={`w-full mt-5 flex items-center justify-center gap-2 text-white py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isFilled && !isLoading
                  ? 'bg-[#7868E6] hover:bg-[#6c5ad9]'
                  : 'bg-gray-300 cursor-not-allowed'
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
