import localforage from "localforage";
const noCacheHeaders = new Headers(); // noCacheHeaders.append('pragma', 'no-cache');
// noCacheHeaders.append('cache-control', 'no-cache');

const noCacheInit = {
  method: "GET",
  headers: noCacheHeaders,
};
export const md5FetchJSON = async <T>(
  prefix: string,
  uri: string
): Promise<T[]> => {
  console.debug("uri to fetch", uri);

  try {
    const md5 = await (await fetch(uri + ".md5", noCacheInit)).text();

    try {
      const md5InCache = await localforage.getItem(
        "@" + prefix + ".." + uri + ".md5"
      );

      if (md5InCache !== null && md5InCache === md5) {
        console.debug("cache hit: " + uri);
        const jsonStringInCache = (await localforage.getItem(
          "@" + prefix + ".." + uri
        )) as string;
        return new Promise((resolve, reject) => {
          resolve(JSON.parse(jsonStringInCache));
        });
      } else {
        console.debug("cache miss" + uri);
        const data = await (await fetch(uri)).json();
        await localforage.setItem(
          "@" + prefix + ".." + uri,
          JSON.stringify(data)
        );
        await localforage.setItem("@" + prefix + ".." + uri + ".md5", md5);
        return new Promise((resolve, reject) => {
          resolve(data);
        });
      }
    } catch (e) {
      console.warn("cache lookup error", e);
      const data = await (await fetch(uri)).json();
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    }
  } catch (e) {
    console.log("md5 lookup error. try to server cache directly");
    const jsonStringInCache = (await localforage.getItem(
      "@" + prefix + ".." + uri
    )) as string;
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(jsonStringInCache));
    });
  }
};
export const cachedJSON = async <T>(
  prefix: string,
  uri: string
): Promise<T> => {
  console.debug("uri to fetch from cache", uri);

  try {
    const jsonStringInCache = (await localforage.getItem(
      "@" + prefix + ".." + uri
    )) as string;
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(jsonStringInCache));
    });
  } catch (e) {
    console.log("cache lookup error", e);
    const data = await (await fetch(uri)).json();
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }
};
export const fetchJSON = async <T>(uri: string): Promise<T> => {
  const data = await (await fetch(uri)).json();
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};

// export const cachedBase64Image = async <T>(prefix: string, uri: string): Promise<T> => {
// 	console.debug('uri to fetch from cache', uri);
// 	let md5 = await (await fetch(uri + '.md5', noCacheInit)).text();
// 	try {
// 		const jsonStringInCache = await localforage.getItem('@'+prefix+'.image.' + uri);
// 		return new Promise((resolve, reject) => {
// 			resolve(JSON.parse(jsonStringInCache));
// 		});
// 	} catch (e) {
// 		console.log('cache lookup error', e);
// 		const data = await (await fetch(uri)).json();
// 		return new Promise((resolve, reject) => {
// 			resolve(data);
// 		});
// 	}
// };

export const md5FetchText = async (
  prefix: string,
  uri: string
): Promise<string | null> => {
  console.debug("uri to fetch", uri);

  try {
    const md5 = await (await fetch(uri + ".md5", noCacheInit)).text();

    try {
      const md5InCache = await localforage.getItem(
        "@" + prefix + ".." + uri + ".md5"
      );

      if (md5InCache !== null && md5InCache === md5) {
        console.debug("cache hit", prefix, uri);
        const textStringInCache: string | null = await localforage.getItem(
          "@" + prefix + ".." + uri
        );
        return new Promise((resolve, reject) => {
          resolve(textStringInCache);
        });
      } else {
        console.debug("cache miss");
        const data = await (await fetch(uri)).text();
        await localforage.setItem("@" + prefix + ".." + uri, data);
        await localforage.setItem("@" + prefix + ".." + uri + ".md5", md5);
        return new Promise((resolve, reject) => {
          resolve(data);
        });
      }
    } catch (e) {
      console.warn("cache lookup error", e);
      const data = await (await fetch(uri)).text();
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    }
  } catch (e) {
    console.warn("md5 lookup error. try to server cache directly");
    const textStringInCache: string | null = await localforage.getItem(
      "@" + prefix + ".." + uri
    );
    return new Promise((resolve, reject) => {
      resolve(textStringInCache);
    });
  }
};
export const CACHE_JWT: string = "--cached--data--";

export const md5ActionFetchDAQ = async (
  prefix: string,
  apiUrl: string,
  jwt: string,
  daqKey: string
): Promise<{ data: unknown; time: string | null }> => {
  const cachePrefix = "@" + prefix + ".." + apiUrl + "." + daqKey;
  const md5Key = cachePrefix + ".md5";
  const dataKey = cachePrefix + ".data";
  const timeKey = cachePrefix + ".time";
  const md5InCache = await localforage.getItem(md5Key);
  console.log("DAQ for " + daqKey);
  const taskParameters = {
    parameters: {
      daqKey,
      md5: md5InCache || "-",
    },
  };
  const fd = new FormData();
  fd.append(
    "taskparams",
    new Blob([JSON.stringify(taskParameters)], {
      type: "application/json",
    })
  );

  if (jwt === CACHE_JWT) {
    const data: string | null = JSON.parse(
      (await localforage.getItem(dataKey)) ?? ""
    ); //go for result.time after the new version of the action is live

    const time: string | null = await localforage.getItem(timeKey);
    return new Promise((resolve, reject) => {
      resolve({
        data,
        time,
      });
    });
  } else {
    let headers = {};
    if (jwt) {
      headers = {
        Authorization: "Bearer " + jwt,
      };
    }

    const response = await fetch(
      apiUrl +
        "/actions/WUNDA_BLAU.dataAquisition/tasks?resultingInstanceType=result",
      {
        method: "POST",
        // method: "GET",
        headers: headers,
        body: fd,
      }
    );

    if (response.status >= 200 && response.status < 400) {
      //200,298,299,304
      const content = await response.json();

      if (content.res) {
        try {
          const result = JSON.parse(content.res);
          const status = result.status;
          let data: unknown, time: string;

          if (status === 200 || status === 298 || status === 299) {
            console.debug("DAQ cache miss for " + daqKey);

            if (status !== 200) {
              console.debug("server side DAQ view problem.  status " + status);
            }

            data = JSON.parse(result.content);
            time = result.time;
            await localforage.setItem(dataKey, result.content);
            await localforage.setItem(md5Key, result.md5);
            await localforage.setItem(timeKey, time);
          } else if (status === 304) {
            console.debug("DAQ cache hit for " + daqKey); //go for result.time after the new version of the action is live

            time = (await localforage.getItem(timeKey)) ?? "";
            data = JSON.parse((await localforage.getItem(dataKey)) ?? "");
          }

          return new Promise((resolve, reject) => {
            resolve({
              data,
              time,
            });
          });
        } catch (e) {
          return new Promise((resolve, reject) => {
            reject({
              status: 500,
              desc: "error when parsing the server result. probably the content has the wrong structure",
              content,
              exception: e,
            });
          });
        }
      } else {
        return new Promise((resolve, reject) => {
          reject({
            status: 500,
            desc: "error when parsing the server result.",
            content,
          });
        });
      }
    } else if (response.status === 401) {
      return new Promise((resolve, reject) => {
        reject({
          status: response.status,
          desc: "unauthorized",
        });
      });
    } else {
      console.error("unknown status", response);
      return new Promise((resolve, reject) => {
        reject({
          status: response.status,
          desc: "unknown",
        });
      });
    }
  }
};
