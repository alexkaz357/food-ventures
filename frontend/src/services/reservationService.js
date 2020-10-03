import httpService from './httpService'

export const reservationService = {
  query,
  getById,
  remove,
  save
}

function query() {
  return httpService.get(`reservation`);
}

function getById(reservationId) {
  return httpService.get(`reservation/${reservationId}`)
}

function remove(reservationId) {
  return httpService.delete(`reservation/${reservationId}`)
}

async function save(reservation) {
  if (reservation._id) {
    return httpService.put(`reservation/${reservation._id}`, reservation)
  } else {
    return httpService.post(`reservation`, reservation);
  }
}