import 'chart.js/auto';
import styles from './summonerGameSummaryContainer.module.scss';
import { Lane, SummonerGameSummary } from 'types/summoner';
import classNames from 'classnames/bind';
import { SummaryQueueType } from 'types/summoner';
import RankSummaryQueueTypeTab from './GameSummaryQueueTypeTab';
import { Doughnut } from 'react-chartjs-2';
import useOptionSelector from 'hooks/useOptionSelector';
import LaneSelector from 'components/laneSelector/LaneSelector';
import { useEffect, useState } from 'react';
import { SummaryChampionStats } from 'types/summoner';
import ChampionTag from './ChampionTag';
import URL from 'constants/url';
const cn = classNames.bind(styles);

type Props = {
  summonerGameSummary: SummonerGameSummary;
  summaryQueueType: SummaryQueueType;
  setSummaryQueueType: React.Dispatch<React.SetStateAction<SummaryQueueType>>;
};

export default function SummonerGameSummaryContainer({
  summonerGameSummary,
  summaryQueueType,
  setSummaryQueueType,
}: Props) {
  const { info, lane } = summonerGameSummary;
  const [summaryLaneOption, setSummaryLaneOption] = useOptionSelector({
    type: 'singular',
    defaultOptions: ['ALL'],
  });

  const currentDetailsLane = summaryLaneOption[0] as Lane;
  const detailData = lane[currentDetailsLane];
  const laneKey = Object.keys(lane) as Lane[];
  const disableLane = laneKey.filter(
    (key) => lane[key].mostChampionlist.length <= 0,
  );
  const [currentDetailChampion, setCurrentDetailChampion] =
    useState<SummaryChampionStats | null>(
      disableLane.includes(currentDetailsLane)
        ? null
        : detailData.mostChampionlist[0],
    );

  useEffect(() => {
    setSummaryLaneOption('ALL');
    setCurrentDetailChampion(detailData.mostChampionlist[0]);
  }, [summaryQueueType]);

  useEffect(() => {
    setCurrentDetailChampion(detailData.mostChampionlist[0]);
  }, [summaryLaneOption]);

  const infoWinningRateData = {
    labels: [],
    datasets: [
      {
        data: [parseInt(info.winningRate), 100 - parseInt(info.winningRate)],
        backgroundColor: ['#4c97ff', '#2f2f2f'],
        borderColor: ['transparent'],
        cutout: '70%',
      },
    ],
  };
  const gameCntChartColor = (lane: Lane) =>
    summaryLaneOption[0] === lane || summaryLaneOption[0] === 'ALL'
      ? '#4c97ff'
      : '#2f2f2f';
  const detailGameCntData = {
    labels: [],
    datasets: [
      {
        data: [
          lane.TOP.cntGame,
          lane.JUG.cntGame,
          lane.MID.cntGame,
          lane.ADC.cntGame,
          lane.SUP.cntGame,
        ],
        backgroundColor: [
          gameCntChartColor('TOP'),
          gameCntChartColor('JUG'),
          gameCntChartColor('MID'),
          gameCntChartColor('ADC'),
          gameCntChartColor('SUP'),
        ],
        borderColor: ['transparent'],
        cutout: '80%',
      },
    ],
  };

  const options = {
    responsive: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
      hover: { mode: null },
    },
  };

  const renderInfoLaneImage = (lane: string) => {
    return lane ? (
      <img src={URL.laneIcon(lane)} alt="선호 라인" />
    ) : (
      <span>데이터 없음</span>
    );
  };

  return (
    <div className={cn('summaryContainer')}>
      <RankSummaryQueueTypeTab
        summaryQueueType={summaryQueueType}
        setSummaryQueueType={setSummaryQueueType}
      />
      <div className={cn('summary')}>
        <div className={cn('informationContainer')}>
          <h5>정보</h5>
          <div className={cn('infomations')}>
            <div className={cn('winningRateChartContainer')}>
              <Doughnut data={infoWinningRateData} options={options} />
              <div className={cn('chartDetail')}>
                <span className={cn('infoWinningRate')}>
                  {info.winningRate}
                </span>
                <div>
                  <span className={cn('infoWins')}>{info.wins}승</span>
                  <span className={cn('infoLoses')}>{info.loses}패</span>
                </div>
              </div>
            </div>
            <div className={cn('infoDivider')}></div>
            <div className={cn('infoDataContainer')}>
              <span className={cn('infoKDA')}>KDA {info.kda}</span>
              <div className={cn('infoKDS')}>
                <span>{info.killAvg} /</span>
                <span className={cn('infoDeathAvg')}> {info.deathAvg} </span>
                <span>/ {info.assistAvg}</span>
              </div>
              <div className={cn('infoLane')}>
                <div>
                  {renderInfoLaneImage(info.mostLane)}
                  <h6>모스트 라인</h6>
                </div>
                <div>
                  {renderInfoLaneImage(info.subLane)}
                  <h6>서브 라인</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* disableLane.includes(currentDetailsLane) */}
        <div className={cn('detailsContainer')}>
          <h5>라인별 상세정보</h5>
          <div className={cn('details')}>
            <LaneSelector
              options={summaryLaneOption}
              onChange={setSummaryLaneOption}
              size={30}
              disableLane={disableLane}
            />
            {disableLane.includes(currentDetailsLane) ? (
              <div className={cn('detailDataNotFound')}>
                데이터가 존재하지 않습니다
              </div>
            ) : (
              <>
                <div className={cn('detailsTop')}>
                  <div className={cn('mostChampions')}>
                    {currentDetailChampion &&
                      detailData.mostChampionlist.map((champion) => (
                        <ChampionTag
                          currentDetailChampion={currentDetailChampion}
                          setCurrentDetailChampion={setCurrentDetailChampion}
                          key={champion.championName}
                          champion={champion}
                        />
                      ))}
                  </div>
                  <div className={cn('detailGameCntChartContainer')}>
                    <Doughnut
                      data={detailGameCntData}
                      options={{
                        ...options,
                        aspectRatio: 0.1,
                      }}
                      width={400}
                      height={200}
                    />
                    <div className={cn('chartDetail')}>
                      <span>{summaryLaneOption[0]}</span>
                      <span>{detailData.cntGame} 게임</span>
                    </div>
                  </div>
                </div>
                <div className={cn('detailData')}>
                  <div>
                    <span>{currentDetailChampion?.csPerMinute}</span>
                    <span>분당 CS</span>
                  </div>
                  <div>
                    <span>{currentDetailChampion?.kda}</span>
                    <span>시야 점수</span>
                  </div>
                  <div>
                    <span>{currentDetailChampion?.winningRate}</span>
                    <span>승률</span>
                  </div>
                  <div>
                    <span>{currentDetailChampion?.killParticipation}</span>
                    <span>킬 관여율</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
