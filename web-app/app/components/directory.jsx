import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Flex, Typography, List, Spin, Menu, Divider} from 'antd';
import { useGetCompanyQuery, useGetDirectoryQuery } from "../features/apiSlice";
import { setSelectedEmployee } from '../features/sessionSlice';
import _ from 'lodash';
import {Info} from 'lucide-react';

const {Text, Title} = Typography;

const Directory = () => {
  const {customer, selectedEmployee} = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const {data, isLoading, error} = useGetDirectoryQuery({}, {skip, refetchOnMountOrArgChange: true});

  useEffect(() => {
    console.log('Setting skip', _.isNil(_.get(customer, 'access_token')))
    setSkip(_.isNil(_.get(customer, 'access_token')));
  }, [customer]);

  if (_.isNil(_.get(customer, 'access_token'))) {
    return;
  }

  console.log('Data loaded', {data});

  return (
    <React.Fragment>
      <Flex vertical gap={'medium'}>
        <Title style={{color: 'white'}} level={5}>Company Directory</Title>
        {isLoading && <Spin size='small' />}
        {error && <Text style={{color: 'white'}}>Error: {_.get(error, 'data.error')} ({_.get(error, 'status')})</Text>}
        {data && (
          <Menu
            theme='dark'
            mode='inline'
            split={true}
            defaultSelectedKeys={[selectedEmployee]}
            items={_.map(_.get(data, 'individuals', []), (item) => ({
              key: item.id,
              label: _.join([item.first_name, item.middle_name, item.last_name], ' '),
            }))}
            onSelect={(item) => {
              console.log('Selected item:', item);
              dispatch(setSelectedEmployee({selectedEmployee: item.key}));
            }}
          />
        )}
      </Flex>
    </React.Fragment>
  );
}

export default Directory;
