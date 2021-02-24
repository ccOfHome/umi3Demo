import React, { useState, useEffect } from 'react';
import { Table, Input, Button, message } from 'antd';
// import axios, { AxiosResponse } from 'axios';
import { deleteCourse, getList } from '@/pages/services/courseApi';
import { Data, Response } from '@/utils/type';
import { history, Link } from 'umi'

const { Search } = Input;

const index = () => {

  const [datas, setDatas] = useState<Data[]>([] as Data[]);
  const [keywords, setKeywords] = useState('');

  const handleRemove = (id: string) => {
    deleteCourse({id}).then((res: Response) => {
      if (res && res.success) {
        message.success(res.msg);
        getDatas({ keywords });
        return;
      }
      message.warning(res ? res.msg : '删除异常');
    });
  }

  let columns = [
    {
      title: '课程类别',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '课程总价',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: '课程数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '课程地址',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => (
        <>
          <a target="blank" href={text}>
            查看课程
          </a>
        </>
      ),
    },
    {
      title: '操作',
      // dataIndex: 'action',
      key: 'action',
      render: (record: { id: string }) => (
        <>
          <Link to={`/course/edit/${record.id}`}>编辑</Link>
          &nbsp;
          <a onClick={ () => {handleRemove(record.id) }}>删除</a>
        </>
      ),
    },
  ];
  
  useEffect(() => {
    getDatas({ keywords });
  }, [keywords]);

  const getDatas = (params: object) => {
    // axios.get('/api/courseList', {params}).then((res: AxiosResponse<Data[]>) => {
    //   console.log(res);
    //   setDatas(res.data.datas);
    // });
    getList(params).then((res: Response) => {
      console.log(res);
      setDatas(res.datas as Data[]);
    });
  };

  const handleSearch = (keywords: string) => {
    console.log(keywords);
    setKeywords(keywords);
    // 搜索
    getDatas({ keywords });
  };

  const handleAdd = () => {
    history.push("/course/add");
  }

  return (
    <div>
      <Button type="default" onClick={handleAdd}>添加课程</Button>
      <Search
        placeholder="请输入搜索的课程名称"
        style={{ width: 200 }}
        onSearch={handleSearch}
      />
      <Table
        columns={columns}
        dataSource={datas}
        rowKey={(datas: { id: string }) => datas.id}
      />
    </div>
  );
};

export default index;
