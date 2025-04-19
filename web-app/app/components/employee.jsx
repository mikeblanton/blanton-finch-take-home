import React from 'react';
import {useSelector} from 'react-redux';
import {Typography, Tabs} from 'antd';
import _ from 'lodash';

const {Text} = Typography;

const IndividualInformation = () => {
  const {selectedEmployee} = useSelector((state) => state.session);

  return (
    <Text>
      {_.get(selectedEmployee, 'first_name')} {_.get(selectedEmployee, 'middle_name')} {_.get(selectedEmployee, 'last_name')}
    </Text>
  );
}

const Employee = () => {
  const {customer, selectedEmployee} = useSelector((state) => state.session);

  console.log('Employee', {customer, selectedEmployee});

  if (_.isNil(customer) || _.isNil(selectedEmployee)) {
    return null;
  }

  const items = [
    {
      key: '1',
      label: 'Individual Information',
      children: (
        <Text>
          {_.get(selectedEmployee, 'first_name')} {_.get(selectedEmployee, 'middle_name')} {_.get(selectedEmployee, 'last_name')}
        </Text>
      )
    },
    {
      key: '2',
      label: 'Employment Data',
      children: (
        <Text>
          {_.get(selectedEmployee, 'email')} {_.get(selectedEmployee, 'phone_number')}
        </Text>
      )
    }
  ]

  return (
    <Tabs defaultactiveKey={'1'} items={items} />
  );
}

export default Employee;
