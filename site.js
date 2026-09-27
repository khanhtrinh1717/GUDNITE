const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const storage = {get(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}},set(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}};
const models = [
  {name:'TWIST',price:350000},
  {name:'LUMIA',price:380000},
  {name:'RIPPLE',price:400000},
  {name:'Đèn Khối Vuông Mini',price:300000}
];
const modelIndex = Math.max(0,Math.min(3,Number(new URLSearchParams(location.search).get('model'))||0));
const model = models[modelIndex];
const money = value => value.toLocaleString('vi-VN')+'₫';
const escapeHTML = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let qty=1, color='Tím oải hương', toastTimer;
let cart=storage.get('gudnite-cart',[]);
if(!Array.isArray(cart)) cart=[];
cart=cart.filter(x=>Number.isInteger(x.model)&&models[x.model]&&typeof x.color==='string'&&Number.isInteger(x.qty)&&x.qty>0&&x.qty<=99);
const oldColors={'Pastel Lavender':'Tím oải hương','Lavender Mist':'Tím oải hương','Pastel Pink':'Hồng phấn','Rose Quartz Pink':'Hồng thạch anh','Sky Blue':'Xanh da trời','Mint Green':'Xanh bạc hà','Mint Breeze':'Xanh bạc hà','Butter Cream':'Vàng kem','Soft Cream':'Vàng kem','Obsidian Charcoal':'Đen than','Obsidian Black':'Đen than'};
cart.forEach(item=>{item.color=oldColors[item.color]||item.color});
const dialog=$('#site-dialog');
function notify(text){const toast=$('#site-toast');toast.textContent=text;toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.hidden=true,3200)}
function showDialog(title,html){$('#dialog-title').textContent=title;$('#dialog-content').innerHTML=html;if(!dialog.open)dialog.showModal()}
$('#close-dialog').onclick=()=>dialog.close();
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
function syncTheme(){const dark=document.documentElement.classList.contains('dark');const button=$('#theme-toggle');button.setAttribute('aria-label',dark?'Chuyển sang giao diện sáng':'Chuyển sang giao diện tối');button.setAttribute('aria-pressed',String(dark));button.title=dark?'Chuyển sang giao diện sáng':'Chuyển sang giao diện tối';button.firstElementChild.textContent=dark?'light_mode':'dark_mode'}
$('#theme-toggle').onclick=()=>{document.documentElement.classList.toggle('dark');try{localStorage.setItem('gudnite-theme',document.documentElement.classList.contains('dark')?'dark':'light')}catch{}syncTheme()};syncTheme();
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',e=>{try{if(localStorage.getItem('gudnite-theme'))return}catch{}document.documentElement.classList.toggle('dark',e.matches);syncTheme()});
$('#menu-toggle').onclick=()=>{const menu=$('#mobile-menu');menu.hidden=!menu.hidden;$('#menu-toggle').setAttribute('aria-expanded',String(!menu.hidden))};
$$('#mobile-menu a').forEach(a=>a.addEventListener('click',()=>{$('#mobile-menu').hidden=true;$('#menu-toggle').setAttribute('aria-expanded','false')}));
function updateCart(){document.dispatchEvent(new Event('cart-updated'));storage.set('gudnite-cart',cart);const count=cart.reduce((n,x)=>n+x.qty,0);$$('[data-path="cart"]').forEach(a=>{a.setAttribute('aria-label',`Giỏ hàng, ${count} sản phẩm`);const badge=a.querySelector('span:last-child');if(badge)badge.textContent=count})}
function addToCart(){const index=$('#main-lamp-img')?modelIndex:0;const existing=cart.find(x=>x.model===index&&x.color===color);if(existing)existing.qty=Math.min(99,existing.qty+qty);else cart.push({model:index,color,qty});const item=cart.find(x=>x.model===index&&x.color===color);const selected=document.querySelector('.twist-swatch[aria-pressed="true"]');if(item&&selected)item.image=selected.dataset.image;updateCart();notify('Đã thêm '+models[index].name+' vào giỏ hàng')}
function renderCart(){showDialog('Giỏ hàng',cart.length?cart.map((x,i)=>`<div class="cart-row"><span class="material-symbols-outlined">light</span><div><strong>${models[x.model].name}</strong><small>${escapeHTML(x.color)}</small><div class="cart-actions"><button class="icon-button" data-quantity="${i}" data-delta="-1" aria-label="Giảm số lượng">−</button><span>${x.qty}</span><button class="icon-button" data-quantity="${i}" data-delta="1" aria-label="Tăng số lượng">+</button><button data-remove="${i}" aria-label="Xóa ${models[x.model].name}">Xóa</button></div></div><strong>${money(models[x.model].price*x.qty)}</strong></div>`).join('')+`<div class="cart-total"><span>Tổng cộng</span><span>${money(cart.reduce((n,x)=>n+models[x.model].price*x.qty,0))}</span></div><a class="site-primary" href="checkout.html">Tiến hành thanh toán</a><a class="site-primary" href="shop.html">Tiếp tục mua sắm</a>`:'<p>Giỏ hàng đang trống. Hãy chọn một chiếc đèn để thắp sáng góc nhỏ của bạn.</p><a class="site-primary" href="shop.html">Khám phá đèn</a>');$$('[data-quantity]').forEach(b=>b.onclick=()=>{const item=cart[Number(b.dataset.quantity)];item.qty=Math.max(1,Math.min(99,item.qty+Number(b.dataset.delta)));updateCart();renderCart()});$$('[data-remove]').forEach(b=>b.onclick=()=>{cart.splice(Number(b.dataset.remove),1);updateCart();renderCart()});$$('#dialog-content a').forEach(a=>a.addEventListener('click',()=>dialog.close()))}
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;if(a.getAttribute('href')==='#cart'){e.preventDefault();renderCart()}if(a.getAttribute('href')==='#support'){e.preventDefault();showDialog('Chăm sóc khách hàng','<p class="site-note">Đây là bản dùng thử GUDNITE. Chưa kết nối hệ thống hỗ trợ, theo dõi đơn hàng hoặc thông tin liên hệ của cửa hàng.</p><a class="site-primary" href="index.html#faq">Xem câu hỏi thường gặp</a>')}});
window.adjustQty=delta=>{qty=Math.max(1,Math.min(99,qty+delta));const counter=$('#qty-counter')||$('#qty-val');if(counter)counter.textContent=qty};
window.selectSwatch=(name,hex,button)=>{color=name;$('#selected-color-label').textContent=name;$$('.swatch-btn').forEach(b=>{b.classList.remove('ring-2','ring-primary');b.setAttribute('aria-pressed','false')});button.classList.add('ring-2','ring-primary');button.setAttribute('aria-pressed','true')};
window.setBaseColor=(name,hex,bg)=>{color=name;$('#color-name-display').textContent=name;$('#selected-color-label').textContent='ĐẾ: '+name.toUpperCase();$('#glow-ambient').style.backgroundColor=hex;$$('.swatch-btn').forEach(b=>{const active=b.title===name;b.classList.toggle('ring-2',active);b.classList.toggle('ring-primary',active);b.setAttribute('aria-pressed',String(active))})};
window.triggerCartToast=addToCart;
window.switchGallery=(src,button)=>{if(src==='placeholder'){notify('Ảnh góc chụp này chưa có trong bộ thiết kế.');return}$('#main-lamp-img').src=src;$$('.gallery-thumb').forEach(b=>b.classList.remove('active-thumb','ring-2','ring-primary'));button.classList.add('active-thumb','ring-2','ring-primary')};
$('#add-to-cart-btn')?.addEventListener('click',addToCart);
$('#ambient-lamp-toggle')?.addEventListener('click',function(){const enabled=this.getAttribute('aria-pressed')!=='true';this.setAttribute('aria-pressed',String(enabled));$('#main-lamp-img').style.filter=enabled?'brightness(.65) saturate(1.35)':'';$('#glow-backdrop').style.opacity=enabled?'0.9':'0.4'});
if($('#main-lamp-img')){
  document.title=model.name+' — GUDNITE';
  if(modelIndex){const original=$('#main-lamp-img').dataset.originalSrc||$('#main-lamp-img').src;$('#main-lamp-img').src=original;const second=$$('.gallery-thumb img')[1]?.src;$$('main h1').forEach(h=>h.textContent=model.name);const price=$('main .font-headline-lg.text-primary.font-extrabold');if(price)price.textContent=money(model.price);const usd=price?.nextElementSibling;if(usd)usd.textContent='VND';if(modelIndex===1||modelIndex===3)$('#main-lamp-img').src=second||original;}
  const colors=['#c4b5fd','#f9a8d4','#7dd3fc','#a7f3d0','#fef3c7','#292534'];$$('.swatch-btn').forEach((b,i)=>b.style.backgroundColor=colors[i]);
  $$('header nav a').forEach(a=>a.removeAttribute('aria-current'));
}
$$('button').forEach(button=>{
  const text=button.textContent.trim();
  if(/Mua ngay|Thanh toán với/i.test(text))button.addEventListener('click',()=>{addToCart();location.href='checkout.html'});
  if(/yêu thích/i.test(button.getAttribute('aria-label')||'')||/yêu thích/i.test(text))button.addEventListener('click',()=>{const saved=storage.get('gudnite-favorite',false);storage.set('gudnite-favorite',!saved);button.setAttribute('aria-pressed',String(!saved));notify(saved?'Đã bỏ khỏi yêu thích':'Đã lưu đèn yêu thích trên trình duyệt')});
  if(/Viết đánh giá đã xác thực/.test(text))button.addEventListener('click',()=>showDialog('Đánh giá sản phẩm','<p class="site-note">Chức năng đánh giá cần kết nối hệ thống xác thực đơn hàng của cửa hàng.</p>'));
  if(button.getAttribute('aria-label')==='Phóng to ảnh đèn')button.addEventListener('click',()=>showDialog(model.name,`<img class="zoom-image" alt="${model.name}" src="${escapeHTML($('#main-lamp-img').src)}">`));
});
$$('footer form').forEach(form=>{const input=form.querySelector('input');input.required=true;input.setAttribute('aria-label','Địa chỉ email');form.addEventListener('submit',e=>{e.preventDefault();notify('Bản dùng thử chưa kết nối dịch vụ bản tin. Email chưa được gửi.')} )});
const search=$('header input');if(search){search.setAttribute('aria-label','Tìm đèn');search.addEventListener('keydown',e=>{if(e.key!=='Enter')return;e.preventDefault();const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();const query=normalize(search.value.trim());const results=models.map((m,i)=>({...m,index:i})).filter(m=>normalize(m.name).includes(query));showDialog('Tìm đèn',results.length?results.map(m=>`<a class="site-primary" href="product.html?model=${m.index}">${m.name} · ${money(m.price)}</a>`).join(''):'<p>Không tìm thấy đèn phù hợp. Hãy thử “Trụ”, “Hoa” hoặc “Mini”.</p>')})}
$$('img').forEach(img=>{if(!img.alt)img.alt=img.dataset.alt||'Chi tiết đèn GUDNITE';if(!img.closest('header')&&img.id!=='main-lamp-img')img.loading='lazy'});
updateCart();
$$('footer [data-path="shop"]').forEach((a,i)=>{if(i<4)a.href='product.html?model='+i});
$$('a').filter(a=>a.textContent.trim()==='Chọn mẫu đèn').forEach((a,i)=>a.href='product.html?model='+(i+1));
if($('#add-to-cart-btn')){
  const button=$('#add-to-cart-btn');
  const label=document.createElement('span');
  label.textContent='Thêm vào giỏ hàng · '+money(model.price);
  const icon=button.querySelector('.material-symbols-outlined');
  button.replaceChildren(...(icon?[icon]:[]),label);
}

