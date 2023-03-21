import { wait } from 'src/utils/wait';

const STORAGE_KEY = 'users';

// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = () => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const persistUser = (user) => {
  try {
    const data = JSON.stringify(user);
    sessionStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

class AuthApi {
  async signIn(request) {
    const { email, password } = request;

    await wait(500);

    return new Promise((resolve, reject) => {
      try {
        // Merge static users (data file) with persisted users (browser storage)

        // Find the user
        // const user = mergedUsers.find((user) => user.email === email);

        // if (!user || (user.password !== password)) {
        //   reject(new Error('Please check your email and password'));
        //   return;
        // }

        // // Create the access token
        // const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        resolve(0);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async signUp(request) {
    const { email, name, password } = request;

    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        
        // Check if a user already exists
        // let user = mergedUsers.find((user) => user.email === email);

        // if (user) {
        //   reject(new Error('User already exists'));
        //   return;
        // }

        // user = {
        //   id: createResourceId(),
        //   avatar: undefined,
        //   email,
        //   name,
        //   password,
        //   plan: 'Standard'
        // };

        // persistUser(user);

        // const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // resolve({ accessToken });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me(request) {
    const { accessToken } = request;

    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        // const decodedToken = decode(accessToken);

        // // Find the user
        // const { userId } = decodedToken;
        // const user = mergedUsers.find((user) => user.id === userId);

        // if (!user) {
        //   reject(new Error('Invalid authorization token'));
        //   return;
        // }

        // resolve({
        //   id: user.id,
        //   avatar: user.avatar,
        //   email: user.email,
        //   name: user.name,
        //   plan: user.plan
        // });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
