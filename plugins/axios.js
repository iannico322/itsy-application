import axios from "axios";
axios.defaults.baseURL = "https://itsy322.pythonanywhere.com/api/v1/"
axios.defaults.headers.get['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios