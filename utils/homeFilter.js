export default function handleHomeFilters(query) {
  let payload = {};

  const queryToPayloadMap = {
    host: { condition: query.host !== null, payloadProp: 'host.id' },
    province: { condition: query.province !== 'all', payloadProp: 'province' },
    rooms: { condition: query.rooms !== '1', payloadProp: 'rooms' },
    beds: { condition: query.beds !== '1', payloadProp: 'beds' },
    bathrooms: { condition: query.bathrooms !== '1', payloadProp: 'bathrooms' },
    adults: {
      condition: query.adults !== '1',
      payloadProp: 'capacity.adults',
      special: { $gte: query.adults },
    },
    children: {
      condition: query.children !== '0',
      payloadProp: 'capacity.children',
      special: { $gte: query.children },
    },
    instanceReserve: {
      condition: query.instanceReserve !== 'false',
      payloadProp: 'instanceReserve',
    },
    entire: {
      condition: query.entire !== 'false',
      payloadProp: 'homeType.entire',
    },
    privateRoom: {
      condition: query.privateRoom !== 'false',
      payloadProp: 'homeType.privateRoom',
    },
    sharedRoom: {
      condition: query.sharedRoom !== 'false',
      payloadProp: 'homeType.sharedRoom',
    },
    luxury: { condition: query.luxury !== 'false', payloadProp: 'luxury' },
    wifi: { condition: query.wifi !== 'false', payloadProp: 'amenities.wifi' },
    tv: { condition: query.tv !== 'false', payloadProp: 'amenities.tv' },
    accessories: {
      condition: query.accessories !== 'false',
      payloadProp: 'amenities.accessories',
    },
    kitchen: {
      condition: query.kitchen !== 'false',
      payloadProp: 'amenities.kitchen',
    },
    washingMachine: {
      condition: query.washingMachine !== 'false',
      payloadProp: 'amenities.washingMachine',
    },
    cooler: {
      condition: query.cooler !== 'false',
      payloadProp: 'amenities.cooler',
    },
    parkingLot: {
      condition: query.parkingLot !== 'false',
      payloadProp: 'amenities.parkingLot',
    },
    celebrationAllowed: {
      condition: query.celebrationAllowed !== 'false',
      payloadProp: 'homeRules.celebrationAllowed',
    },
    smokingAllowed: {
      condition: query.smokingAllowed !== 'false',
      payloadProp: 'homeRules.smokingAllowed',
    },
    petsAllowed: {
      condition: query.petsAllowed !== 'false',
      payloadProp: 'homeRules.petsAllowed',
    },
    popular: { condition: query.popular !== 'false', payloadProp: 'popular' },
    not: { condition: true, payloadProp: '_id', special: { $ne: query.not } },
    price: query?.price
      ? {
          condition: query.price[0] !== '10' || query.price[1] !== '1000',
          payloadProp: 'price',
          special: {
            $and: [
              { price: { $gte: query.price[0] } },
              { price: { $lte: query.price[1] } },
            ],
          },
        }
      : { condition: false },
  };

  if (Object.keys(query).length !== 0) {
    Object.keys(query).forEach((item) => {
      if (queryToPayloadMap[item] && queryToPayloadMap[item].condition) {
        payload = {
          ...payload,
          [queryToPayloadMap[item].payloadProp]:
            queryToPayloadMap[item].special || query[item],
        };
      }
    });
  }
  return payload;
}
