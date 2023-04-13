export const generateSecret = (
  length: number,
  hex: boolean = false
): string => {
  let result = '';
  const characters =
    '0123456789ABCDEF' +
    (hex ? '' : 'GHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
