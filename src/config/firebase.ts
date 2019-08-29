import * as admin from 'firebase-admin';

import { FIREBASE_BUCKET, FIREBASE_SERVICEACCOUNTKEY } from '@util/secrets';

export default admin.initializeApp({
	credential: admin.credential.cert(<any>FIREBASE_SERVICEACCOUNTKEY),
	storageBucket: FIREBASE_BUCKET
});

export const bucket = admin.storage().bucket();
