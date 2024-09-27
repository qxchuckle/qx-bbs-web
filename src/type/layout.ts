// 菜单栏数据类型
export interface MenuListType {
  boardId: number;
  pBoardId: number;
  boardName: string;
  cover: any;
  boardDesc: string;
  sort: number;
  postType: number;
  children: MenuListType[]; // 子菜单
}
