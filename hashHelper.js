

/**
 *
 * @param {string}
 * @param {string}
 * @return {string}
**/
const hashString = async function(input_, hash_type_ = 'SHA-256'){
    return Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          hash_type_,
          (new TextEncoder()).encode(input_)
        )
      )
    ).map(byte => byte.toString(16).padStart(2, '0')).join('');
};
