import styles from './input.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
const cn = classNames.bind(styles);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  label: string;
  name: string;
  className?: string;
  type: string;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { className, name, label, error, type, ...rest },
  ref,
) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const isPassword = type === 'password';
  const onclickVisiblePasswordBtnhandler = () =>
    setVisiblePassword((prev) => !prev);
  return (
    <div className={cn('inputWrapper', { error }, className)}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        ref={ref}
        {...rest}
        className={cn({ password: isPassword })}
        type={isPassword && visiblePassword ? 'text' : type}
      />
      {isPassword && (
        <span
          className={cn('visiblePasswordBtn')}
          onClick={onclickVisiblePasswordBtnhandler}
        >
          {visiblePassword ? '숨기기' : '보기'}
        </span>
      )}
      <span className={cn('errorMessage')}>{error?.message}</span>
    </div>
  );
};

export default forwardRef(Input);
