import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import { use } from 'react';

const CreateConnection = () => {
  const [isReady, setIsReady] = useState(false);
  const {accessToken} = useSelector((state) => state.session);

  useEffect(() => {
    if (!accessToken) {
      setIsReady(true);
    }
  }, [accessToken]);

  if (!_.isNil(accessToken)) {
    return;
  }
}

export default CreateConnection;
