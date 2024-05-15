import { HttpsProxyAgent } from 'https-proxy-agent';
import axios from 'axios';

// Create the HttpsProxyAgent instance
const proxyUrl = 'http://118.172.239.231:8180'; 
const httpsAgent = new HttpsProxyAgent(proxyUrl);

// Create an axios instance with the proxy agent
const axiosInstance = axios.create({
  httpsAgent
});

(async () => {
  try {
    let response = await axiosInstance.get('https://httpbin.org/ip');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
})();

