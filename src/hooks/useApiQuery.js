import { useQuery,useMutation } from 'react-query';

export const useApiQuery = ({queryKey, serviceFunction, ...rest}) => {
  return useQuery(queryKey, serviceFunction, {...rest})
}

export const useMutationApiQuery = ({onSuccess, onError, serviceFunction}) => {
  return useMutation((body) => {
    return serviceFunction(body)
  }, {onSuccess, onError})
}
