import Api from './src/api';

const api = new Api();
const username = process.argv[2];

api
  .getEvents(username)
  .then((value: any) => {
    const repo = Object.keys(value)[0];
    const data: Array<any> = value[repo];

    console.log('Output: ');
    data.forEach((event: any) => {
      console.log(`- ${event.message} to ${repo}`);
    });
  })
  .catch((error) => {
    console.log(`Username: ` + error);
  });
