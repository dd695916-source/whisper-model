const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:2048,height:1152},deviceScaleFactor:2});
await p.setContent('<html><body style="margin:0">'+fs.readFileSync('cover-royal.svg','utf8')+'</body></html>');
await p.waitForTimeout(400);await p.screenshot({path:'raw.png'});await b.close();})();