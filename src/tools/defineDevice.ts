export enum Device {
  Desktop,
  Mobile,
  Tablet
}

export const defineDevice = () => {
  const width = window.innerWidth;

  if (width < 768) {
    return Device.Mobile;
  }
  if (width >= 768 && width < 1024) {
    return Device.Tablet;
  }
  return Device.Desktop;
};
