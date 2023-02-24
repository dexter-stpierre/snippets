export const checkIsVariableFunction = <T>(
  variable: T | Function
): variable is Function => {
  return typeof variable === "function";
};
