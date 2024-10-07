export enum UploadAcceptEnum {
  all = '*',
  image = 'image/*',
  text = 'text/*',
  sound = 'audio/*',
  video = 'video/*',
}

export enum ReadFileTypeEnum {
  dataURL = 'readAsDataURL',
  arrayBuffer = 'readAsText',
  text = 'readAsArrayBuffer',
}

// 读取文件的返回类型映射
export type ReadFileTypeMap = {
  [key in ReadFileTypeEnum]: key extends ReadFileTypeEnum.arrayBuffer ? ArrayBuffer : string;
};
