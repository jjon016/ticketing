import {useState} from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/userequest';

const NewTicket = () =>{

  const [title,setTitle] = useState('');
  const [price,setPrice] = useState('');
  const {doRequest,errors} = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,price
    },
    onSuccess: (ticket) => Router.push('/'),
  });

  const makeTicket = (event) =>{
    event.preventDefault();
    doRequest();
  }

  const onPriceChange = () => {
    const value = parseFloat(price);
    if(isNaN(value)){
      return;
    }
    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <h1>Create a ticket</h1>
      <form onSubmit={makeTicket}>
        <div className="form-group mb-1">
          <label>Title</label>
          <input className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div className="form-group mb-1">
          <label>Price</label>
          <input className="form-control" value={price} onBlur={onPriceChange} onChange={(e)=>setPrice(e.target.value)} />
        </div>
        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
export default NewTicket;