import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { makeApp } from '../src/bootstrap';
async function main(){
  const tokens=JSON.parse(readFileSync('tokens.local.json','utf-8'));
  const app=await makeApp();await app.listen(0,'127.0.0.1');const base=await app.getUrl();
  try {
    const cases:[string,string|undefined,number][]=[['no token',undefined,401],['student',tokens.student,403],['admin',tokens.admin,200],['invalid','not-a-jwt',401]];
    for(const [name,token,status]of cases){
      const r=await fetch(`${base}/api/v1/admin/users`,{headers:token?{Authorization:`Bearer ${token}`}:{}});
      const data=await r.json();console.log(name,r.status,JSON.stringify(data));assert.equal(r.status,status);
      if(status===200)assert.equal(Array.isArray(data),true);
    }
    const me=await fetch(`${base}/api/v1/me`,{headers:{Authorization:`Bearer ${tokens.student}`}});
    assert.equal(me.status,200);console.log('PASS: 401 / 403 / 200 / 401; /me remains 200');
  }finally{await app.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
