'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('agreement.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        agreement: {
          ...prev.agreement,
          [key]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
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

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone_num: '01000000000',
        }),
      });

      const result = await res.json();

      if (result.success) {
        sessionStorage.setItem('signup_email', form.email);
        router.push('/verification');
      } else if (result.userExists) {
        alert('이미 가입된 이메일입니다. 로그인 페이지로 이동합니다.');
        sessionStorage.setItem('signup_email', form.email);
        router.push('/login');
      } else {
        alert(`오류: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    }
  };

  const isFilled =
    form.name &&
    form.email &&
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full flex justify-end items-center px-8 py-3 text-sm space-x-4">
        <span className="text-gray-400 leading-none">로그인 안내 문구</span>
        <button
          onClick={() => router.push('/login')}
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
              className="w-[300px] border border-gray-300 rounded px-4 py-2 placeholder-gray-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-[300px] border border-gray-300 rounded px-4 py-2 placeholder-gray-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-[300px] border border-gray-300 rounded px-4 py-2 placeholder-gray-400"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-[300px] border border-gray-300 rounded px-4 py-2 placeholder-gray-400"
              required
            />
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
                <div>
                  <p>
                    (필수) <u>개인정보 수집 및 이용</u>에 동의합니다.
                  </p>
                  <div className="flex gap-4 mt-1">
                    <label>
                      <input
                        type="radio"
                        name="agreement.privacy"
                        value="yes"
                        checked={form.agreement.privacy === 'yes'}
                        onChange={handleChange}
                        className="accent-black mr-1"
                      />
                      네
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="agreement.privacy"
                        value="no"
                        checked={form.agreement.privacy === 'no'}
                        onChange={handleChange}
                        className="accent-black mr-1"
                      />
                      아니오
                    </label>
                  </div>
                </div>

                <div>
                  <p>
                    (필수){' '}
                    <Link href="/terms" className="underline text-black">
                      이용약관
                    </Link>{' '}
                    에 동의합니다.
                  </p>
                  <div className="flex gap-4 mt-1">
                    <label>
                      <input
                        type="radio"
                        name="agreement.terms"
                        value="yes"
                        checked={form.agreement.terms === 'yes'}
                        onChange={handleChange}
                        className="accent-black mr-1"
                      />
                      네
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="agreement.terms"
                        value="no"
                        checked={form.agreement.terms === 'no'}
                        onChange={handleChange}
                        className="accent-black mr-1"
                      />
                      아니오
                    </label>
                  </div>
                </div>

                <div>
                  <p>(선택) 마케팅 정보 수신에 동의합니다.</p>
                  <div className="flex gap-4 mt-1">
                    <label>
                      <input
                        type="radio"
                        name="agreement.marketing"
                        value="yes"
                        checked={form.agreement.marketing === 'yes'}
                        onChange={handleChange}
                        className="accent-black mr-1"
                      />
                      네
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="agreement.marketing"
                        value="no"
                        checked={form.agreement.marketing === 'no'}
                        onChange={handleChange}
                        className="accent-black mr-1"
                      />
                      아니오
                    </label>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className={`w-[300px] text-white py-2 rounded ${
                isFilled
                  ? 'bg-black hover:bg-gray-900'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={!isFilled}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
