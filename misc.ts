import * as env from 'dotenv';
env.config();

function main() { 
  console.log(process.env.DB_CONNECTION);
  
}

main();