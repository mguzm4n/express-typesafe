import serviceAccount from '../serviceAccount.json';
import admin, { type ServiceAccount } from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});


export default admin;
