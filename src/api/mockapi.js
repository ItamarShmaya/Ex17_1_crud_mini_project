import axios from "axios";

const KEY = "628e0a18a339dfef87a676ce";

export default axios.create({
  baseURL: `https://${KEY}.mockapi.io`,
});
