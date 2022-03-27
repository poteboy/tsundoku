import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContainer, createContainer } from 'unstated-next';
import { auth, session, firestore as db } from '@src/constants/firebase';
import { User, isUser, generateNewCategory } from '@src/entities';
import { Model } from '@src/util';
import { storageKeys } from '@src/constants/storageKey';
import * as SplashScreen from 'expo-splash-screen';
import { collectionPath } from '@src/constants';
import { unstable_batchedUpdates } from 'react-native';

// これはApp.tsxでラップしているので、それ以下のhookは呼べないよ。気をつけてね！
const userRef = db.collection(collectionPath.users.users);
const container = () => {
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState<User>();
  const [loadingRegistration, setLoadingRegistration] = useState(false);
  const [loadingDeletion, setLoadingDeletion] = useState(false);
  const userUid = auth.currentUser?.uid;

  auth.onAuthStateChanged(authUser => {
    setAuthorized(!!authUser);
  });

  // 起動時に取得
  useEffect(() => {
    const load = async () => {
      try {
        SplashScreen.preventAutoHideAsync();
        const item = await AsyncStorage.getItem(storageKeys.user);
        const tmp = item ? JSON.parse(item) : undefined;
        if (isUser(tmp)) {
          setUser(tmp);
        }
      } finally {
        SplashScreen.hideAsync();
      }
    };
    load();
  }, []);

  // ログイン時に永続化
  useEffect(() => {
    if (user && isUser(user)) {
      const json = JSON.stringify(user);
      AsyncStorage.setItem(storageKeys.user, json);
    }
  }, [user]);

  // 初回登録時
  const registerUser = useCallback(async () => {
    setLoadingRegistration(true);
    await auth.setPersistence(session).then(async () => {
      const credential = await auth.signInAnonymously();
      const uid = credential.user?.uid;
      if (uid) {
        const model = new Model(uid);
        const user: User = model.mergeModel<User>({
          authUid: uid,
          premium: false,
        });
        const _category = generateNewCategory('お気に入り');
        db.runTransaction(async transaction => {
          await transaction.set(userRef.doc(uid), user);
          await transaction.set(
            userRef
              .doc(uid)
              .collection(collectionPath.users.category)
              .doc(_category.uid),
            _category,
          );
        });

        unstable_batchedUpdates(() => {
          setUser(user);
          setLoadingRegistration(false);
        });
        return;
      }
      return;
    });
  }, [user, loadingRegistration]);

  // アカウント削除
  const deleteUser = useCallback(async () => {
    setLoadingDeletion(true);
    if (user) {
      try {
        db.runTransaction(async transaction => {
          await userRef
            .doc(user.uid)
            .collection(collectionPath.users.books)
            .get()
            .then(async snaps => {
              snaps.forEach(snap => {
                transaction.delete(
                  userRef
                    .doc(user.uid)
                    .collection(collectionPath.users.books)
                    .doc(snap.id),
                );
              });
            });
          await userRef
            .doc(user.uid)
            .collection(collectionPath.users.category)
            .get()
            .then(async snaps => {
              snaps.forEach(snap => {
                transaction.delete(
                  userRef
                    .doc(user.uid)
                    .collection(collectionPath.users.category)
                    .doc(snap.id),
                );
              });
            });
          await transaction.delete(userRef.doc(user.uid));
        });
        await auth.currentUser?.delete();
        await AsyncStorage.removeItem(storageKeys.user);
        setUser(undefined);
      } catch {
        throw new Error();
      } finally {
        setLoadingDeletion(false);
      }
    }
  }, [user]);

  // TabNavigator遷移後にユーザーをDBから取得
  const getUser = useCallback(async () => {
    if (userUid) {
      try {
        const data = await userRef.doc(userUid).get();
        const _user = await data.data();
        if (isUser(_user)) return _user;
      } catch {
        throw new Error();
      }
    }
  }, [authorized, userUid]);

  // TabNavigator遷移後getUser()から取得したデータで更新
  const updateUser = useCallback(
    (_user: User) => {
      setUser(_user);
    },
    [setUser],
  );

  return {
    authorized,
    registerUser,
    loadingRegistration,
    loadingDeletion,
    deleteUser,
    userUid,
    getUser,
    updateUser,
  };
};

export const AuthContainer = createContainer(container);

export const useAuth = () => useContainer(AuthContainer);
