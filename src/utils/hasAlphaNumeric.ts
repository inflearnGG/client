export default function hasAlphaNumeric(input: string) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(input);
}
