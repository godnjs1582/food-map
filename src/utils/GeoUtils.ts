const KAKAO_API_KEY = 'ce962b41ad27f8e21691ce9436ac7a78';

export const getAddressFormCoords = (
  latitude: number,
  longitude: number,
): Promise<string | null> => {
  return fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2address?x=${latitude}&y=${longitude}`,
    {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    },
  )
    .then(result => result.json())
    .then(result => {
      console.log(
        `https://dapi.kakao.com/v2/local/geo/coord2address?x=${latitude}&y=${longitude}`,
      );
      if (result.meta.total_count === 0) {
        return null;
      }
      if (result.documents.length === 0) {
        return null;
      }
      console.log(result, 'result');

      const addressItem = result.documents[0];
      return addressItem.address.address_name;
    });
};
