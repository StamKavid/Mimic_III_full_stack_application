import axios from '../../utils/Axios'

export const getStats = () => axios
    .get("stats/")
    .then(response => {
      return response.data;
    })
    .catch(reason => {
      console.error("Error fetching stats " , reason)
    })

