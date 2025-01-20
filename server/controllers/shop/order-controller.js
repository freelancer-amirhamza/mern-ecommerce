const paypal = require("../../config/paypal");
const Cart = require("../../models/Cart");
const Order = require("../../models/Order");
const Product = require("../../models/Product");




const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'mysho65da069a5577d'
const store_passwd = 'mysho65da069a5577d@ssl'
const is_live = false //true for live, false for sandbox

const createNewOrder = async (req, res) => {
   try {
      const {
         userId,
         cartId,
         cartItems,
         addressInfo,
         orderStatus,
         paymentMethod,
         paymentStatus,
         totalAmount,
         orderDate,
         orderUpdateDate,
         paymentId,
         payerId,
      } = req.body;

      const data = {
         userId,
         cartId,
         cartItems,
         addressInfo,
         orderStatus,
         paymentMethod,
         paymentStatus,
         orderDate,
         orderUpdateDate,
         paymentId,
         payerId,
         total_amount: totalAmount,
         tran_id: 'REF123', // use unique tran_id for each api call
         success_url: 'http://localhost:5173/shop/home/',
         fail_url: 'http://localhost:5173/shop/paypal-return',
         cancel_url: 'http://localhost:5173/shop/paypal-cancel',
         ipn_url: 'http://localhost:3030/ipn',
         shipping_method: 'Courier',
         product_name: 'Computer.',
         product_category: 'Electronic',
         product_profile: 'general',
         cus_name: 'Customer Name',
         cus_email: 'customer@example.com',
         cus_add1: 'Dhaka',
         cus_add2: 'Dhaka',
         cus_city: 'Dhaka',
         cus_state: 'Dhaka',
         cus_postcode: '1000',
         cus_country: 'Bangladesh',
         cus_phone: '01711111111',
         cus_fax: '01711111111',
         ship_name: 'Customer Name',
         ship_add1: 'Dhaka',
         ship_add2: 'Dhaka',
         ship_city: 'Dhaka',
         ship_state: 'Dhaka',
         ship_postcode: 1000,
         ship_country: 'Bangladesh',
      }

     const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.status(200).send({approvalURL: GatewayPageURL})
        console.log('Redirecting to: ', apiResponse)
    });

    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
   });
   await newlyCreatedOrder.save();

   
   } catch (error) {
      console.log(error)
      res.status(500).json({
         success: false,
         message: "something is wrong!"
      })
   }
}

const createOrder = async (req, res) => {
   try {
      const {
         userId,
         cartId,
         cartItems,
         addressInfo,
         orderStatus,
         paymentMethod,
         paymentStatus,
         totalAmount,
         orderDate,
         orderUpdateDate,
         paymentId,
         payerId,
      } = req.body;

      const create_payment_json = {
         intent: "sale",
         payer: {
            payment_method: "paypal"
         },
         redirect_urls: {
            return_url: "http://localhost:5173/shop/paypal-return",
            cancel_url: "http://localhost:5173/shop/paypal-cancel"
         },
         transactions: [
            {
               item_list: {
                  items: cartItems.map(item => ({
                     name: item.title,
                     sku: item.productId,
                     price: item.price.toFixed(2),
                     currency: "USD",
                     quantity: item.quantity,
                  }))
               },
               amount: {
                  currency: "USD",
                  total: totalAmount.toFixed(2),
               },
               description: "description"
            }
         ]
      };

      paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
         if (error) {
            console.log(error);
            return res.status(500).json({
               success: false,
               message: "Error while creating Paypal payment",
            });
         } else {
            const newlyCreatedOrder = new Order({
               userId,
               cartId,
               cartItems,
               addressInfo,
               orderStatus,
               paymentMethod,
               paymentStatus,
               totalAmount,
               orderDate,
               orderUpdateDate,
               paymentId,
               payerId,
            });
            await newlyCreatedOrder.save();
            const approvalURL = paymentInfo.links.find(
               (link) => link.rel === "approval_url").href;
            res.status(200).json({
               success: true,
               approvalURL,
               orderId: newlyCreatedOrder._id,
            })
         }
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         success: false,
         message: "Something is wrong!",
      });
   }
};

const capturePayment = async (req, res) => {
   try {
      const { paymentId, payerId, orderId } = req.body;

      let order = await Order.findById(orderId);
      if (!order) {
         return res.status(404).json({
            success: false,
            message: "The Order cannot be found!"
         })
      };
      order.orderStatus = "confirmed";
      order.paymentStatus = "paid";
      order.paymentId = paymentId;
      order.payerId = payerId;

      for (let item of order.cartItems) {
         let product = await Product.findById(item.productId);

         if (!product) {
            return res.status(404).json({
               success: false,
               message: `Not enough stock for this product ${product.title}`
            })
         }

         product.totalStock -= item.quantity;

         await product.save();
      }

      const getCartId = order?.cartId;
      await Cart.findByIdAndDelete(getCartId);

      await order.save();

      res.status(200).json({
         success: true,
         message: "The Order confirmed successfully!",
         data: order,
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({
         success: false,
         message: "Something is wrong!",
      });
   }
};

const getOrdersByUser = async (req, res) => {
   try {
      const { userId } = req.params;
      const orders = await Order.find({ userId });
      if (!orders.length) {
         return res.status(404).json({
            success: false,
            message: "Orders not found!"
         })
      }
      res.status(200).json({
         success: true,
         data: orders,
      })
   } catch (error) {
      console.log(error)
      return res.status(500).json({
         success: false,
         message: error.message,
      })
   }
};

const getOrderDetails = async (req, res) => {
   try {
      const { id } = req.params;
      const order = await Order.findById(id);
      if (!order) {
         return res.status(404).json({
            success: false,
            message: "The order not found!"
         })
      }
      res.status(200).json({
         success: false,
         data: order,
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({
         success: false,
         message: "Something is wrong!"
      })
   }
}

module.exports = { createOrder,createNewOrder, capturePayment, getOrdersByUser, getOrderDetails };
