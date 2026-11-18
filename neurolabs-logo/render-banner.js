const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:2048,height:1152},deviceScaleFactor:2});
await p.goto('file://'+process.cwd()+'/banner.html');await p.waitForTimeout(600);
await p.screenshot({path:'raw.png'});await b.close();})();