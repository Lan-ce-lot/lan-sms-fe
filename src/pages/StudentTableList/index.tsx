// import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import {
  addStudent,
  getAllStudent,
  removeStudent,
  student,
  updateStudent,
} from '@/services/ant-design-pro/student';
import { ExportOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.StudentListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addStudent({ ...fields });
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
    await updateStudent({
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
 * @en-US downloadExcel
 * @zh-CN 更新节点
 *
 * @param data
 */
const downloadExcel = (data: any) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, 'DataSheet.xlsx');
};
/**
 * export excel
 *
 */
const handleExport = async () => {
  const hide = message.loading('正在导出');
  try {
    const students = await getAllStudent();
    downloadExcel(students.data);
    hide();
    message.success('导出成功');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};
const handleRemove = async (selectedRows: API.StudentListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeStudent({
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

const handleDeleteStudent = async (id: number) => {
  const hide = message.loading('正在删除');
  try {
    await removeStudent({
      id: id,
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
      title:
        // <FormattedMessage
        //   id="pages.searchTable.updateForm.StudentName.nameLabel"
        //   defaultMessage="Student name"
        // />
        '系部',
      dataIndex: 'department',

      tip: 'The Student name is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '班级',
      dataIndex: 'class',
      valueType: 'textarea',
    },
    {
      title:
        '学号',
        // <FormattedMessage
        //   id="pages.searchTable.titleCallNo"
        //   defaultMessage="Number of service calls"
        // />
      dataIndex: 'sid',
      sorter: true,
      hideInForm: true,
      // renderText: (val: string) =>
      //   `${val}${intl.formatMessage({
      //     id: 'pages.searchTable.tenThousand',
      //     defaultMessage: ' 万 ',
      //   })}`,
    },
    {
      title: '姓名',
      // <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
      dataIndex: 'name',
      hideInForm: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'textarea',
    },
    {
      title: '民族',
      dataIndex: 'nation',
      valueType: 'textarea',
    },
    {
      title: '宗教信仰',
      dataIndex: 'religion',
      valueType: 'textarea',
    },
    {
      title: '身份证',
      dataIndex: 'idNumber',
      valueType: 'textarea',
    },
    {
      title: '专业',
      dataIndex: 'major',
      valueType: 'textarea',
    },
    {
      title: '学制',
      dataIndex: 'lengthOfSchooling',
      valueType: 'textarea',
    },
    {
      title: '年级',
      dataIndex: 'grade',
      valueType: 'textarea',
    },
    {
      title: '层次',
      dataIndex: 'level',
      valueType: 'textarea',
    },
    {
      title: '是否在校',
      dataIndex: 'ifSchool',
      // valueType: 'textarea',
      valueEnum: {
        是: {
          text: '是',
          status: 'Processing',
        },
        否: {
          text: '否',
          status: 'error',
        },
      },
    },
    {
      title: '是否在籍',
      dataIndex: 'ifAbsentee',
      // valueType: 'textarea',
      valueEnum: {
        是: {
          text: '是',
          status: 'processing',
        },
        否: {
          text: '否',
          status: 'Error',
        },
      },
    },
    {
      title: '宿舍号',
      dataIndex: 'dormitoryNumber',
      valueType: 'textarea',
    },
    {
      title: '当前班主任',
      dataIndex: 'classTeacher',
      valueType: 'textarea',
    },
    {
      title: '籍贯',
      dataIndex: 'native',
      valueType: 'textarea',
    },

    {
      title: '家庭住址',
      dataIndex: 'address',
      valueType: 'textarea',
    },

    {
      title: '家长姓名',
      dataIndex: 'parentalName',
      valueType: 'textarea',
    },

    {
      title: '家长联系方式',
      dataIndex: 'parentalPhone',
      valueType: 'textarea',
    },
    {
      title: '本人联系方式',
      dataIndex: 'phone',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
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
                await handleDeleteStudent({ id: record.id });
                actionRef.current?.reloadAndRest?.();
                // deleteStudent(record.id);
              },
            });
          }}
          // href="https://procomponents.ant.design/"
        >
          {'删除'}
          {/*<FormattedMessage*/}
          {/*  id="pages.searchTable.subscribeAlert"*/}
          {/*  defaultMessage="删除"*/}
          {/*/>*/}
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
            <ImportOutlined /> {'导入'}
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleExport();
              // handleModalOpen(true);
            }}
          >
            <ExportOutlined />
            {'导出'}
          </Button>,
        ]}
        request={student}
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
        title={
          '新建学生'
          // intl.formatMessage({
          //   id: 'pages.searchTable.createForm.newStudent',
          //   defaultMessage: 'New Student',
          // })
        }
        // 双列
        layout="horizontal"
        width="1000px"
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
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Student name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

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
