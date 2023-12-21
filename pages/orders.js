import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    });
  }, []);

  const [answer, setAnswer] = useState('No');

  const toggleAnswer = () => {
    setAnswer(answer === 'No' ? 'Yes' : 'No');
  };


  return (
    <Layout>
      <h1>Comenzi</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Dată</th>
            <th>Destinatar</th>
            <th>Produse</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && orders.map(order => (
            <tr key={order._id}>
              <td>{(new Date(order.createdAt)).toLocaleString()}
              </td>

              <td>
                Nume: {order.name} <br />
                Mail: {order.email}<br />
                Telefon: 0{order.phone}<br />
              </td>
              <td>
                {order.line_items.map(l => (
                  <>
                    {l.price_data?.product_data.name} x
                    {l.quantity}<br />{l.price_data?.product_data.options}
                  </>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}