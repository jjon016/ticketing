import Router from 'next/router';
import useRequest from '../../hooks/userequest';
import {useEffect, useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';

const OrderShow = ({order, currentUser}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const {doRequest,errors} = useRequest({
    url:'/api/payments',
    method: 'post',
    body:{
      orderId: order.id
    },
    onSuccess: (payment)=>{
      console.log(payment)
    }
  })

  useEffect(()=>{
    const findTimeLeft = () =>{
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft,1000);
    return () =>{
      clearInterval(timerId);
    };
  },[]);
 
  if(timeLeft < 0){
    return <div><h4>Order expired</h4></div>
  }
  
  return <div>
    <h4>Expires in {timeLeft} seconds</h4>
    
    <StripeCheckout 
      token={({id})=>doRequest({tocken:id})}
      stripeKey="pk_test_51J5DiZKgrsO6KibK1DDUBVB2GrAi2m9uib9bwibukc7aVV2PnjJUaBYcysxjlNlUibbkZYqWUcah0ikXp8kxiXhe00EyUVWnbZ"
      amount={order.ticket.price * 100}
      email={currentUser.email}
    />
    {errors}
  </div>
};

OrderShow.getInitialProps = async (context, client) =>{
  const {orderId} = context.query;
  const {data} = await client.get(`/api/Orders/${orderId}`);
  return {order: data};
};

export default OrderShow;