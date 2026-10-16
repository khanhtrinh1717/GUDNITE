(()=>{
const form=document.querySelector('#checkout-form');
let qrTimer;
function render(){
 document.querySelector('#checkout-empty').hidden=cart.length>0;
 document.querySelector('#checkout-layout').hidden=!cart.length;
 document.querySelector('#checkout-items').innerHTML=cart.map(item=>{
 const fallback=['assets/twist/TWIST_mix_01.png','assets/lumia/LUMIA_blue_01.png','assets/ripple/RIPPLE_blue_01.png','assets/mellow/yellow_01.png','assets/fire/Fire_Camden.png','assets/kumo/KUMO_main.png','assets/wood/WOOD_main.png','assets/toadstool/TOADSTOOL_Black.png'];
 const src=typeof item.image==='string'&&/^assets\/(twist|lumia|ripple|mellow|fire|kumo|wood|toadstool)\/[A-Za-z0-9_]+\.(png|jpg)$/.test(item.image)?item.image:fallback[item.model];
 return `<div class="checkout-item">${src?`<img src="${escapeHTML(src)}" alt="${escapeHTML(models[item.model].name)}">`:'<span class="material-symbols-outlined">light</span>'}<div><strong>${models[item.model].name}</strong><small>${escapeHTML(item.color)} · Số lượng: ${item.qty}</small></div><strong>${money(models[item.model].price*item.qty)}</strong></div>`;
 }).join('');
 const subtotal=cart.reduce((sum,item)=>sum+models[item.model].price*item.qty,0);
 const city=form.elements.city.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[.,]/g,' ').trim().replace(/\s+/g,' ');
 const hanoi=['ha noi','hanoi','tp ha noi','tp hanoi','thanh pho ha noi'].includes(city);
 const shipping=city?(hanoi?0:30000):null;
 clearTimeout(qrTimer);
 const bankSelected=form.elements.payment.value==='bank';
 const panel=document.querySelector('#bank-transfer');
 const qr=document.querySelector('#bank-qr');
 qr.loading='eager';
 panel.hidden=!bankSelected;
 qr.hidden=true;
 document.querySelector('#bank-qr-error').hidden=true;
 document.querySelector('#bank-qr-note').textContent=shipping===null?'Nhập tỉnh/thành phố để tạo mã QR đúng số tiền.':'Số tiền: '+money(subtotal+shipping)+' · Nội dung: GUDNITE';
 if(bankSelected&&shipping!==null&&cart.length){
   qrTimer=setTimeout(()=>{
     const params=new URLSearchParams({amount:String(subtotal+shipping),addInfo:'GUDNITE',accountName:'PHAM KHANH TRINH'});
     qr.onload=()=>{qr.hidden=false};
     qr.onerror=()=>{qr.hidden=true;document.querySelector('#bank-qr-error').hidden=false};
     qr.src='https://img.vietqr.io/image/MB-8807012005-compact2.png?'+params;
   },350);
 }
 document.querySelector('#checkout-subtotal').textContent=money(subtotal);
 document.querySelector('#checkout-shipping').textContent=shipping===null?'Nhập tỉnh/thành phố':shipping===0?'Miễn phí':money(shipping);
 document.querySelector('#checkout-total').textContent=money(subtotal+(shipping||0));
 document.querySelector('#shipping-note').textContent=shipping===null?'Nhập tỉnh/thành phố để tính phí vận chuyển.':hanoi?'Đã áp dụng miễn phí giao hàng tại Hà Nội.':'Đã bao gồm phí vận chuyển 30.000₫.';
}
document.addEventListener('cart-updated',render);
form.elements.city.addEventListener('input',render);
form.elements.city.addEventListener('change',render);
form.querySelectorAll('[name=payment]').forEach(input=>input.addEventListener('change',render));
render();
document.querySelector('#apply-coupon').onclick=()=>{document.querySelector('#coupon-status').textContent=document.querySelector('#coupon-code').value.trim()?'Mã giảm giá chưa khả dụng.':'Vui lòng nhập mã giảm giá.'};
form.addEventListener('submit',event=>{event.preventDefault();if(!cart.length){render();return}const status=document.querySelector('#checkout-status');status.textContent='Chưa thể hoàn tất: cửa hàng đang thiết lập dịch vụ nhận đơn và thanh toán. Đơn hàng chưa được gửi và chưa có khoản tiền nào bị thu.';status.focus();});
})();
