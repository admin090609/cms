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
  return (
    <Layout>
      <h1>Comenzi</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Dată</th>
            <th>Destinatar</th>
            <th>Produse</th>
            <th>Comanda Completată</th>
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
                Adresă: {order.streetAddress}, {order.city}<br />
              </td>
              <td>
                {order.line_items.map(l => (
                  <>
                    {l.price_data?.product_data.name} x
                    {l.quantity}<br />
                  </>
                ))}
              </td>
              <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                {order.paid ? 'Da' : 'Nu'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}