// Product-specific colors and photos.
const variantTemplate=$(['#twist-variants','#lumia-variants','#ripple-variants'][modelIndex]||'#no-product-variants');
if($('#main-lamp-img') && variantTemplate){
  const group=$('#swatch-group');
  group.className='twist-swatches';
  group.replaceChildren(variantTemplate.content.cloneNode(true));
  group.style.gridTemplateColumns='repeat('+group.children.length+',minmax(0,1fr))';
  const swatches=[...group.querySelectorAll('.twist-swatch')];
  const gallery=$('.gallery-thumb').parentElement;
  gallery.className='twist-gallery';
  gallery.replaceChildren();
  const mainImage=$('#main-lamp-img');
  mainImage.classList.remove('object-cover');
  mainImage.classList.add('object-contain');
  mainImage.parentElement.classList.add('twist-stage');
  const label=$('#selected-color-label');
  label.setAttribute('aria-live','polite');
  label.parentElement.classList.add('twist-color-heading');
  function selectVariant(index){
    const chosen=swatches[index];
    color=chosen.dataset.color;
    mainImage.src=chosen.dataset.image;
    mainImage.alt=model.name+' — '+color;
    label.textContent=color;
    swatches.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    [...gallery.children].forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
  }
  swatches.forEach((swatch,index)=>{
    const thumbnail=document.createElement('button');
    thumbnail.type='button';
    thumbnail.className='gallery-thumb twist-thumbnail';
    thumbnail.setAttribute('aria-label','Xem ảnh '+swatch.dataset.color);
    const img=document.createElement('img');
    img.src=swatch.dataset.image;
    img.alt=model.name+' — '+swatch.dataset.color;
    img.loading='lazy';
    thumbnail.append(img);
    thumbnail.addEventListener('click',()=>selectVariant(index));
    swatch.addEventListener('click',()=>selectVariant(index));
    gallery.append(thumbnail);
  });
  if(variantTemplate.dataset.overview){
    const overview=document.createElement('button');
    overview.type='button';overview.className='gallery-thumb twist-thumbnail';
    overview.setAttribute('aria-label','Xem ảnh tổng hợp LUMIA');
    overview.setAttribute('aria-pressed','false');
    const image=document.createElement('img');
    image.src=variantTemplate.dataset.overview;image.alt='Các màu đèn LUMIA';image.loading='lazy';
    overview.append(image);
    overview.addEventListener('click',()=>{
      mainImage.src=variantTemplate.dataset.overview;mainImage.alt=image.alt;
      [...gallery.children].forEach(button=>button.setAttribute('aria-pressed',String(button===overview)));
    });
    gallery.append(overview);
  }
  selectVariant(0);
}

if($('#main-lamp-img')){const breadcrumb=$('nav[aria-label="Breadcrumb"] span:last-child');if(breadcrumb)breadcrumb.textContent=model.name;}
