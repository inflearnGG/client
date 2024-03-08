import React, { useRef } from 'react';
import styles from './dropDown.module.scss';
import classNames from 'classnames/bind';
import { IoCaretDownSharp } from 'react-icons/io5';
import useHandleOutsideClick from 'hooks/useHandleOustsideClick';
const cn = classNames.bind(styles);

type Props = {
  options: { key: string; display: string }[];
  onChange: (option: string) => void;
  className?: string;
  option: string[];
  type: 'dark' | 'border';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

/**
 * 미리 스타일을 지정해둔 드롭다운 메뉴입니다.
 * @param {{ key: string; display: string }[]} options - 드롭다운 메뉴의 옵션 리스트 값입니다.
 * @param {(option: string) => void} onChange - 드롭다운 메뉴의 항목을 선택했을 때 실행되는 함수 입니다.
 * @param {string?} className - 드롭다운 메뉴의 클래스입니다.
 * @param {string[]} option - 드롭다운 메뉴의 현재 옵션 값입니다.
 * @param {string} type - 드롭다운 메뉴의 스타일 타입 값입니다.
 * @param {string} isOpen - 드롭다운 메뉴의 오픈 여부를 관리하는 상태입니다
 * @param {string} setIsOpen - 드롭다운 메뉴의 오픈 여부를 제어하는 함수입니다.
 * @param {React.RefObject<HTMLDivElement>} dropMenuRef - 드롭다운 메뉴의 ref입니다.
 */

export default function DropDown({
  options,
  option,
  onChange,
  className,
  type,
  isOpen,
  setIsOpen,
}: Props) {
  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const onClickHandler = (option: string) => {
    // 전달받은 onChange함수로 option을 전달하고, 드롭다운 메뉴를 닫습니다.
    onChange(option);
    setIsOpen(false);
  };

  useHandleOutsideClick<HTMLDivElement>({
    isOpen,
    setIsOpen,
    ref: dropMenuRef,
  });

  // 드롭다운 메뉴의 오픈 여부를 제어하는 함수로, 이벤트 버블링을 제어하고 변경된 오픈값을 전달합니다.
  const dropDownOpenHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen);
  };

  // 현재 옵션의 display값을 빼옵니다.
  const currentOption = options.find((el) => el.key === option[0])?.display;
  return (
    <div ref={dropMenuRef} className={cn('dropDownContainer', className, type)}>
      <div
        onClick={dropDownOpenHandler}
        className={`${cn('dropDownHeader')} dropDownHeader`}
      >
        {currentOption}
        <button className={cn({ open: isOpen })}>
          <IoCaretDownSharp className="dropDownSharpIcon" />
        </button>
      </div>
      <ul
        className={`${cn('dropDownContent', { visibleOption: isOpen })} dropDownContent`}
      >
        {options.map(({ key, display }) => (
          <li key={key} onClick={() => onClickHandler(key)}>
            {display}
          </li>
        ))}
      </ul>
    </div>
  );
}
