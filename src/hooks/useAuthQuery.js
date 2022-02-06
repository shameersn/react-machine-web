import { useMutation } from 'react-query';
import {login, register} from '../services/Auth';

export const useLoginQuery = ({onSuccess, onError}) => {
  return useMutation((body) => {
    return login(body)
  }, {onSuccess, onError})
}

export const useRegisterQuery = ({onSuccess, onError}) => {
  return useMutation((body) => {
    return register(body)
  }, {onSuccess, onError})
}
