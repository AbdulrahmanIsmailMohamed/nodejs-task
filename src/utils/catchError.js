exports.catchError = async (promise) => {
  try {
    return await promise;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};
