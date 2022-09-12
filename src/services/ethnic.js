import axios from "axios";

export class AppService {
  async createInvoice() {
    const options = {
      method: 'POST',
      url: 'https://thentic.p.rapidapi.com/invoices/new',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'c6058212e6mshe46237c67eef9eap12e0ebjsn9c657ef4cc3d',
        'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
      },
      data: '{"key":"g3bePnOEckrx3s86dR1arqnQ15yQuypE","chain_id":97,"amount":0.01,"to":"0xa2c67EaC1Cc3DD40441C9f631fb53D3c5BA2eC41"}'
    };
    const response = await axios.request(options)
    console.log(response.data);
    return response.data
  }
  async showInvoice() {
    const options = {
      method: 'GET',
      url: 'https://thentic.p.rapidapi.com/invoices/all',
      params: { key: 'g3bePnOEckrx3s86dR1arqnQ15yQuypE', chain_id: '97' },
      headers: {
        'X-RapidAPI-Key': 'c6058212e6mshe46237c67eef9eap12e0ebjsn9c657ef4cc3d',
        'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
      }
    };
    const response = await axios.request(options)
    const invoices = response.data
    console.log(response.data);
    return invoices.invoices
  }
}