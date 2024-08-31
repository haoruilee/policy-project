import React from 'react';
import { Form, Modal, Input, DatePicker, FormInstance, Spin } from '@arco-design/web-react';

import style from './style.module.scss';
import { CompanyItemData } from './index';

const { Item: FormItem } = Form;

interface IProps {
  mode: 'create' | 'edit';
  visible: boolean;
  setVisible: (vis: boolean) => void;
  formRef: React.MutableRefObject<FormInstance<CompanyItemData> | null>;
  onOk: () => void;
  okLoading: boolean;
}

const modeTextConfig = {
  create: {
    ok: '创建企业信息',
    cancel: '取消',
    title: '新增企业信息'
  },
  edit: {
    ok: '提交修改',
    cancel: '取消',
    title: '修改企业信息'
  }
};

const ModalForm = (props: IProps) => {
  const { mode, visible, setVisible, formRef, onOk, okLoading } = props;

  const onCancel = () => {
    formRef?.current?.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      title={modeTextConfig[mode].title}
      okText={
        <div style={{ display: 'flex', alignItems: 'center', columnGap: '4px' }}>
          {okLoading ? <Spin style={{ color: 'white' }} loading={okLoading} /> : null}
          {modeTextConfig[mode].ok}
        </div>
      }
      okButtonProps={{
        disabled: okLoading
      }}
      cancelText={modeTextConfig[mode].cancel}
    >
      <div className={style.modalContainer}>
        <Form layout="vertical" size="small" ref={formRef}>
          <FormItem label="企业名称" field="name" required rules={[{ required: true }]}>
            <Input size="small" />
          </FormItem>
          <FormItem label="统一社会信用代码" field="uniqCode" required rules={[{ required: true }]}>
            <Input size="small" />
          </FormItem>
          <FormItem label="企业类型" field="type" required rules={[{ required: true }]}>
            <Input size="small" />
          </FormItem>
          <FormItem label="注册地址" field="address">
            <Input size="small" />
          </FormItem>
          <FormItem label="注册资本" field="money">
            <Input size="small" />
          </FormItem>
          <FormItem label="成立日期" field="foundDate">
            <DatePicker size="small" style={{ width: '100%' }} />
          </FormItem>
          <FormItem label="企业性质" field="companyType">
            <Input size="small" />
          </FormItem>
          <FormItem label="所属领域" field="companyField">
            <Input size="small" />
          </FormItem>
          <FormItem label="企业总人数" field="totalMemberNum">
            <Input size="small" />
          </FormItem>
          <FormItem label="领军人数" field="expertNum">
            <Input size="small" />
          </FormItem>
          <FormItem label="大专及以上人数" field="collageNum">
            <Input size="small" />
          </FormItem>
          <FormItem label="本科及以上人数" field="bachelorNum">
            <Input size="small" />
          </FormItem>
          <FormItem label="硕士及以上人数" field="masterNum">
            <Input size="small" />
          </FormItem>
          <FormItem label="博士及以上人数" field="doctorNum">
            <Input size="small" />
          </FormItem>
          <FormItem label="总资产" field="totalAsset">
            <Input size="small" />
          </FormItem>
          <FormItem label="净利润" field="totalProfit">
            <Input size="small" />
          </FormItem>
          <FormItem label="营业收入" field="income">
            <Input size="small" />
          </FormItem>
          <FormItem label="主营业务收入" field="mainIncome">
            <Input size="small" />
          </FormItem>
          <FormItem label="税收" field="tax">
            <Input size="small" />
          </FormItem>
          <FormItem label="研发投入" field="developInvest">
            <Input size="small" />
          </FormItem>
          <FormItem label="知识产权总数" field="technologyPropertyNum">
            <Input size="small" />
          </FormItem>
          <FormItem label="专利总数" field="propertyNum">
            <Input size="small" />
          </FormItem>
          <FormItem label="注册商标总数" field="iconNum">
            <Input size="small" />
          </FormItem>
          <FormItem label="软件著作总数" field="softwareNum">
            <Input size="small" />
          </FormItem>
          <FormItem label="项目总投资" field="totalInvestMoney">
            <Input size="small" />
          </FormItem>
          <FormItem label="项目实施时间" field="openTime">
            <Input size="small" />
          </FormItem>
          <FormItem label="项目情况" field="status">
            <Input size="small" />
          </FormItem>
          <FormItem label="载体支配面积" field="area">
            <Input size="small" />
          </FormItem>
          <FormItem label="在孵企业数" field="companyDevelopNum">
            <Input size="small" />
          </FormItem>
          <FormItem label="毕业企业数" field="endCompanyNum">
            <Input size="small" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalForm;
