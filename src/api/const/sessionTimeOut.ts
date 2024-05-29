const session_time = {
  VITE_APP_SESSION: parseInt(import.meta.env.VITE_APP_SESSION)
};

const ApiUrl = {
  VITE_APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL // This is expected to be a string
};

const config = { session_time, ApiUrl };

export default config;
