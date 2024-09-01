import { CompanyItemData } from '@/pages/companydb';

// 搜索公司信息列表
export const fetchCompanyList = async (companyName?: string) => {
  const searchBody = companyName ? { name: companyName } : { name: '' };
  const res = await fetch('http://111.43.78.224:3009/search_company_name', {
    body: JSON.stringify(searchBody),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (res.status == 200) {
    const data = await res.json();
    return data;
  } else {
    return Promise.reject('not success');
  }
};

// 创建公司
export const createCompay = async (companyData: CompanyItemData) => {
  const body = { ...companyData };
  const res = await fetch('http://111.43.78.224:3009/create_company', {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (res.status == 200) {
    const data = await res.json();
    return data;
  } else {
    return Promise.reject('not success');
  }
};

// 更新公司
export const updateCompany = async (companyData: CompanyItemData) => {
  const body = { ...companyData };
  const res = await fetch('http://111.43.78.224:3009/company_update', {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (res.status == 200) {
    const data = await res.json();
    return data;
  } else {
    return Promise.reject('not success');
  }
};

// 删除公司
export const deleteCompanyRequest = async (companyData: CompanyItemData) => {
  const body = {
    uniqCode: companyData?.uniqCode
  };
  const res = await fetch('http://111.43.78.224:3009/delete_company_by_uniq_code', {
    body: JSON.stringify(body),
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (res.status == 200) {
    const data = await res.json();
    return data;
  } else {
    return Promise.reject('not success');
  }
};
