export const isImage = (imageFile: File): boolean => {
  const allowedFileExt: string[] = ["jpeg", "jpg", "png", "webp"];
  const fileExt: string[] = imageFile.name.split(".");
  const actualFileExt = fileExt[fileExt.length - 1].toLowerCase();
  const isFileExist = allowedFileExt.find((ext) => ext === actualFileExt);

  return isFileExist ? true : false;
};
