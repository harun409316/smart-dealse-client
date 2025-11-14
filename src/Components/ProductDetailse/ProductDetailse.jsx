import React, { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContex";
import Swal from "sweetalert2";

const ProductDetailse = () => {
  const { _id: productId } = useLoaderData();
  const [bids, setBids]  = useState([])
  const bidModalRef = useRef(null);
  const { user } = useContext(AuthContext);

  //   console.log('Loaded product:', product);

  useEffect(() => {
    if (!user?.accessToken) return;
     fetch(`http://localhost:5000/products/bids/${productId}`,{
      headers:{
        authorization: `Bearer ${user.accessToken}`
      }
     })
    .then(res => res.json())
    .then(data => {
        console.log('bids for this  product', data);
        setBids(data);
    })
  }, [productId,user]);
   

   
  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    const bid = parseFloat(e.target.bid.value);
    console.log(name, email, bid);

    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: "pending",
    };
    console.log(newBid);
    fetch("http://localhost:5000/add-bid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          // add the new bid to the state 
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid ];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
      });
  };
  return (
    <div>
      {/* product info  */}
      <div>
        <div></div>
        <div>
          <button onClick={handleBidModalOpen} className="btn btn-primary">
            {" "}
            I want to buy tis product
          </button>

          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Give seller the open price!</h3>
              <p className="py-4">Pffer something seller can not resist</p>
              <form onSubmit={handleBidSubmit}>
                <fieldset className="fieldset">
                  {/* Name  */}
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    defaultValue={user?.displayName}
                  />
                  {/* email  */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    name="email"
                    readOnly
                    defaultValue={user?.email}
                  />
                  {/* bid ammount  */}
                  <label className="label">Bid</label>
                  <input
                    type="text"
                    name="bid"
                    className="input"
                    placeholder="your bid"
                  />

                  <button className="btn btn-neutral mt-4">
                    Please Your bid
                  </button>
                </fieldset>
              </form>

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {/* bids for this product  */}
      <div>
        <h3 className="text-3xl">Bids for this Product:<span 
        className="text-primary ">{bids.length}</span></h3>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         SL number
        </th>
        <th>Buyer Name</th>
        <th>Buyer Email</th>
        <th>Bid price</th>
        <th>Actions</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        bids.map((bid, index) =>  <tr key={bid._id || index}>
        <th> {index + 1}      </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{bid.buyer_name}</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
        {bid.buyer_email}
         
        </td>
        <td>{bid.bid_price}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr> )
     }
      {/* row 2 */}
     
     
    
    
    </tbody>
   
  </table>
</div>
      </div>
    </div>
  );
};

export default ProductDetailse;
