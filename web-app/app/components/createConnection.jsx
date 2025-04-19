import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';
import {Button, Form, Input, Flex} from 'antd';
import { faker } from '@faker-js/faker';
import {useCreateConnectSessionMutation, useCreateAccessTokenMutation} from '../features/apiSlice';
import {setCustomer} from '../features/sessionSlice';
import { useFinchConnect } from "@tryfinch/react-connect";

const CreateConnection = () => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [form] = Form.useForm();
  const {customer} = useSelector((state) => state.session);
  const [createConnectSession] = useCreateConnectSessionMutation();
  const [createAccessToken] = useCreateAccessTokenMutation();

  // Define the callback functions outside of _handleCreateSession
  const _onSuccess = ({code}) => {
    createAccessToken({code})
      .unwrap()
      .then((response) => {
        dispatch(setCustomer({customer: response}));
      })
      .catch((error) => {
        console.error('Error creating access token:', error);
      }).finally(() => {
        setIsProcessing(false);
      });
  };
  const _onError = ({errorMessage}) => {
    console.error('Error creating session: ', errorMessage);
    setIsProcessing(false);
  };
  const _onClose = () => {
    setIsProcessing(false);
  };

  const {open} = useFinchConnect({
    onSuccess: _onSuccess,
    onError: _onError,
    onClose: _onClose,
    clientId: import.meta.env.VITE_FINCH_CLIENT_ID,
    sandbox: 'finch',
    products: ['company', 'directory', 'individual', 'employment'],
  });

  const _handleCreateSession = async () => {
    setIsProcessing(true);
    const {customer_name, customer_email, customer_id} = form.getFieldsValue();
    const _createConnectSessionResponse = await createConnectSession({
      customer: {
        customer_name,
        customer_email,
        customer_id,
      },
    });
    if (_createConnectSessionResponse.error) {
      console.error('Error creating session:', _createConnectSessionResponse.error);
      setIsProcessing(false);
      return;
    }

    open({sessionId: _createConnectSessionResponse.data.session_id});
  }

  if (!_.isNil(customer)) {
    return;
  }

  return (
    <Flex vertical gap={'small'}>
      <Form
        layout={'vertical'}
        form={form}
        initialValues={{
          customer_name: faker.company.name(),
          customer_email: faker.internet.email(),
          customer_id: faker.string.uuid(),
        }}
      >
        <Form.Item
          label={<span style={{ color: 'white' }}>Customer Name</span>}
          name="customer_name"
          rules={[{required: true, message: 'Please input your customer name!'}]}
        >
          <Input placeholder="Customer Name" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: 'white' }}>Customer Email</span>}
          name="customer_email"
          rules={[{required: true, message: 'Please input your customer email!'}]}
        >
          <Input placeholder="Customer Email" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: 'white' }}>Customer ID</span>}
          name="customer_id"
          rules={[{required: true, message: 'Please input your customer ID!'}]}
        >
          <Input placeholder="Customer ID" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isProcessing}
            onClick={_handleCreateSession}
          >
            Create Connection
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default CreateConnection;
