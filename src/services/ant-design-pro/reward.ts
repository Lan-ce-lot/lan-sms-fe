// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import * as url from "url";

/** 获取学生列表 GET /api/rewards */
export async function reward(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const result = await request<API.result>('/api/v1/rewards', {
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
}

/** 新建学生 PUT /api/reward */
export async function updateReward(options?: { [key: string]: any }) {
  return request<API.result>('/api/v1/reward', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建学生 POST /api/reward */
export async function addReward(options?: { [key: string]: any }) {
  return request<API.result>('/api/v1/reward', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除学生 DELETE /api/reward/:id */
export async function removeReward(options?: { [key: string]: any }) {
  const id = options?.id;
  return request<Record<string, any>>(`/api/v1/reward/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/**
 * get all reward GET /api/v1/reward/all
 */
export async function getAllReward(options?: { [key: string]: any }) {
  const result = await request<API.result>('/api/v1/reward/all', {
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
 * add reward list POST /api/v1/reward/list
 */
export async function addRewardList(options?: { [key: string]: any }) {
  console.log(options)
  return request<API.result>(
    '/api/v1/reward/list',
    {
      method:'POST',
      ...(options || {}),
    }
  )
  // return request<API.rewardListItem>('/api/v1/reward/list', {
  //   method: 'POST',
  //   ...(options || {}),
  // });
}
