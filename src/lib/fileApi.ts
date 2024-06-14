import {apiClient} from './apiClient';

export const uploadFile = async( file: FormData ) => {
  try {
    const { data } = await apiClient.post('/file/upload', file);
    return data;
  }
  catch(e) {
    console.log(e);
  }
}