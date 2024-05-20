export const checkImage = (file: File) => {
  const allowedFileExt: string[] = ["jpeg", "jpg", "png", "webp"];
  const fileExt = file.name.split(".");
  const actualFileExt = fileExt[fileExt.length - 1];

  const isFileAllowed = allowedFileExt.find(
    (f) => f === actualFileExt.toLowerCase(),
  );

  return isFileAllowed ? true : false;
};
