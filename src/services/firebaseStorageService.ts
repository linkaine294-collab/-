import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getMetadata,
  deleteObject,
  updateMetadata,
} from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App instance safely (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export interface FirebaseStoragePhoto {
  id: string;
  url: string;
  fullPath: string;
  name: string;
  caption: string;
  uploader: string;
  day: number;
  spotName?: string;
  createdAt: string;
  size?: number;
}

// Subscribe to Firebase Auth state
export const initFirebaseAuth = (
  onAuthSuccess?: (user: User) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      if (onAuthSuccess) onAuthSuccess(user);
    } else {
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google Auth via Firebase
export const signInWithGoogleFirebase = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Firebase Google Auth Sign in error:', error);
    throw error;
  }
};

// Sign out from Firebase
export const logoutFirebase = async () => {
  await signOut(auth);
};

// Upload photo directly to Firebase Storage Bucket
export const uploadPhotoToFirebaseStorage = async (
  file: File | Blob,
  fileName: string,
  dayNum: number,
  spotName: string,
  caption: string,
  uploader: string
): Promise<FirebaseStoragePhoto> => {
  try {
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `album_photos/day_${dayNum}_${Date.now()}_${cleanFileName}`;
    const storageRef = ref(storage, storagePath);

    // Metadata payload encoded in customMetadata
    const customMeta = {
      day: String(dayNum),
      spotName: spotName || '北歐極境景點',
      caption: caption || '美好留影',
      uploader: uploader || '北歐旅伴',
      createdAt: new Date().toLocaleDateString('zh-TW'),
    };

    // Upload bytes with content type and custom metadata
    const uploadResult = await uploadBytes(storageRef, file, {
      contentType: file.type || 'image/jpeg',
      customMetadata: customMeta,
    });

    // Obtain public/authenticated download URL from Firebase Storage Bucket
    const downloadUrl = await getDownloadURL(uploadResult.ref);

    return {
      id: storagePath,
      url: downloadUrl,
      fullPath: storagePath,
      name: fileName,
      caption: customMeta.caption,
      uploader: customMeta.uploader,
      day: dayNum,
      spotName: customMeta.spotName,
      createdAt: customMeta.createdAt,
    };
  } catch (error) {
    console.error('uploadPhotoToFirebaseStorage error:', error);
    throw error;
  }
};

// Fetch and list all uploaded photos from Firebase Storage Bucket
export const listFirebaseStoragePhotos = async (): Promise<FirebaseStoragePhoto[]> => {
  try {
    const albumFolderRef = ref(storage, 'album_photos');
    const listResult = await listAll(albumFolderRef);

    const photoPromises = listResult.items.map(async (itemRef) => {
      try {
        const downloadUrl = await getDownloadURL(itemRef);
        const meta = await getMetadata(itemRef);

        const custom = meta.customMetadata || {};
        const parsedDay = custom.day ? Number(custom.day) : 1;
        const parsedSpot = custom.spotName || '北歐景點';
        const parsedCaption = custom.caption || itemRef.name;
        const parsedUploader = custom.uploader || 'Firebase 雲端旅伴';
        const parsedCreated = custom.createdAt || new Date(meta.timeCreated).toLocaleDateString('zh-TW');

        return {
          id: itemRef.fullPath,
          url: downloadUrl,
          fullPath: itemRef.fullPath,
          name: itemRef.name,
          caption: parsedCaption,
          uploader: parsedUploader,
          day: parsedDay,
          spotName: parsedSpot,
          createdAt: parsedCreated,
          size: meta.size,
        };
      } catch (err) {
        console.warn('Failed to fetch photo metadata for', itemRef.fullPath, err);
        return null;
      }
    });

    const results = await Promise.all(photoPromises);
    const validPhotos: FirebaseStoragePhoto[] = [];
    for (const item of results) {
      if (item !== null) {
        validPhotos.push(item);
      }
    }

    // Sort newest first
    validPhotos.sort((a, b) => b.id.localeCompare(a.id));
    return validPhotos;
  } catch (error: any) {
    // Folder may not exist yet if empty
    if (error.code === 'storage/object-not-found') {
      return [];
    }
    console.error('listFirebaseStoragePhotos error:', error);
    return [];
  }
};

// Delete photo from Firebase Storage Bucket with safety check
export const deletePhotoFromFirebaseStorage = async (fullPath: string): Promise<boolean> => {
  try {
    const photoRef = ref(storage, fullPath);
    await deleteObject(photoRef);
    return true;
  } catch (error) {
    console.error('deletePhotoFromFirebaseStorage error:', error);
    throw error;
  }
};
