import axios from '../api/axios';
import useAuth from './useAuth';


const useRefreshToken = () => {

  const { setAuth } = useAuth();

  const refresh = async () => {

    const response = await axios.get('/refresh', {
      headers: {
        'Access-Control-Allow-Origin' : 'http://localhost:3000'
      },
      withCredentials: true,
    });

    setAuth(prev => {
      return { ...prev, 
        accessToken: response.data.accessToken,
        role: response.data.role,
      }
    });

    return response.data.accessToken;
  }

  return refresh;
}

export default useRefreshToken;