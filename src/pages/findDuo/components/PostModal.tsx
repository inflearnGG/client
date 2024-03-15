import styles from './postModal.module.scss';
import classNames from 'classnames/bind';
import { RiotAccount } from 'store/userSlice';
import Input from 'components/input/Input';
import DropDown from 'components/dropDown/DropDown';
import Toggle from 'components/toggle/Toggle';
import LaneSelector from 'components/laneSelector/LaneSelector';
import { summonerNameTagValidation } from 'utils/validatior';
import { QUEUE } from 'constants/options';
import { IoAlertCircleOutline } from 'react-icons/io5';
import useWritePostForm from 'hooks/form/useWritePostForm';

const cn = classNames.bind(styles);

export type PostData = {
  postId: number;
  memberId: string;
  summonerName: string;
  summonerTag: string;
  mainLane: string;
  subLane: string;
  selectLane: string;
  isMicOn: boolean;
  queueType: string;
  mainChampion: string;
  subChampion: string;
  memo: string;
  riotAccount: RiotAccount[];
};

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postData?: PostData;
};

export default function PostModal({ postData, setIsOpen }: Props) {
  const {
    isLogin,
    isRiotAccountOpen,
    setIsRiotAccountOpen,
    isQueueTypeOpen,
    setIsQueueTypeOpen,
    isMainChampionOpen,
    setIsMainChampionOpen,
    isSubChampionOpen,
    setIsSubChampionOpen,
    register,
    riotAccount,
    setRiotAccount,
    mostLane,
    setMostLane,
    subLane,
    setSubLane,
    selectLane,
    setSelectLane,
    queueType,
    setQueueType,
    mainChampion,
    setMainChampion,
    subChampion,
    setSubChampion,
    isMicOn,
    setIsMicOn,
    riotAccountOptions,
    championOptions,
    submitHandler,
    errors,
  } = useWritePostForm({ postData, setIsOpen });
  return (
    <div className={cn('postModal')}>
      <div>
        <div>
          {' '}
          {riotAccountOptions?.length ? (
            <>
              <label>게임 계정</label>
              <DropDown
                options={riotAccountOptions}
                currentOptionKey={riotAccount}
                onChange={setRiotAccount}
                type="dark"
                isOpen={isRiotAccountOpen}
                setIsOpen={setIsRiotAccountOpen}
                className={cn('dropDown')}
              />
            </>
          ) : (
            <Input
              type="text"
              label="소환사 이름#태그"
              error={errors.summonerName}
              className={cn('summonerNameInput')}
              {...register('summonerName', summonerNameTagValidation)}
            />
          )}
        </div>
        <div>
          <label>마이크 사용</label>
          <Toggle isChecked={isMicOn} setIsChecked={setIsMicOn} />
        </div>
      </div>
      <div>
        <div>
          <label>선호 라인</label>
          <LaneSelector size={27} option={mostLane} onChange={setMostLane} />
        </div>
        <div>
          <label>게임 타입</label>
          <DropDown
            options={QUEUE}
            type="dark"
            currentOptionKey={queueType}
            onChange={setQueueType}
            isOpen={isQueueTypeOpen}
            setIsOpen={setIsQueueTypeOpen}
            className={cn('dropDown')}
          />
        </div>
      </div>
      <div>
        <div>
          <label>서브 라인</label>
          <LaneSelector size={27} option={subLane} onChange={setSubLane} />
        </div>
        <div>
          <label>메인 챔피언</label>
          <DropDown
            options={championOptions}
            currentOptionKey={mainChampion}
            onChange={setMainChampion}
            type="dark"
            isOpen={isMainChampionOpen}
            setIsOpen={setIsMainChampionOpen}
            className={cn('dropDown')}
          />
        </div>
      </div>
      <div>
        <div>
          <label>찾는 라인</label>
          <LaneSelector
            size={27}
            option={selectLane}
            onChange={setSelectLane}
          />
        </div>
        <div>
          <label>서브 챔피언</label>
          <DropDown
            options={championOptions}
            currentOptionKey={subChampion}
            onChange={setSubChampion}
            type="dark"
            isOpen={isSubChampionOpen}
            setIsOpen={setIsSubChampionOpen}
            className={cn('dropDown')}
          />
        </div>
      </div>
      <div>
        <Input
          type="text"
          label="메모"
          maxLength={100}
          {...register('memo')}
          className={cn('memo')}
        />
      </div>
      <div className={cn('footer')}>
        <p>
          <IoAlertCircleOutline />
          타인에 대한 모욕, 명예훼손, 성희롱 등의 행위는 법적 처벌을 받을 수
          있습니다.
        </p>
        <div className={cn('buttons')}>
          <button onClick={() => setIsOpen(false)}>취소</button>
          <button onClick={submitHandler}>등록</button>
        </div>
      </div>
    </div>
  );
}
