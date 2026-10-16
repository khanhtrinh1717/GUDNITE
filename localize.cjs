const translations=require('./translations-vi.cjs');
const colors={'Lavender Mist':'Tím oải hương','Pastel Lavender':'Tím oải hương','Pastel Pink':'Hồng phấn','Rose Quartz Pink':'Hồng thạch anh','Sky Blue':'Xanh da trời','Mint Green':'Xanh bạc hà','Mint Breeze':'Xanh bạc hà','Butter Cream':'Vàng kem','Soft Cream':'Vàng kem','Obsidian Charcoal':'Đen than','Obsidian Black':'Đen than'};
const labels={'Gudnite — Home':'Gudnite — Trang chủ','Switch to dark mode':'Chuyển sang giao diện tối','Switch theme':'Đổi giao diện','Open navigation':'Mở menu','Close dialog':'Đóng hộp thoại','Customer wishlist':'Sản phẩm yêu thích','Cart with 2 items':'Giỏ hàng','Search pixel lamps...':'Tìm đèn...','Enter your email...':'Nhập email của bạn...','Toggle Night Ambient Light Simulation':'Bật hoặc tắt mô phỏng ánh sáng đêm','Zoom Lamp Texture':'Phóng to ảnh đèn'};
module.exports=html=>{
  const scripts=[];
  html=html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g,s=>`<!--KEEP${scripts.push(s)-1}-->`);
  html=html.replace(/>([^<>]+)</g,(match,text)=>{const normalized=text.replace(/\s+/g,' ').trim();const translated=translations[normalized];if(translated)return '>'+text.replace(text.trim(),translated)+'<';if(/^~\$[\d.]+ USD$/.test(normalized))return '><';return match});
  html=html.replace(/\b(aria-label|placeholder|title|alt|data-alt)="([^"]*)"/g,(match,attr,value)=>{
    let result=labels[value]||translations[value]||colors[value];
    if(!result){const color=value.replace(/^Select /,'').replace(/ base$/,'');if(colors[color])result='Chọn màu '+colors[color].toLowerCase()}
    if(!result&&(attr==='alt'||attr==='data-alt')&&value&&value!=='Gudnite')result='Đèn GUDNITE trong không gian trang trí';
    return result?`${attr}="${result}"`:match;
  });
  html=html.replace(/onclick="([^"]+)"/g,(match,code)=>'onclick="'+Object.entries(colors).reduce((s,[a,b])=>s.split(a).join(b),code)+'"');
  html=html.replace('lang="en"','lang="vi"').replace('Discover GUDNITE 3D printed pixel lamps, crafted in Saigon. Customize your glow and explore the collection.','Khám phá đèn ngủ in 3D GUDNITE được chế tác tại Sài Gòn. Chọn mẫu đèn, phối màu đế và mang ánh sáng ấm áp về nhà.');
  return html.replace(/<!--KEEP(\d+)-->/g,(_,i)=>scripts[i]);
};
