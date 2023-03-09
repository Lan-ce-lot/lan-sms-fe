// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import * as url from "url";

/** 获取学生列表 GET /api/students */
export async function student(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const result = await request<API.result>('/api/v1/students', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
  return {
    data: result.data.lists,
    success: result.code,
    total: result.data.total,
  };
  // return request<API.result>('/api/v1/students', {
  //   method: 'GET',
  //   params: {
  //     ...params,
  //   },
  //   ...(options || {}),
  //
  // }
  // );
}

/** 新建学生 PUT /api/student */
export async function updateStudent(options?: { [key: string]: any }) {
  return request<API.StudentListItem>('/api/v1/student', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建学生 POST /api/student */
export async function addStudent(options?: { [key: string]: any }) {
  return request<API.StudentListItem>('/api/v1/student', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除学生 DELETE /api/student/:id */
export async function removeStudent(options?: { [key: string]: any }) {
  const id = options?.id;
  return request<Record<string, any>>(`/api/v1/student/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/**
 * get all student GET /api/v1/student/all
 */
export async function getAllStudent(options?: { [key: string]: any }) {
  const result = await request<API.result>('/api/v1/student/all', {
    method: 'GET',
    ...(options || {}),
  });
  return {
    data: result.data,
    success: true,
    msg: result.msg,
  };
}


/**
 * add student list POST /api/v1/student/list
 */
export async function addStudentList(options?: { [key: string]: any }) {
  console.log(options)
  return request<API.result>(
    '/api/v1/student/list',
    {
      method:'POST',
      ...(options || {}),
    }
  )
  // return request<API.StudentListItem>('/api/v1/student/list', {
  //   method: 'POST',
  //   ...(options || {}),
  // });
}
