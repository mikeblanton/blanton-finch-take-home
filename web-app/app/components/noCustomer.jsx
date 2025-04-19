import React from 'react';
import {useSelector} from 'react-redux';
import {Typography} from 'antd';
import _ from 'lodash';

const {Text} = Typography;

const NoData = () => {
  const {customer} = useSelector((state) => state.session);

  if (!_.isNil(customer) && !_.isEmpty(customer)) {
    return null;
  }

  return <Text>Please create a connection to begin.</Text>;
}

export default NoData;
