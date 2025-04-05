'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 바 */}
      <div className="w-full flex justify-between items-center px-6 py-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push('/auth/signup')}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm text-gray-700">
            회원가입 과정으로 돌아가시겠습니까?
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400 leading-none">로그인 안내 문구</span>
          <button
            onClick={() => router.push('/auth/signin')}
            className="border border-gray-300 px-3 py-1 rounded text-sm"
          >
            로그인
          </button>
        </div>
      </div>

      {/* 본문 영역 */}
      <div className="flex flex-col items-center justify-center px-4 flex-1">
        <div className="w-full max-w-2xl">
          {/* 제목 */}
          <h1 className="text-2xl font-semibold mb-2">서비스 이용약관</h1>
          <p className="text-sm text-gray-500 mb-6">
            [2021/10/31 개정] 도다툴 서비스 이용 약관
          </p>

          {/* 본문 내용 */}
          <div className="text-sm text-gray-800 space-y-6">
            <div>
              <p className="font-bold mb-1">제 1 장 총칙</p>
              <p className="mb-2 font-semibold">제 1조 (목적)</p>
              <p>
                이 약관은 주식회사 도다마인드(이하 "회사")가 운영하는
                도다툴(http://doda.app 이하 "도다툴") 서비스를 이용함에 있어
                회원과 회사 간의 권리, 의무, 책임사항 및 회원의 서비스 이용절차
                등에 관한 사항을 규정함을 목적으로 합니다.
              </p>
            </div>

            <div>
              <p className="mb-2 font-semibold">제 2조 (용어의 정의)</p>
              <ul className="bg-gray-50 border rounded-md px-4 py-3 space-y-1">
                <li>
                  1. 서비스: 도다툴에서 제공하거나 도다툴과 직접 연동되어
                  온라인으로 제공되는 서비스.
                </li>
                <li>
                  2. 이용자: 이 약관에 따라 회사가 제공하는 서비스를 받는 회원과
                  비회원.
                </li>
                <li>
                  3. 회원: 회사에 가입하지 않고 회사가 제공하는 서비스를
                  이용하는 자를 말합니다.
                </li>
                <li>
                  4. 아이디(ID): 회원의 식별과 서비스 이용을 위해 설정한 이메일
                  또는 문자 조합.
                </li>
                <li>
                  5. 비밀번호: 회원의 정보를 보호하기 위해 설정한 문자/숫자
                  조합.
                </li>
                <li>
                  6. 운영자: 서비스의 전반적인 운영을 위해 회사에서 지정한 자.
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-2 font-semibold">
                제 3조 (적용 범위 및 효력 순위)
              </p>
              <p>
                이 약관은 도다툴의 모든 서비스에 적용되며, 관련 법령 및 일반적
                거래관행을 따릅니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
