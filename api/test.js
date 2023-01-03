const axios = require('axios');

exports.getTestApiList = () => {
    const data = {
        name: 'John Doe',
        job: 'Content Writer'
      }
      
      const fetchUsers = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:'+ (window.location.port ? ':' + window.location.port: '') +'/api_test/public/api/test', data);
          console.log(`Status: ${response.status}`)
          return response.data
        //   console.log('Body: ', res.data)
        //   return res.data;
        } catch (err) {
          console.error(err)
        }
      }
    //   return fetchUsers();
      const promise = fetchUsers();

        // using .then, create a new promise which extracts the data
        const dataPromise = promise.then((response) => response)

        // return it
        return dataPromise;
}

exports.sendData = (data) => {
    // const data = {
    //     name: 'John Doe',
    //     job: 'Content Writer'
    //   }
      
      const fetchUsers = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:'+ (window.location.port ? ':' + window.location.port: '') +'/api_test/public/api/test/store', data);
          console.log(`Status: ${response.status}`)
          return response.data
        //   console.log('Body: ', res.data)
        //   return res.data;
        } catch (err) {
          console.error(err)
        }
      }
    //   return fetchUsers();
      const promise = fetchUsers();

      // using .then, create a new promise which extracts the data
      const dataPromise = promise.then((response) => response)

      // return it
      return dataPromise;
}