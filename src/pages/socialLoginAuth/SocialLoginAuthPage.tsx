import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LOCATION from 'constants/location';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerAPIErrorResponse } from 'types/Api';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import styles from './socialLoginAuthPage.module.scss';
import classNames from 'classnames/bind';
import useCustomNavigation from 'hooks/useCustomNavigation';
import instance from 'service/instance';
import { fetchUser } from 'service/fetchUser';
const cn = classNames.bind(styles);

type Props = {
  socialType: 'KAKAO' | 'DISCORD';
};

export default function SocialLoginAuthPage({ socialType }: Props) {
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const { navHome } = useCustomNavigation();

  const redirectUri =
    socialType === 'KAKAO'
      ? process.env.REACT_APP_KAKAO_REDIRECT_URL
      : process.env.REACT_APP_DISCORD_REDIRECT_URL;

  async function socialLogin() {
    try {
      await instance.post(`/api/oauth/${socialType.toLowerCase()}`, {
        authorizeCode: code,
        redirectUri,
      });
      await fetchUser();
      navHome();
    } catch (err) {
      if (axios.isAxiosError<ServerAPIErrorResponse>(err) && err.response) {
        setError(err.response.data.message);
      }
      setError(UNKNOWN_NET_ERROR_MESSAGE);
    }
  }

  useEffect(() => {
    if (!code || code.trim() === '') {
      navigate(LOCATION.HOME, { replace: true });
      alert('잘못된 접근입니다.');
    }
    socialLogin();
  }, [code]);

  return error ? (
    <div className={cn('kakaoAuthPage')}>
      <span>{error}</span>
      <button className={'toHomeBtn'} onClick={navHome}>
        홈으로 이동
      </button>
    </div>
  ) : (
    <></>
  );
}