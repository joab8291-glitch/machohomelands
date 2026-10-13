import {createHmac,timingSafeEqual} from 'node:crypto';
const COOKIE='mh_admin_session';
function signature(v){if(!process.env.ADMIN_SESSION_SECRET)throw Error('Missing ADMIN_SESSION_SECRET');return createHmac('sha256',process.env.ADMIN_SESSION_SECRET).update(v).digest('hex');}
export function setSession(res){const exp=Date.now()+28800000,p=Buffer.from(JSON.stringify({u:process.env.ADMIN_USERNAME||'@machoke',exp})).toString('base64url');res.setHeader('Set-Cookie',COOKIE+'='+p+'.'+signature(p)+'; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800');}
export function clearSession(res){res.setHeader('Set-Cookie',COOKIE+'=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');}
export function isAuthed(req){try{const c=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(COOKIE+'='));if(!c)return false;const [p,s]=c.slice(COOKIE.length+1).split('.');if(!p||!s)return false;const a=Buffer.from(s),b=Buffer.from(signature(p));if(a.length!==b.length||!timingSafeEqual(a,b))return false;const d=JSON.parse(Buffer.from(p,'base64url').toString());return d.exp>Date.now()&&d.u===(process.env.ADMIN_USERNAME||'@machoke');}catch{return false;}}
