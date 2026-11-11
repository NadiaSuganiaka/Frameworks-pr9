import {makeApp} from './bootstrap';
async function main(){ const app=await makeApp();await app.listen(3002,'127.0.0.1');console.log('StudyFlow: http://localhost:3002/api/v1'); }
main().catch(e=>{console.error(e);process.exitCode=1;});
