import { Button, Card, Input, InputNumber, Layout, Menu, Space, Row, Col, Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import './App.css';
import { AppService } from './services/ethnic.js'

const appService = new AppService()

const items = ['Invoice', 'Wallet', 'Nft']
const { Header, Content, Footer } = Layout;

function App() {
  const [invoice, setInvoice] = useState([])
  const [id, setId] = useState("")
  const [amount, setAmount] = useState(0)
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)

  console.log(invoice)

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };


  const create = async (amount, address) => {
    try {
      setLoading(true)
      await appService.createInvoice(amount, address)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  const remove = async (id) => {
    try {
      setLoading(true)
      await appService.deleteInvoice(id)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function show() {
      try {
        setInvoice(await appService.showInvoice())
      } catch (e) {
        console.log(e)
      }
    }
    show()
  }, [loading])

  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: items[index],
          }))}
        />
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
          marginTop: 64,
        }}
      >

        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
              <Card
                className="m-2"
                title="Create Invoice"
                style={{
                  width: 300,
                }}
              >
                <span>
                  <Space>
                    <p>BNB Amount:</p>
                    <Input onChange={onChangeAmount} value={amount} />
                  </Space>
                </span>
                <span>
                  <Space>
                    <p>Address:</p>
                    <Input onChange={onChangeAddress} placeholder="Receiver" />
                  </Space>
                </span>
                <div className="d-flex flex-row-reverse">
                  <Button className="mt-2" type="primary" onClick={async () => { create(amount, address) }} >Create</Button>
                </div>
              </Card>
              <Card
                className="m-2"
                title="Cancel Invoice"
                style={{
                  width: 300,
                }}
              >
                <span>
                  <Space>
                    <p>Invoice ID:</p>
                    <Input onChange={onChangeId} value={id} />
                  </Space>
                </span>
                <div className="d-flex flex-row-reverse">
                  <Button className="mt-2" type="primary" danger onClick={async () => { remove(id) }} >Delete</Button>
                </div>
              </Card>
            </Col>
            <Col className="gutter-row d-flex-row" span={18}>
              {invoice.map((invoice, i) => (
                <Badge.Ribbon text={invoice.status === "success" ? "Already Paid" : invoice.status === "pending" ? "Not paid" : invoice.status === "cancelled" ? "Invoice Cancelled" : ''} color={invoice.status === "success" ? "green" : invoice.status === "pending" ? "yellow" : invoice.status === "cancelled" ? "red" : ''}>
                  <Card Card
                    title={`Invoice ID #${invoice.request_id}`}
                    className="m-1"
                  >
                    <p>BNB Amount: {invoice.amount}</p>
                    <p>Receiver: {invoice.invoice_to}</p>
                    {invoice.status === "pending" ? <div className="d-flex flex-row-reverse">
                      <Button className="mt-2" type="primary" onClick={() => {
                        window.open(invoice.transaction_url, "_blank")
                      }}>Pay</Button>
                    </div> : ''}
                  </Card>
                </Badge.Ribbon>
              ))}
            </Col>
          </Row>

        </div>
      </Content >
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Zakrad | Ethnic Api
      </Footer>
    </Layout >
  );
}

export default App;

