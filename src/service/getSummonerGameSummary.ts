import { SummonerGameSummary, SummaryQueueType } from './../types/summoner';
import { ServerAPIErrorResponse } from 'types/Api';
import axiosInstance from './instance';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import axios from 'axios';

export default async function getSummonerGameSummary(
  summonerId: string,
  queueType: SummaryQueueType,
): Promise<SummonerGameSummary> {
  try {
    const summaryRes = await axiosInstance.get<SummonerGameSummary>(
      `${process.env.REACT_APP_SERVER_URL}/api/matches/summary`,
      {
        headers: {
          summonerId,
          queueType,
        },
      },
    );
    return summaryRes.data;
  } catch (err) {
    if (axios.isAxiosError<ServerAPIErrorResponse>(err) && err.response) {
      throw err.response.data.error;
    }
    throw UNKNOWN_NET_ERROR_MESSAGE;
  }
}