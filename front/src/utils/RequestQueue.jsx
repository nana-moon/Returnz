export default class RequestQueue {
  constructor() {
    this.queue = Promise.resolve();
  }

  async addRequest(requestFn) {
    const request = async () => {
      try {
        const result = await requestFn();
        // console.error('API request succeed:', result);
        return result; // Added return statement
      } catch (error) {
        console.error('API request failed:', error);
        return null; // Return null on failure, to allow the queue to continue
      }
    };

    this.queue = this.queue.then(request);
    return this.queue;
  }
}
