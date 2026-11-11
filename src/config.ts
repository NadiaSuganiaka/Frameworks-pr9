import { config } from 'dotenv';
config({path:'.env.local', quiet:true} as Parameters<typeof config>[0]);
export function jwtSecret() {
  const key=process.env.JWT_SECRET;
  if(!key || key.length<32) throw new Error('Run npm run tokens before starting');
  return key;
}
