import React from 'react';
import styles from './matchCard.module.scss';
import classNames from 'classnames/bind';
import { MatchData } from 'types/summoner';
import CustomTooltip from 'components/tooltip/CustomTooltip';

const cn = classNames.bind(styles);
type Props = {
  matchData: MatchData;
};
export default function MatchTotalDataContainer({ matchData }: Props) {
  console.log(matchData);
  return (
    <div className={cn('matchTotalData')}>
      <Objectives objectives={matchData.red.objectives} team="blue" />
      <div className={cn('totalData')}>
        <div className={cn('totalKill')}>
          <span>Total Kill</span>
          <div
            style={{ flex: matchData.blue.totalKills }}
            className={cn('blue')}
          >
            {matchData.blue.totalKills}
          </div>
          <div style={{ flex: matchData.red.totalKills }} className={cn('red')}>
            {matchData.red.totalKills}
          </div>
        </div>
        <div className={cn('totalGold')}>
          <span>Total Gold</span>
          <div
            style={{ flex: matchData.blue.totalGold }}
            className={cn('blue')}
          >
            {matchData.blue.totalGold}
          </div>
          <div style={{ flex: matchData.red.totalGold }} className={cn('red')}>
            {matchData.red.totalGold}
          </div>
        </div>
      </div>
      <Objectives objectives={matchData.blue.objectives} team="red" />
    </div>
  );
}

