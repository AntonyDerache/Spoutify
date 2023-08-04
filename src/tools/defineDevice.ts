export enum Device {
  Desktop,
  Mobile,
  Tablet,
}

export const defineDevice = () => {
  const width = window.screen.width;
  if (width < 768) {
    return Device.Mobile
  } else if (width >= 768 && width < 1024) {
    return Device.Tablet
  } else {
    return Device.Desktop
  }
}