// import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import {
  addReward,
  removeReward,
  reward,
  updateReward,
} from '@/services/ant-design-pro/reward';
import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions, ProFormDateTimePicker, ProFormSelect,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {getAllStudent} from "@/services/ant-design-pro/student";

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.StudentListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addReward({data:fields});
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateReward({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.StudentListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeReward({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.StudentListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.StudentListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.StudentListItem>[] = [
    {
      title: '学号',
        // <FormattedMessage
        //   id="pages.searchTable.titleCallNo"
        //   defaultMessage="Number of service calls"
        // />
      dataIndex: 'sid',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '姓名',
      // <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
      dataIndex: 'name',
      hideInForm: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      // valueType: 'textarea',
      valueEnum: {
        是: {
          text: '奖励',
          status: 'processing',
        },
        否: {
          text: '处分',
          status: 'Error',
        },
      },
    },
    {
      title: '原因',
      dataIndex: 'reason',
      valueType: 'textarea',
    },
    {
      title: '时间',
      dataIndex: 'startTime',
      valueType: 'date',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalOpen(true);

          }}
        >
          {'修改'}
        </a>,
        // 竖线
        // <Divider type="vertical" />,
        <Button
          type={'link'}
          danger
          key="delete"
          onClick={() => {
            Modal.confirm({
              title: '删除',
              content: '确定删除吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                // await handleRemove(selectedRowsState);
                // setSelectedRows([]);
                // await handleRemove([record]);
                await removeReward({ id: record.id });
                actionRef.current?.reloadAndRest?.();
                // deleteStudent(record.id);
              },
            });
          }}
          // href="https://procomponents.ant.design/"
        >
          {'删除'}
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.StudentListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        scroll={{ x: 'max-content' }}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <ExportOutlined />
            {'导出'}
          </Button>,
        ]}
        request={reward}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {/*{selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}*/}
                {/*<FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />*/}
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newStudent',
          defaultMessage: '新建奖惩',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.StudentListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormSelect
          showSearch
          rules={[
            {
              required: true,
              message: 'required',
            },
          ]}
          width="md"
          placeholder={'学号'}
          name="sid"
          request={async () => {
            const res = await getAllStudent();
            return res.data.map((item: any) => {
              return {
                label: item.sid,
                value: item.sid,
              };
            })
          }
          }
        />
        <ProFormSelect showSearch width="md" placeholder={'类型'}  name="type"
        options={[
          {
            value: "奖励",
            label: "奖励"
          },
          {
            value: "处分",
            label: "处分"
          }
        ]}
        />
        <ProFormTextArea width="md" placeholder={'原因'}  name="reason" />
        <ProFormDateTimePicker width="md"  name="startTime" />
      </ModalForm>
      <ModalForm
        // set value when open
        initialValues={currentRow}
        open={updateModalOpen}
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newStudent',
          defaultMessage: '修改奖惩',
        })}
        width="400px"
        onOpenChange={handleUpdateModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.StudentListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        // onSubmit={async (value) => {
        //   const success = await handleUpdate(value);
        //   if (success) {
        //     handleUpdateModalOpen(false);
        //     setCurrentRow(undefined);
        //     if (actionRef.current) {
        //       actionRef.current.reload();
        //     }
        //   }
        // }}
        // onCancel={() => {
        //   handleUpdateModalOpen(false);
        //   if (!showDetail) {
        //     setCurrentRow(undefined);
        //   }
        // }}
      >
        <ProFormSelect
          showSearch
          rules={[
            {
              required: true,
              message: 'required',
            },
          ]}
          width="md"
          placeholder={'学号'}
          name="sid"
          request={async () => {
            const res = await getAllStudent();
            return res.data.map((item: any) => {
              return {
                label: item.sid,
                value: item.sid,
              };
            })
          }
          }
        />
        <ProFormSelect showSearch width="md" placeholder={'类型'}  name="type"
                       options={[
                         {
                           value: "奖励",
                           label: "奖励"
                         },
                         {
                           value: "处分",
                           label: "处分"
                         }
                       ]}
        />
        <ProFormTextArea width="md" placeholder={'原因'}  name="reason" />
        <ProFormDateTimePicker width="md"  name="startTime" />
      </ModalForm>

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.StudentListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.StudentListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
