import axios from 'axios';

export default class Api {
  private generateURL(username: string) {
    return `https://api.github.com/users/${username}/events`;
  }

  getEvents(username: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.generateURL(username))
        .then((response) => {
          let data = response.data
            .map((event: any) => {
              return {
                commits: event.payload.commits,
                repo: event.repo.name,
              };
            })
            .filter((value: { commits: Array<string> | undefined }) => value.commits !== undefined);

          let dataTemp: { [key: string]: Array<string> } = {};
          data.forEach((value: { commits: Array<string> | undefined; repo: string }) => {
            if (!dataTemp[value.repo]) {
              dataTemp[value.repo] = [];
            }
            for (let commit of value.commits!) {
              dataTemp[value.repo].push(commit);
            }
          });
          resolve(dataTemp);
        })
        .catch((error) => {
          reject(error.response.data.message);
        });
    });
  }
}
