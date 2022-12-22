export const getcustomerLocation = (setcusLocation) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setcusLocation(pos)
    });
  }
}
