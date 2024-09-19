import React, { useEffect, useRef, useState } from 'react';
import { Button, FormInstance, Input, Message, Modal, Spin, Table } from '@arco-design/web-react';
import { IconPlus, IconSearch } from '@arco-design/web-react/icon';
import { ColumnProps } from '@arco-design/web-react/es/Table';

import PageContainer from '@/components/PageContainer';
import style from './style.module.scss';
import ModalForm from './ModalForm';
import {
  createCompay,
  fetchCompanyList,
  updateCompany,
  deleteCompanyRequest
} from '@/service/companyDb';
import { serviceSideProps } from '@/web/common/utils/i18n';

export interface CompanyItemData {
  name?: string; // 企业名称
  uniqCode?: string; // 社会信用代码
  type?: string; // 企业类型
  address?: string; // 企业地址
  money?: string; // 企业注册资本
  foundDate?: string; // 成立日期
  companyType?: string; // 企业性质
  companyField?: string; // 企业领域
  totalMemberNum?: number; // 企业总人数
  expertNum?: number; // 领军人数
  collageNum?: number; // 大专及以上人数
  bachelorNum?: number; // 本科及以上人数
  masterNum?: number; // 硕士及以上人数
  doctorNum?: number; // 博士及以上人数
  totalAsset?: number; // 总资产
  income?: number; // 营业收入
  totalProfit?: number; // 净利润
  mainIncome?: string; // 主要营业收入
  tax?: number; // 税收
  developInvest?: number; // 研发投入
  technologyPropertyNum?: number; // 知识产权总数
  propertyNum?: number; // 专利总数
  iconNum?: number; // 注册商标总数
  softwareNum?: number; // 软件著作总数
  totalInvestMoney?: number; // 项目总投资
  openTime?: string; // 项目实施时间
  status?: string; // 项目实施情况
  companyDevelopNum?: number; // 在孵企业数
  area?: number; // 载体支配面积
  endCompanyNum?: number; // 毕业企业数
}

