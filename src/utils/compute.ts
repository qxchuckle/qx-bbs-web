// 计算文件大小
export function computeFileSize(size: number): string {
  if (size < 1024) {
    return size + 'B';
  } else if (size < 1024 * 1024) {
    size = size / 1024;
    return size.toFixed(2) + 'KB';
  } else if (size < 1024 * 1024 * 1024) {
    size = size / 1024;
    return size.toFixed(2) + 'MB';
  } else {
    size = size / 1024;
    return size.toFixed(2) + 'GB';
  }
}
