import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Typography, Tabs, Flex, Spin, Descriptions} from 'antd';
import { useGetIndividualQuery, useGetEmploymentQuery } from '../features/apiSlice';
import _ from 'lodash';

const {Text} = Typography;

const IndividualInformation = () => {
  const {selectedEmployee} = useSelector((state) => state.session);
  const [skip, setSkip] = useState(true);
  const {data, isFetching, error} = useGetIndividualQuery({individualId: selectedEmployee}, {skip, refetchOnMountOrArgChange: true});

  useEffect(() => {
    setSkip(_.isNil(selectedEmployee));
  }, [selectedEmployee]);

  if (isFetching) {
    return <Flex justify={'center'} align={'center'} style={{minHeight: '50vh', width: '100%'}}><Spin size='large' /></Flex>;
  }

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

const EmploymentInformation = () => {
  const {selectedEmployee} = useSelector((state) => state.session);
  const [skip, setSkip] = useState(true);
  const {data, isFetching, error} = useGetEmploymentQuery({individualId: selectedEmployee}, {skip, refetchOnMountOrArgChange: true});

  useEffect(() => {
    setSkip(_.isNil(selectedEmployee));
  }, [selectedEmployee]);

  if (isFetching) {
    return <Flex justify={'center'} align={'center'} style={{minHeight: '50vh', width: '100%'}}><Spin size='large' /></Flex>;
  }

  const _getCustomFields = customFields => {
    return (
      <Flex vertical gap={'small'}>
        {_.map(customFields, customField => (
          <Text key={customField.name}>{customField.name}={customField.value}</Text>
        ))}
      </Flex>
    );
  }

  const _getIncomeHistory = incomeHistories => {
    return (
      <Flex vertical gap={'small'}>
        {_.map(incomeHistories, incomeHistory => (
          <Text>{_.get(incomeHistory, 'amount')} {_.get(incomeHistory, 'currency')} ({_.get(incomeHistory, 'unit')}). Effective {_.get(incomeHistory, 'effective_date')}</Text>
        ))}
      </Flex>
    );
  }

  const _getLocation = location => {
    if (_.isNil(location)) {
      return;
    }

    return (
      <Flex vertical gap={'small'}>
        <Text>{location.line1}</Text>
        <Text>{location.line2}</Text>
        <Text>{location.city}, {location.state} {location.postal_code} {location.country}</Text>
        <Text>Name: {location.name}</Text>
        <Text>Source ID: {location.source_id}</Text>
      </Flex>
    )
  }

  const employment = _.get(data, 'responses[0].body', {});
  const items = [
    {
      key: '1',
      label: 'First Name',
      children: <Text>{_.get(employment, 'first_name')}</Text>
    },
    {
      key: '2',
      label: 'Middle Name',
      children: <Text>{_.get(employment, 'middle_name')}</Text>
    },
    {
      key: '3',
      label: 'Last Name',
      children: <Text>{_.get(employment, 'last_name')}</Text>
    },
    {
      key: '4',
      label: 'Title',
      children: <Text>{_.get(employment, 'title')}</Text>
    },
    {
      key: '5',
      label: 'Manager',
      children: <Text>{_.get(employment, 'manager.id')}</Text>
    },
    {
      key: '6',
      label: 'Department',
      children: <Text>{_.get(employment, 'department.name')}</Text>
    },
    {
      key: '7',
      label: 'Employment',
      children: <Text>{_.get(employment, 'employment.type')} ({_.get(employment, 'employment.subtype')})</Text>
    },
    {
      key: '8',
      label: 'Start Date',
      children: <Text>{_.get(employment, 'start_date')}</Text>
    },
    {
      key: '9',
      label: 'End Date',
      children: <Text>{_.get(employment, 'end_date')}</Text>
    },
    {
      key: '10',
      label: 'Latest Rehire Date',
      children: <Text>{_.get(employment, 'latest_rehire_date')}</Text>
    },
    {
      key: '11',
      label: 'Is Active',
      children: <Text>{_.get(employment, 'is_active') ? 'Yes' : 'No'}</Text>
    },
    {
      key: '12',
      label: 'Employment Status',
      children: <Text>{_.get(employment, 'employment_status')}</Text>
    },
    {
      key: '13',
      label: 'Class Code',
      children: <Text>{_.get(employment, 'class_code')}</Text>
    },
    {
      key: '14',
      label: 'Location',
      children: _getLocation(_.get(employment, 'location', null))
    },
    {
      key: '15',
      label: 'Income',
      children: <Text>{_.get(employment, 'income.amount')} {_.get(employment, 'income.currency')} ({_.get(employment, 'income.unit')}). Effective {_.get(employment, 'income.effective_date')}</Text>
    },
    {
      key: '16',
      label: 'Income History',
      children: _getIncomeHistory(_.get(employment, 'income_history', []))
    },
    {
      key: '17',
      label: 'Custom Fields',
      children: _getCustomFields(_.get(employment, 'custom_fields', []))
    },
    {
      key: '18',
      label: 'Source ID',
      children: <Text>{_.get(employment, 'source_id')}</Text>
    }
  ]

  return (
    <Descriptions items={items} />
  );
}

const Employee = () => {
  const {customer, selectedEmployee} = useSelector((state) => state.session);
  const [activeKey, setActiveKey] = useState('1');

  useEffect(() => {
    setActiveKey('1');
  }, [selectedEmployee]);

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
      children: <EmploymentInformation />
    }
  ]

  return (
    <Flex flex={1} vertical gap={'small'} style={{width: '100%'}}>
      <Tabs defaultActiveKey={'1'} items={items} width={'100%'} activeKey={activeKey} onChange={(activeKey) => setActiveKey(activeKey)} />
    </Flex> 
  );
}

export default Employee;