const CompanyDB = () => {
  const [searchVal, setSearchVal] = useState('');

  const [tableData, setTableData] = useState<CompanyItemData[]>([]);
  const [deleteCompany, setDeleteCompany] = useState<CompanyItemData>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tableLoading, setTableLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [doubleCheckVisible, setDoubleCheckVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');

  const formRef = useRef<FormInstance<CompanyItemData>>(null);

  // 刷新 table 信息
  const refreshTableInfo = () => {
    setTableLoading(true);
    fetchCompanyList(searchVal)
      .then((res) => {
        setTotalPages(res?.total_pages || 1);
        setTableData(res?.results);
      })
      .catch((err) => {
        console.error('err fetch company list', err);
        Message.error('请求失败');
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  useEffect(() => {
    refreshTableInfo();
  }, []);

  const column: ColumnProps<any>[] = [
    {
      title: '企业名称',
      dataIndex: 'name',
      width: 300
    },
    {
      title: '企业社会信用代码',
      dataIndex: 'uniqCode',
      width: 200
    },
    {
      title: '注册地址',
      dataIndex: 'address',
      width: 200
    },
    {
      title: '企业类型',
      dataIndex: 'type',
      width: 200
    },
    {
      title: '注册资本',
      dataIndex: 'money',
      width: 200
    },
    {
      title: '成立日期',
      dataIndex: 'foundDate',
      width: 200
    },
    {
      title: '企业性质',
      dataIndex: 'companyType',
      width: 200
    },
    {
      title: '所属领域',
      dataIndex: 'companyField',
      width: 200
    },
    {
      title: '企业总人数',
      dataIndex: 'companyDevelopNum',
      width: 200
    },
    {
      title: '领军人数',
      dataIndex: 'expertNum',
      width: 200
    },
    {
      title: '大专及以上人数',
      dataIndex: 'collageNum',
      width: 200
    },
    {
      title: '本科及以上人数',
      dataIndex: 'bachelorNum',
      width: 200
    },
    {
      title: '硕士及以上人数',
      dataIndex: 'masterNum',
      width: 200
    },
    {
      title: '博士及以上人数',
      dataIndex: 'doctorNum',
      width: 200
    },
    {
      title: '总资产',
      dataIndex: 'totalAsset',
      width: 200
    },
    {
      title: '净利润',
      dataIndex: 'totalProfit',
      width: 200
    },
    {
      title: '营业收入',
      dataIndex: 'income',
      width: 200
    },
    {
      title: '主营业务收入',
      dataIndex: 'mainIncome',
      width: 200
    },
    {
      title: '税收',
      dataIndex: 'tax',
      width: 200
    },
    {
      title: '研发投入',
      dataIndex: 'developInvest',
      width: 200
    },
    {
      title: '知识产权总数',
      dataIndex: 'technologyPropertyNum',
      width: 200
    },
    {
      title: '专利总数',
      dataIndex: 'propertyNum',
      width: 200
    },
    {
      title: '注册商标总数',
      dataIndex: 'iconNum',
      width: 200
    },
    {
      title: '软件著作总数',
      dataIndex: 'softwareNum',
      width: 200
    },
    {
      title: '项目总投资',
      dataIndex: 'totalInvestMoney',
      width: 200
    },
    {
      title: '项目实施时间',
      dataIndex: 'openTime',
      width: 200
    },
    {
      title: '项目情况',
      dataIndex: 'status',
      width: 200
    },
    {
      title: '载体支配面积',
      dataIndex: 'area',
      width: 200
    },
    {
      title: '在孵企业数',
      dataIndex: 'companyDevelopNum',
      width: 200
    },
    {
      title: '毕业企业数',
      dataIndex: 'endCompanyNum'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
      width: 120,
      render: (col: any, item: CompanyItemData) => {
        return (
          <>
            <Button
              onClick={() => {
                setMode('edit');
                setModalVisible(true);
                formRef?.current?.setFieldsValue(item);
              }}
              type="text"
            >
              修改
            </Button>
            <Button
              onClick={() => {
                setDoubleCheckVisible(true);
                setDeleteCompany(item);
              }}
              type="text"
            >
              删除
            </Button>
          </>
        );
      }
    }
  ];

  const onCreateBtnClick = () => {
    setMode('create');
    // 清除 form 内容
    setModalVisible(true);
  };

  const onDoubleCheckOk = () => {
    // 删除信息请求， loading
    setDeleteLoading(true);
    deleteCompanyRequest(deleteCompany)
      .then((res) => {
        Message.success('删除公司成功');
        refreshTableInfo();
        setDeleteCompany({});
      })
      .catch((err) => {
        console.error('delete error', err);
        Message.error('请求失败');
      })
      .finally(() => {
        setDeleteLoading(false);
      });
    setDoubleCheckVisible(false);
  };

  const onSearchClick = () => {
    refreshTableInfo();
  };

  const onFormConfirm = () => {
    // update or create
    setIsModalLoading(true);
    if (mode == 'create') {
      createCompay(formRef?.current?.getFieldsValue() || {})
        .then((res) => {
          Message.success('创建公司信息成功!');
          refreshTableInfo();
          setModalVisible(false);
        })
        .catch((err) => {
          Message.error('请求失败');
          console.error('create error', err);
        })
        .finally(() => {
          setIsModalLoading(false);
        });
    } else if (mode == 'edit') {
      updateCompany(formRef?.current?.getFieldsValue() || {})
        .then((res) => {
          Message.success('修改公司信息成功!');
          refreshTableInfo();
          setModalVisible(false);
        })
        .catch((err) => {
          console.error('update error', err);
          Message.error('请求失败');
        })
        .finally(() => {
          setIsModalLoading(false);
        });
    }
  };

  return (
    <PageContainer isLoading={false} insertProps={{ px: [5, '10'] }}>
      <div className={style.companyDbContainer}>
        <div className={style.titleLineContainer}>
          <div className={style.mainTitle}>企业信息数据库</div>
          <div className={style.operationBtn}>
            <Input
              value={searchVal}
              onChange={(val) => {
                setSearchVal(val);
              }}
              width={'240px'}
              placeholder="请输入企业名称进行搜索"
              suffix={
                // 调整下按钮的样式
                <Button type="text" onClick={onSearchClick}>
                  <IconSearch />
                </Button>
              }
            />
            <Button type="primary" onClick={onCreateBtnClick}>
              <IconPlus />
              新增企业
            </Button>
          </div>
        </div>
        <Table
          columns={column}
          data={tableData}
          loading={tableLoading}
          scroll={{ x: 1600 }}
          pagination={{
            pageSize: 20,
            current: page,
            onChange: setPage,
            total: totalPages
          }}
        />
      </div>
      <ModalForm
        visible={modalVisible}
        setVisible={setModalVisible}
        formRef={formRef}
        mode={mode}
        onOk={onFormConfirm}
        okLoading={isModalLoading}
      />
      <Modal
        visible={doubleCheckVisible}
        onCancel={() => {
          setDoubleCheckVisible(false);
        }}
        onOk={onDoubleCheckOk}
        okText={
          <div style={{ display: 'flex', alignItems: 'center', columnGap: '4px' }}>
            {deleteLoading ? <Spin style={{ color: 'white' }} loading={deleteLoading} /> : null}
            删除
          </div>
        }
        okButtonProps={{
          disabled: deleteLoading
        }}
      >
        确认要删除{deleteCompany?.name}的信息吗？
      </Modal>
    </PageContainer>
  );
};

export async function getServerSideProps(content: any) {
  return {
    props: {
      ...(await serviceSideProps(content))
    }
  };
}

export default CompanyDB;
