let express = require('express');
let { resolve } = require('path');
let cors=require("cors");


let app = express();
app.use(cors());
const port = 3000;
//server side values
let taxRate=5; //5%
let discountPercentage=10; //10%
let loyaltyRate=2;//2 point per 1$

app.get('/cart-total',(req,res)=>{
  let newItemPrice=parseFloat(req.query.newItemPrice);
  let cartTotal=parseFloat(req.query.cartTotal);
  let cartPrice=cartTotal+newItemPrice;
  res.send(cartPrice.toString());
})

app.get('/membership-discount',(req,res)=>{
  let cartTotal=parseFloat(req.query.cartTotal);
  let isMember=req.query.isMember==="true";
  let totalCartValue;
  if(isMember){
    totalCartValue=cartTotal-(cartTotal*(10/100));
  }
  else{
    totalCartValue=cartTotal;
  }
  res.send(totalCartValue.toString());

})

function cartamountAfterTax(cartTotal,taxRate){
    return cartTotal*(taxRate/100);
}
app.get('/calculate-tax',(req,res)=>{
  let cartTotal=parseFloat(req.query.cartTotal);
  res.send(cartamountAfterTax(cartTotal,taxRate).toString());
})

function deliveryDays(distance,shippingMethod){
  let days;
  if(shippingMethod==="standard"){
    days=distance/50;
  }
  else if(shippingMethod==="express"){
    days=distance/100;
  }
  return days;
}
app.get('/estimate-delivery',(req,res)=>{
  let shippingMethod=req.query.shippingMethod;
  let distance=parseFloat(req.query.distance);
  res.send(deliveryDays(distance,shippingMethod).toString());
})

app.get('/shipping-cost',(req,res)=>{
  let weight=parseFloat(req.query.weight);
  let distance=parseFloat(req.query.distance);
  let shippingCost=weight*distance*0.1;
  res.send(shippingCost.toString());
})

app.get('/loyalty-points',(req,res)=>{
  let purchaseAmount=parseFloat(req.query.purchaseAmount);
  let loyaltyPoint=purchaseAmount*loyaltyRate;
  res.send(loyaltyPoint.toString());
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
