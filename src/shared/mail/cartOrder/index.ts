import { CartOrderType } from '@/entities/leads/api';

export const cartOrderTemplate = (data: CartOrderType, orderNumber: number) => `
            <html>
                  <head>
                    <meta charSet="UTF-8" />
                    <title>Подтверждение заказа</title>
                    <style>{\`
                      body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                      }
                      .header {
                        background-color: #f8f8f8;
                        padding: 20px;
                        text-align: center;
                        border-radius: 5px 5px 0 0;
                      }
                      .order-info {
                        background-color: #fff;
                        padding: 20px;
                        border-left: 1px solid #eee;
                        border-right: 1px solid #eee;
                      }
                      .products-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                      }
                      .products-table th {
                        background-color: #f8f8f8;
                        text-align: left;
                        padding: 10px;
                      }
                      .products-table td {
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                      }
                      .footer {
                        background-color: #f8f8f8;
                        padding: 20px;
                        text-align: center;
                        border-radius: 0 0 5px 5px;
                        font-size: 0.9em;
                        color: #777;
                      }
                      .total {
                        font-weight: bold;
                        text-align: right;
                        font-size: 1.1em;
                      }
                    \`}</style>
                  </head>
                <div className="header">
                  <h1>Новый заказ №${orderNumber}</h1>
                  <p>Благодарим вас за заказ!</p>
                </div>
                <div>
                  <h2>Информация о клиенте</h2>
                  <p><strong>Имя:</strong> ${data?.delivery?.name}</p>
                  <p><strong>Телефон:</strong> ${data?.delivery?.phone}</p>
                  <p><strong>Email:</strong> ${data?.delivery?.email}</p>
                  <p><strong>Адрес доставки:</strong> ${data?.delivery?.address}</p>
                  <p><strong>Способ оплаты:</strong> ${data?.payment}</p>
                </div>
                <div className="order-info">
                  <h2>Состав заказа</h2>
                  <table className="products-table">
                    <thead>
                      <tr>
                        <th>Товар</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th>Сумма</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${data?.products?.map(
                          (product) => `
                      <tr>
                          <td>${product?.product?.name}</td>
                          <td>${product?.count}</td>
                          <td>${product?.product?.price} ₽</td>
                          <td>${(product.product.price ?? 0) * product?.count} ₽</td>
                      </tr>
                      `
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3} className="total">Итого:</td>
                        <td className="total">${data?.products?.reduce((acc, product) => acc + (product.product.price ?? 0) * product?.count, 0)} ₽</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="footer">
                  <p>© InterestMebel. Все права защищены.</p>
                </div>
              </body>
            </html>
            `;
