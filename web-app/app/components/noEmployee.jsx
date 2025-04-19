import React from 'react';
import {useSelector} from 'react-redux';
import {Typography} from 'antd';
import _ from 'lodash';

const {Text} = Typography;

const NoEmployee = () => {
  const {customer, selectedEmployee} = useSelector((state) => state.session);

  if (_.isNil(customer) || !_.isNil(selectedEmployee)) {
    return null;
  }

  return <Text>Please select an employee.</Text>;
}

export default NoEmployee;
