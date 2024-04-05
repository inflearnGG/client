import { SummonerBasicData, SummonerInfo } from 'types/summoner';
import { RiotAPIErrorCode } from 'types/Api';
import {
  RIOT_API_ERROR_MESSAGE,
  UNKNOWN_NET_ERROR_MESSAGE,
} from 'constants/api';
import { AxiosResponse } from 'axios';
import { COUNTRY } from 'constants/options';
import isCustomAxiosError from './isCustomAxiosError';
import instance from './instance';
/**
 * 소환사 기본 데이터를 받아오는 함수입니다.
 * @param {string} name - 소환사 이름입니다.
 * @param {string} tag - 소환사 태그입니다.
 * @param {string} country - 소환사 국가입니다.
 * @returns {Promise<SummonerInfo>} - 소환사 정보를 포함하는 프로미스 객체
 */

export default async function getSummonerInfo(
  name: string,
  tag: string,
  country: string,
): Promise<SummonerInfo> {
  try {
    // 소환사 계정 정보입니다.
    const region = COUNTRY.find((c) => c.key === country)?.region || '';
    const summonerInfoRes: AxiosResponse<SummonerBasicData> =
      await instance.get(
        `/api/summoner/info?gameName=${name}&tagLine=${tag}&region=${region}`,
      );

    const summonerInfo: SummonerInfo = {
      ...summonerInfoRes.data,
      region,
    };
    return summonerInfo;
  } catch (err) {
    if (isCustomAxiosError(err)) {
      console.log('에러 감지');
      const errorCode = err.response?.data.status;
      const errorMessage =
        RIOT_API_ERROR_MESSAGE[errorCode as RiotAPIErrorCode];
      throw new Error(errorMessage);
    }
    throw Object.assign(new Error(), UNKNOWN_NET_ERROR_MESSAGE);
  }
}