type ObjProps = {
  objectives: {
    baron: number;
    dragon: number;
    horde: number;
    inhibitor: number;
    riftHerald: number;
    tower: number;
  };
  team: 'blue' | 'red';
};
function Objectives({ objectives, team }: ObjProps) {
  const { baron, dragon, horde, inhibitor, riftHerald, tower } = objectives;
  return (
    <div className={cn('objectives')}>
      <CustomTooltip name="baron" body="바론">
        <div className={cn('objective', team)}>
          <svg>
            <path d="M12 4L10 0L16 4L14 8L11 16L10 15H6L5 16L2 8L0 4L6 0L4 4L5 5H7L8 4L9 5H11L12 4ZM7 8C7 7.44695 7.4481 7 8 7C8.55284 7 9 7.44695 9 8C9 8.55211 8.55284 9 8 9C7.4481 9 7 8.55211 7 8ZM9 10C9 9.4481 9.44716 9 10 9C10.5528 9 11 9.4481 11 10C11 10.5519 10.5528 11 10 11C9.44716 11 9 10.5519 9 10ZM8 11C7.4481 11 7 11.4479 7 12C7 12.5531 7.4481 13 8 13C8.55284 13 9 12.5531 9 12C9 11.4479 8.55284 11 8 11ZM5 10C5 9.4481 5.44789 9 6 9C6.55211 9 7 9.4481 7 10C7 10.5519 6.55211 11 6 11C5.44789 11 5 10.5519 5 10Z" />
          </svg>
          <span>{baron}</span>
        </div>
      </CustomTooltip>
      <CustomTooltip name="dragon" body="드래곤">
        <div className={cn('objective', team)}>
          <svg>
            <path d="M8 0L6 4L3 1V5H0L3 8V11L7 16H9L13 11V8L16 5H13V1L10 4L8 0ZM9 10.9999L10 8.99993L12 7.99993L11 9.99993L9 10.9999ZM4 7.99993L5 9.99993L7 10.9999L6 8.99993L4 7.99993Z" />
          </svg>
          <span>{dragon}</span>
        </div>
      </CustomTooltip>
      <CustomTooltip name="inhibitor" body="협곡의 전령">
        <div className={cn('objective', team)}>
          <svg>
            <path d="M7.87931 12.3184H8.01691C11.0876 12.0307 11.1112 8.63778 11.1112 8.63778C11.134 5.80836 8.07153 6.04968 7.94776 6.06005C7.82468 6.04968 4.76224 5.80836 4.78506 8.63778C4.78506 8.63778 4.80788 12.0307 7.87931 12.3184ZM11.2377 1C11.2377 1 15.6775 3.57635 14.9874 8.84453C14.9874 8.84453 12.94 9.18956 12.8253 10.7308C12.8253 10.7308 11.9741 14.1127 8.06323 14.2503H7.92909C4.01824 14.1127 3.16706 10.7308 3.16706 10.7308C3.05228 9.18956 1.0042 8.84453 1.0042 8.84453C0.314127 3.57635 4.75463 1 4.75463 1C3.5356 4.58864 4.91574 5.25589 4.91574 5.25589C6.00547 4.45104 7.04127 4.16063 7.94776 4.13574V4.13159C7.95571 4.13159 7.96384 4.13211 7.97196 4.13262C7.98009 4.13314 7.98821 4.13366 7.99616 4.13366C8.0042 4.13366 8.01242 4.13313 8.02055 4.13261C8.02849 4.13209 8.03635 4.13159 8.04387 4.13159V4.13574C8.95106 4.16063 9.98616 4.45104 11.0766 5.25589C11.0766 5.25589 12.4567 4.58864 11.2377 1ZM6.95885 9.17476C6.95885 8.01382 7.42212 7.07344 7.99326 7.07344C8.5644 7.07344 9.02698 8.01382 9.02698 9.17476C9.02698 10.335 8.5644 11.2754 7.99326 11.2754C7.42212 11.2754 6.95885 10.335 6.95885 9.17476ZM14.2859 11.3866C14.2859 11.3866 13.5723 14.9524 13.2273 15.3438C13.2273 15.3438 14.7685 15.3666 16 12.9859C16 12.9859 15.5049 11.9391 14.2859 11.3866ZM2.77203 15.3434C2.77203 15.3434 1.23079 15.3662 0 12.9856C0 12.9856 0.494388 11.9387 1.71411 11.3862C1.71411 11.3862 2.427 14.9521 2.77203 15.3434Z" />
          </svg>
          <span>{inhibitor}</span>
        </div>
      </CustomTooltip>
      <CustomTooltip name="horde" body="공허 유충">
        <div className={cn('objective', team)}>
          <svg>
            <path d="M7.99998 1L6.33333 2.42045C6.33333 2.42045 5.46216 3.2176 5.18153 3.2176H3.92809C3.00001 3.2176 1.66668 4.196 1.37128 5.89721C1.29668 6.32667 1.27273 7.18045 1.93119 8.06625L1 8.81245C1 8.81245 2.33331 9.52267 2.66665 10.9431C2.99998 12.3636 5.08806 13.7042 6.90051 14.0875L7.98099 14.969V15L7.99998 14.9845L8.01896 15V14.969L9.09944 14.0875C10.9119 13.7042 13 12.3636 13.3333 10.9431C13.6666 9.52267 15 8.81245 15 8.81245L14.0688 8.06625C14.7272 7.18045 14.7056 6.34035 14.6287 5.89721C14.3333 4.196 13 3.2176 12.0719 3.2176H10.8184C10.5378 3.2176 9.66667 2.42045 9.66667 2.42045L7.99998 1ZM8.1486 4.2451C8.06916 4.15686 7.93078 4.15686 7.85134 4.2451L5.43358 6.93049C5.35687 7.0157 5.36687 7.14765 5.45522 7.22073C5.72968 7.44776 6.27298 7.90668 6.46151 8.13439C6.67259 8.38935 5.14596 9.53934 4.59964 9.93794C4.50018 10.0105 4.48826 10.1542 4.57436 10.2422L6.41356 12.1222C6.49201 12.2024 6.62105 12.2024 6.69949 12.1222L7.857 10.9391C7.93545 10.8589 8.06449 10.8589 8.14293 10.9391L9.30045 12.1222C9.37889 12.2024 9.50793 12.2024 9.58637 12.1222L11.4256 10.2422C11.5117 10.1542 11.4998 10.0105 11.4003 9.93794C10.854 9.53934 9.32734 8.38935 9.53843 8.13439C9.72695 7.90668 10.2703 7.44776 10.5447 7.22073C10.6331 7.14765 10.6431 7.0157 10.5664 6.93049L8.1486 4.2451Z" />
          </svg>
          <span>{horde}</span>
        </div>
      </CustomTooltip>
      <CustomTooltip name="tower" body="타워">
        <div className={cn('objective', team)}>
          <svg>
            <path d="M4 4L8 0L11.9992 4L10.9982 5.0012L11 5H14L8 11L2 5H5L4 4ZM6.4 3.99963L8 2.4L9.6 3.99963L8 5.6L6.4 3.99963ZM8 12L12 8L10 16H6L4 8L8 12Z" />
          </svg>
          <span>{tower}</span>
        </div>
      </CustomTooltip>
      <CustomTooltip name="riftHerald" body="억제기">
        <div className={cn('objective', team)}>
          <svg>
            <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" />
          </svg>
          <span>{riftHerald}</span>
        </div>
      </CustomTooltip>
    </div>
  );
}
