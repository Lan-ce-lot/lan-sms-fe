// @ts-ignore
/* eslint-disable */

declare namespace API {
  type result = {
    code: number;
    msg: string;
    data: any;
  };
  type StudentList = {
    list?: StudentListItem[];
    current?: number;
    pageSize?: number;
    total?: number;
  };
  // "id": 4,
  //   "department": "计算机科学与技术学院",
  //   "class": "计算机科学与技术1701",
  //   "sid": "2017010101",
  //   "name": "张三",
  //   "gender": "男",
  //   "nation": "汉族",
  //   "religious": "无",
  //   "id_number": "123456789012345678",
  //   "major": "计算机科学与技术",
  //   "length_of_schooling": "4",
  //   "grade": "2017",
  //   "level": "本科",
  //   "if_school": "是",
  //   "if_absentee": "否",
  //   "dormitory_number": "1",
  //   "class_teacher": "李老师",
  //   "Native": "北京",
  //   "address": "北京市海淀区",
  //   "parental_name": "张父",
  //   "Parental_phone": "12345678902",
  //   "phone": "12345678901"
  type StudentListItem = {
    // callNo?: number;
    id?: number;
    department?: string;
    class?: string;
    sid?: string;
    name?: string;
    gender?: string;
    nation?: string;
    religion?: string;
    idNumber?: string;
    major?: string;
    lengthOfSchooling?: string;
    grade?: string;
    level?: string;
    ifSchool?: string;
    ifAbsentee?: string;
    dormitoryNumber?: string;
    classTeacher?: string;
    native?: string;
    address?: string;
    parentalName?: string;
    parentalPhone?: string;
    phone?: string;
  };
  type CurrentUser = {
    id?: string;
    username?: string;
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    data?: any;
    code?: number;
    msg?: string;
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
