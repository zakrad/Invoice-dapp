import axios from "axios";
const key = "g3bePnOEckrx3s86dR1arqnQ15yQuypE"

export class AppService {
  async createInvoice(amount, address) {
    const options = {
      method: 'POST',
      url: 'https://thentic.p.rapidapi.com/invoices/new',
      headers: {
        'content-type': 'application/json',
      },
      data: `{"key":"${key}","chain_id":97,"amount":${amount},"to":"${address}"}`
    };
    const response = await axios.request(options)
    console.log(response.data);
    return response.data
  }
  async showInvoice() {
    const options = {
      method: 'GET',
      url: 'https://thentic.p.rapidapi.com/invoices/all',
      params: { key: key, chain_id: '97' },
    };
    const response = await axios.request(options)
    const invoices = response.data
    console.log(response.data);
    return invoices.invoices
  }
  async deleteInvoice(id) {
    const options = {
      method: 'DELETE',
      url: 'https://thentic.p.rapidapi.com/invoices/cancel',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'c6058212e6mshe46237c67eef9eap12e0ebjsn9c657ef4cc3d',
        'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
      },
      data: `{"key":"${key}","chain_id":97,"request_id":"${id}"}`
    };
    const response = await axios.request(options)
    const invoices = response.data
    console.log(response.data);
    return invoices
  }
}