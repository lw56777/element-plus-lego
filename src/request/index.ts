// import axios from 'axios';

const tableData = [
  {
    name: 'Tom',
    region: 'beijing',
    date1: '2025-05-03',
    date2: '2025-12-30',
    delivery: true,
    type: ['Online activities', 'Promotion activities'],
    resource: 'Sponsorship',
    desc: 'I am a description',
  },
  {
    name: 'Susan',
    region: 'shanghai',
    date1: '2024-09-20',
    date2: '2024-10-30',
    delivery: false,
    type: ['Offline activities', 'Simple brand exposure'],
    resource: 'Venue',
    desc: 'I am a description',
  },
];

export const getTableData = (params: any) => {
  console.log('getTableData', params);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: {
          list: Array.from(
            { length: params.pageSize || tableData.length },
            () => tableData[Math.floor(Math.random() * tableData.length)],
          ),
          total: params.pageSize * Math.floor(Math.random() * 100),
        },
        message: 'success',
      });
    }, 1000);
  });

  // return axios.get('http://localhost:3000/list', { params });
};
