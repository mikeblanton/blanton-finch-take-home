import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Flex, Typography, Button, Modal, Descriptions, Spin} from 'antd';
import { useGetCompanyQuery } from "../features/apiSlice";
import _ from "lodash";
import {Info} from 'lucide-react';

const {Text, Title} = Typography;

const Directory = () => {
  const {customer} = useSelector((state) => state.session);
  const [skip, setSkip] = useState(true);
  const {data, isLoading, error} = useGetCompanyQuery({skip});
  const [items, setItems] = useState([]);

  useEffect(() => {
    setSkip(!_.isNil(_.get(customer, 'access_token')));
  }, [customer]);

  const _getDepartments = (departments) => {
    return (
      <Flex vertical gap={'small'}>
        {
          _.map(departments, department => (<Text>{department.name}</Text>))
        }
      </Flex>
    )
  }

  const _getLocations = (locations) => {
    return (
      <Flex vertical gap={'small'}>
        {
          _.map(locations, location => (<Text>{location.line1} {location.line2}, {location.city} {location.state} {location.postal_code}</Text>))
        }
      </Flex>
    )
  }

  const _getAccounts = (accounts) => {
    return (
      <Flex vertical gap={'small'}>
        {
          _.map(accounts, account => (<Text>{account.institution_name} - {account.account_name} ({account.account_type} - {account.account_number})</Text>))
        }
      </Flex>
    )
  }

  useEffect(() => {
    console.log('Data loaded', {data});
    if (data) {
      const _items = [];
      _items.push({
        key: '1',
        label: 'Legal Name',
        children: _.get(data, 'legal_name'),
      });
      _items.push({
        key: '2',
        label: 'EIN',
        children: _.get(data, 'ein'),
      });
      _items.push({
        key: '3',
        label: 'Entity Type',
        children: _.get(data, 'entity.type'),
      });
      _items.push({
        key: '4',
        label: 'Primary Email',
        children: _.get(data, 'primary_email'),
      });
      _items.push({
        key: '5',
        label: 'Primary Phone',
        children: _.get(data, 'primary_phone_number'),
      });
      _items.push({
        key: '6',
        label: 'Departments',
        children: _getDepartments(_.get(data, 'departments', [])),
      });
      _items.push({
        key: '7',
        label: 'Locations',
        children: _getLocations(_.get(data, 'locations', [])),
      });
      _items.push({
        key: '8',
        label: 'Accounts',
        children: _getAccounts(_.get(data, 'accounts', [])),
      });
      setItems(_items);
    }
  }, [data]);

  if (_.isNil(_.get(customer, 'access_token'))) {
    return;
  }

  return (
    <React.Fragment>
      <Flex vertical gap={'medium'}>
        <Title style={{color: 'white'}} level={5}>Company Information</Title>
        {isLoading && <Spin size='small' />}
        {error && <Text>Error: {error.message}</Text>}
        {data && (
          <Flex justify={'space-between'} align={'center'}>
            <Flex gap={'small'}>
              <Text style={{color: 'white'}} strong>Legal Name:</Text>
              <Text style={{color: 'white'}}>{_.get(data, 'legal_name')}</Text>
            </Flex>
            <Button type='text' size='small' onClick={() => setIsCompanyInfoModalOpen(true)} icon={<Info size={16} style={{color: 'white'}} />} />
          </Flex>
        )}
      </Flex>
      <Modal title={'Company Information'} open={isCompanyInfoModalOpen} onCancel={() => setIsCompanyInfoModalOpen(false)} footer={null} width={'75vw'}>
        <Descriptions items={items} />
      </Modal>
    </React.Fragment>
  );
}

export default Directory;
