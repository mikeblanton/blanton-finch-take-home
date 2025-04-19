import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Typography, Tabs, Flex, Spin, Descriptions} from 'antd';
import { useGetIndividualQuery } from '../features/apiSlice';
import _ from 'lodash';

const {Text} = Typography;

const IndividualInformation = () => {
  const {selectedEmployee} = useSelector((state) => state.session);
  const [skip, setSkip] = useState(true);
  const {data, isLoading, error} = useGetIndividualQuery({individualId: selectedEmployee}, {skip, refetchOnMountOrArgChange: true});

  useEffect(() => {
    setSkip(_.isNil(selectedEmployee));
  }, [selectedEmployee]);

  if (isLoading) {
    return <Flex justify={'center'} align={'center'} style={{minHeight: '50vh', width: '100%'}}><Spin size='large' /></Flex>;
  }

  console.log('IndividualInformation', {data, isLoading, error});

  const _getEmails = emails => {
    return (
      <Flex vertical gap={'small'}>
        {_.map(emails, email => (
          <Text key={email.data}>{email.data} ({email.type})</Text>
        ))}
      </Flex>
    );
  }

  const _getPhoneNumbers = phoneNumbers => {
    return (
      <Flex vertical gap={'small'}>
        {_.map(phoneNumbers, phoneNumber => (
          <Text key={phoneNumber.data}>{phoneNumber.data} ({phoneNumber.type})</Text>
        ))}
      </Flex>
    );
  }

  const _getResidence = residence => {
    if (_.isNil(residence)) {
      return;
    }

    return (
      <Flex vertical gap={'small'}>
        <Text>{residence.line1}</Text>
        <Text>{residence.line2}</Text>
        <Text>{residence.city}, {residence.state} {residence.postal_code} {residence.country}</Text>
        <Text>Name: {residence.name}</Text>
        <Text>Source ID: {residence.source_id}</Text>
      </Flex>
    )
  }

  const individual = _.get(data, 'responses[0].body', {});
  const items = [
    {
      key: '1',
      label: 'First Name',
      children: <Text>{_.get(individual, 'first_name')}</Text>
    },
    {
      key: '2',
      label: 'Middle Name',
      children: <Text>{_.get(individual, 'middle_name')}</Text>
    },
    {
      key: '3',
      label: 'Last Name',
      children: <Text>{_.get(individual, 'last_name')}</Text>
    },
    {
      key: '4',
      label: 'Preferred Name',
      children: <Text>{_.get(individual, 'preferred_name')}</Text>
    },
    {
      key: '5',
      label: 'Emails',
      children: _getEmails(_.get(individual, 'emails', []))
    },
    {
      key: '6',
      label: 'Phone Numbers',
      children: _getPhoneNumbers(_.get(individual, 'phone_numbers', []))
    },
    {
      key: '7',
      label: 'Gender',
      children: <Text>{_.get(individual, 'gender')}</Text>
    },
    {
      key: '8',
      label: 'Ethnicity',
      children: <Text>{_.get(individual, 'ethnicity')}</Text>
    },
    {
      key: '9',
      label: 'Date of Birth',
      children: <Text>{_.get(individual, 'dob')}</Text>
    },
    {
      key: '10',
      label: 'Residence',
      children: _getResidence(_.get(individual, 'residence', null))
    }
  ]

  return (
    <Descriptions items={items} />
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
      children: <IndividualInformation />
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
    <Flex flex={1} vertical gap={'small'} style={{width: '100%'}}>
      <Tabs defaultactiveKey={'1'} items={items} width={'100%'}/>
    </Flex> 
  );
}

export default Employee;
